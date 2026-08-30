const menu=document.querySelector('.menu'), links=document.querySelector('.nav-links');
menu.addEventListener('click',()=>links.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));

const theme=document.getElementById('themeToggle');
const saved=localStorage.getItem('theme');
if(saved==='light') document.body.classList.remove('dark-mode');
theme.addEventListener('click',()=>{
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme',document.body.classList.contains('dark-mode')?'dark':'light');
  theme.textContent=document.body.classList.contains('dark-mode')?'☾':'☀︎';
});

document.getElementById('year').textContent=new Date().getFullYear();

const canvas=document.getElementById('mathCanvas'), ctx=canvas.getContext('2d');
let w,h,points=[];
function resize(){w=canvas.width=innerWidth;h=canvas.height=innerHeight;points=Array.from({length:45},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25}))}
function draw(){
 ctx.clearRect(0,0,w,h); ctx.lineWidth=.6;
 for(const p of points){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,1.5,0,Math.PI*2);ctx.stroke();}
 for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){let a=points[i],b=points[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<125){ctx.globalAlpha=(1-d/125)*.35;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.globalAlpha=1}}
 requestAnimationFrame(draw);
}
resize(); addEventListener('resize',resize); draw();
