
// script.js - smooth effects, particles, reveal
document.addEventListener('DOMContentLoaded', ()=>{

  // reveal on scroll
  const items = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('on'); });
  },{threshold:0.15});
  items.forEach(i=>io.observe(i));

  // smooth nav links
  document.querySelectorAll('nav a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const id = a.getAttribute('href');
      document.querySelector(id).scrollIntoView({behavior:'smooth'});
    });
  });

  // particle canvas
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, particles=[];
  function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize); resize();

  function rand(min,max){ return Math.random()*(max-min)+min; }
  class Particle {
    constructor(){
      this.reset();
    }
    reset(){
      this.x = rand(0,W);
      this.y = rand(0,H);
      this.vx = rand(-0.3,0.3);
      this.vy = rand(-0.1,0.6);
      this.r = rand(0.6,2.8);
      this.life = rand(80,300);
      this.maxLife = this.life;
      this.color = `rgba(0,229,255,${rand(0.05,0.2)})`;
    }
    step(){
      this.x += this.vx;
      this.y += this.vy*0.6 - 0.2*Math.sin((this.x+this.y)/120);
      this.life--;
      if(this.life<=0 || this.x< -50 || this.x> W+50 || this.y>H+50) this.reset();
    }
    draw(){
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      ctx.fill();
    }
  }

  function initParticles(n=120){
    particles = [];
    for(let i=0;i<n;i++) particles.push(new Particle());
  }
  initParticles(120);

  function loop(){
    ctx.clearRect(0,0,W,H);
    // subtle gradient overlay strokes
    for(let p of particles){ p.step(); p.draw(); }
    requestAnimationFrame(loop);
  }
  loop();

  // small header logo hover glow (optional)
  const logo = document.querySelector('.logo');
  if(logo){
    logo.addEventListener('mouseenter', ()=> logo.style.transform='scale(1.04)');
    logo.addEventListener('mouseleave', ()=> logo.style.transform='scale(1)');
  }

});
