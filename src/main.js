import * as THREE from 'three';
import Lenis from 'lenis';
import './style.css';
import IMG from './assets/avatar.jpg';
import BG from './assets/space.jpg';
import resumeUrl from './assets/Pranav_LP_Resume.pdf';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,LITE=matchMedia('(pointer:coarse)').matches||(navigator.hardwareConcurrency||8)<=4;
const bgw=document.querySelector(".bgw");$('#pt').src=IMG;$('#bgi').src=BG;
const h=$('.sp');h.innerHTML=h.innerHTML.split(/(<em>.*?<\/em>)|\s+/).filter(Boolean).map((w,i)=>'<span class="w"><i style="--d:'+(.15+i*.08)+'s">'+w+'</i></span>').join(' ');

/* reveal + counters */
function count(el){const n=+el.dataset.n,s=el.dataset.s||'',t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/1300);el.textContent=Math.round(n*(1-Math.pow(1-p,3)))+s;if(p<1)requestAnimationFrame(f)})(t0)}
function reveal(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');const b=e.target.querySelector('[data-n]');if(b)count(b);io.unobserve(e.target)}}),{threshold:.15});$$('.rv').forEach(el=>io.observe(el))}
setTimeout(()=>{document.body.classList.add('go');reveal()},RM?0:3000);

/* 3D tilt + spotlight */
$$('[data-t]').forEach(el=>{
  el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    el.style.setProperty('--mx',x*100+'%');el.style.setProperty('--my',y*100+'%');
    el.style.transform='perspective(900px) rotateX('+((.5-y)*9)+'deg) rotateY('+((x-.5)*11)+'deg) translateZ(8px)'});
  el.addEventListener('pointerleave',()=>el.style.transform='')});
const pc=$('.pc'),stage=$('.stage');
stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;pc.style.transform='rotateY('+x*22+'deg) rotateX('+(-y*18)+'deg)'});
stage.addEventListener('pointerleave',()=>pc.style.transform='');

/* cursor glow + progress */
const cur=$('.cur'),bar=$('.bar'),m={x:0,y:0};
addEventListener('pointermove',e=>{cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px';m.x=e.clientX/innerWidth-.5;m.y=e.clientY/innerHeight-.5});

/* extras */
const roles=['Agentic AI engineer','Computer vision builder','Robotics tinkerer','Hackathon finalist'],re=$('#role');let ri=0,ci=0,del=false;
(function ty(){const w=roles[ri];ci+=del?-1:1;re.textContent=w.slice(0,ci);let d=del?35:70;if(!del&&ci===w.length){del=true;d=1400}else if(del&&ci===0){del=false;ri=(ri+1)%roles.length;d=300}setTimeout(ty,d)})();
const ld=$('#ld');let lc=0;const li=setInterval(()=>{lc=Math.min(100,lc+4);ld.textContent=lc;if(lc>=100)clearInterval(li)},56);
$$('.btn,.ic a,.nav .cta').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.25)+'px,'+((e.clientY-r.top-r.height/2)*.35)+'px)'});b.addEventListener('pointerleave',()=>b.style.transform='')});
$$('.cp p').forEach(p=>{p.innerHTML=p.innerHTML.replace(/(<[^>]+>)|([^<\s]+)/g,(m,t,w)=>t||'<span class="wd">'+w+'</span>')});
const gh=$('.gh'),wds=$$('.wd'),up=$('#up'),navs=$$('.nav a.h'),secs=['about','projects','podiums','skills'].map(id=>document.getElementById(id));
function sc(){const y=innerHeight*.78;gh.style.transform='translate(-50%,calc(-50% + '+scrollY*.22+'px))';wds.forEach(w=>w.classList.toggle('on',w.getBoundingClientRect().top<y));up.classList.toggle('s',scrollY>700);let cu=-1;secs.forEach((s,i)=>{if(s.getBoundingClientRect().top<innerHeight*.4)cu=i});navs.forEach((a,i)=>a.classList.toggle('on',i===cu))}
addEventListener('scroll',sc,{passive:true});sc();
up.onclick=()=>scrollTo({top:0,behavior:'smooth'});
function msg(t){const e=$('#tt');e.textContent=t;e.classList.add('s');setTimeout(()=>e.classList.remove('s'),2400)}
$('#cp').onclick=()=>{(navigator.clipboard?navigator.clipboard.writeText('pranavworks.lp@gmail.com'):Promise.reject()).then(()=>msg('Email copied to clipboard'),()=>msg('pranavworks.lp@gmail.com'))};
const hn=[['about','About'],['projects','Projects'],['podiums','Podiums'],['log','Hackathon log'],['skills','Skills'],['credentials','Background'],['contact','Contact']];
setInterval(()=>{let n='Launch pad';hn.forEach(([id,nm])=>{if(document.getElementById(id).getBoundingClientRect().top<innerHeight*.4)n=nm});$$('.rail a').forEach(a=>a.classList.toggle('on',a.dataset.n===n))},150);
/* form */
$('#cf').addEventListener('submit',async e=>{e.preventDefault();const f=e.target,btn=f.querySelector('button'),fb=$('#fb'),d=Object.fromEntries(new FormData(f));if(d._honey)return;
  btn.disabled=true;btn.textContent='Sending...';fb.style.color='';fb.textContent='Sending your message...';
  const mailto=()=>{const a=document.createElement('a');a.href='mailto:pranavworks.lp@gmail.com?subject='+encodeURIComponent('Portfolio message from '+d.n)+'&body='+encodeURIComponent(d.m+'\n\n'+d.n+'\n'+d.e);a.click()};
  const key=import.meta.env.VITE_WEB3FORMS_KEY||'';
  const EP=import.meta.env.VITE_FORM_ENDPOINT||'https://api.web3forms.com/submit';
  try{
    const body=EP.includes('web3forms.com')?{access_key:key,name:d.n,email:d.e,message:d.m,subject:'Portfolio message from '+d.n,from_name:d.n,botcheck:d._honey||''}:{name:d.n,email:d.e,message:d.m,_subject:'Portfolio message from '+d.n,_replyto:d.e};
    const r=await fetch(EP,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(body)});
    const j=await r.json().catch(()=>({}));
    if(r.ok&&j.success!==false&&j.success!=='false'){
      fb.textContent='Message sent! I will reply to '+d.e+' soon.';fb.style.color='#7eed93';btn.textContent='Sent ✓';f.reset();
      setTimeout(()=>{btn.disabled=false;btn.textContent='Send message →';fb.style.color='';fb.textContent='Your message goes straight to my inbox.'},5000);
      return;
    }
    throw new Error(j.message||'Submission failed');
  }
  catch(_){fb.style.color='#ff9e9e';fb.textContent='Could not send automatically. Opening your email app instead, or write to pranavworks.lp@gmail.com.';mailto();btn.disabled=false;btn.textContent='Send message →'}});

/* realistic meteors + cursor dust */
(function(){
if(RM){$('#fx').remove();return}
const cv=$('#fx'),c=cv.getContext('2d');let W,H;const dust=[],tr=[],mt=[],mv={x:-999,y:-999,px:-999,py:-999};
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight}addEventListener('resize',rs);rs();
for(let i=0;i<(LITE?60:150);i++)dust.push({x:Math.random()*W,y:Math.random()*H,z:.3+Math.random()*.7,vx:(Math.random()-.5)*.15,vy:-.05-Math.random()*.12,r:.6+Math.random()*1.6,ph:Math.random()*6});
addEventListener('pointermove',e=>{mv.x=e.clientX;mv.y=e.clientY;if(mv.px<-900){mv.px=mv.x;mv.py=mv.y}const dx=mv.x-mv.px,dy=mv.y-mv.py,sp=Math.min(Math.hypot(dx,dy),60);mv.px=mv.x;mv.py=mv.y;
 for(let i=0;i<Math.ceil(sp/7);i++)if(tr.length<500)tr.push({x:mv.x+(Math.random()-.5)*8,y:mv.y+(Math.random()-.5)*8,vx:dx*.08+(Math.random()-.5)*1.2,vy:dy*.08+(Math.random()-.5)*1.2-.1,l:1,d:.012+Math.random()*.014,r:.6+Math.random()*2,h:Math.random()<.5?'255,215,140':'255,150,80'})});
function spawn(){const big=Math.random()<.25,a=.3+Math.random()*.35;mt.push({x:W*(.25+Math.random()*.9),y:-30-Math.random()*H*.2,dx:-Math.cos(a),dy:Math.sin(a),sp:(big?900:1200)+Math.random()*500,len:(big?420:260)+Math.random()*160,w:big?3.6:2.2,big,t:0})}
let nx=1.2,last=performance.now(),ly=scrollY,sv=0;const ws=Array.from({length:170},()=>({a:Math.random()*6.283,r:Math.random()*600,s:.3+Math.random()*.9})),sw=[];
addEventListener('pointerdown',e=>{sw.push({x:e.clientX,y:e.clientY,t:0});for(let i=0;i<46;i++){const a=Math.random()*6.283,s=2+Math.random()*7;tr.push({x:e.clientX,y:e.clientY,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:1,d:.018+Math.random()*.02,r:.8+Math.random()*2.2,h:Math.random()<.5?'255,215,140':'255,120,50'})}});
(function f(now){if(document.hidden){last=now;requestAnimationFrame(f);return}const dt=Math.min(.05,(now-last)/1000);last=now;c.clearRect(0,0,W,H);c.globalCompositeOperation='lighter';
 nx-=dt;if(nx<0){spawn();nx=2.5+Math.random()*4.5}
 const v=(scrollY-ly)/Math.max(dt,.008);ly=scrollY;sv+=(v-sv)*.12;const av=Math.abs(sv),wa=Math.min(.5,av/3200);
 if(wa>.03){const cx=W/2,cy=H*.45,mx=Math.hypot(cx,cy);c.lineCap='round';for(const s of ws){s.r+=(av*.0022+1)*s.s*(1+s.r/260);if(s.r>mx){s.r=20+Math.random()*80;s.a=Math.random()*6.283}const l=Math.min(240,av*.06)*s.s*(.3+s.r/mx),cs=Math.cos(s.a),sn=Math.sin(s.a),r0=Math.max(0,s.r-l);c.strokeStyle='rgba(255,'+(200+s.s*50|0)+','+(150+s.s*90|0)+','+wa*(.25+s.r/mx*.7)+')';c.lineWidth=.6+s.r/mx*2.2;c.beginPath();c.moveTo(cx+cs*r0,cy+sn*r0);c.lineTo(cx+cs*s.r,cy+sn*s.r);c.stroke()}}
 for(let i=sw.length-1;i>=0;i--){const o=sw[i];o.t+=dt;const k=o.t/.8;if(k>1){sw.splice(i,1);continue}c.strokeStyle='rgba(255,210,140,'+(1-k)*.7+')';c.lineWidth=3*(1-k)+.5;c.beginPath();c.arc(o.x,o.y,k*220,0,7);c.stroke()}
 for(const d of dust){d.ph+=dt;d.x+=d.vx+Math.sin(d.ph*.7)*.12;d.y+=d.vy;
  const dx=d.x-mv.x,dy=d.y-mv.y,ds=Math.hypot(dx,dy)||1;if(ds<170){const k=(1-ds/170)*2.2*d.z;d.x+=dx/ds*k-dy/ds*k*.6;d.y+=dy/ds*k+dx/ds*k*.6}
  if(d.y<-10)d.y=H+10;if(d.x<-10)d.x=W+10;if(d.x>W+10)d.x=-10;if(d.y>H+10)d.y=-10;
  const a=(.25+.25*Math.sin(d.ph*2))*d.z+(ds<170?.35*(1-ds/170):0);
  c.fillStyle='rgba(255,230,190,'+a+')';c.beginPath();c.arc(d.x,d.y,d.r*d.z*1.3,0,7);c.fill();
  if(d.r>1.6){c.fillStyle='rgba(255,200,130,'+a*.18+')';c.beginPath();c.arc(d.x,d.y,d.r*5,0,7);c.fill()}}
 c.lineWidth=.6;if(!LITE)for(let i=0;i<dust.length;i++){const p=dust[i];for(let j=i+1;j<dust.length;j++){const q=dust[j],dx=p.x-q.x,dy=p.y-q.y,dd=dx*dx+dy*dy;if(dd<10000){c.strokeStyle='rgba(255,225,180,'+(1-dd/10000)*.2*Math.min(p.z,q.z)+')';c.beginPath();c.moveTo(p.x,p.y);c.lineTo(q.x,q.y);c.stroke()}}const ax=p.x-mv.x,ay=p.y-mv.y,md=ax*ax+ay*ay;if(md<32400){c.strokeStyle='rgba(255,200,120,'+(1-md/32400)*.45+')';c.beginPath();c.moveTo(p.x,p.y);c.lineTo(mv.x,mv.y);c.stroke()}}
 for(let i=tr.length-1;i>=0;i--){const p=tr[i];p.x+=p.vx;p.y+=p.vy;p.vx*=.97;p.vy*=.97;p.l-=p.d;if(p.l<=0){tr.splice(i,1);continue}
  c.fillStyle='rgba('+p.h+','+p.l*.8+')';c.beginPath();c.arc(p.x,p.y,p.r*(.4+p.l),0,7);c.fill();
  c.fillStyle='rgba('+p.h+','+p.l*.12+')';c.beginPath();c.arc(p.x,p.y,p.r*4*p.l,0,7);c.fill()}
 for(let i=mt.length-1;i>=0;i--){const m=mt[i];m.t+=dt;const hx=m.x+m.dx*m.sp*m.t,hy=m.y+m.dy*m.sp*m.t;
  if(hx<-m.len||hy>H+m.len){mt.splice(i,1);continue}
  const tx=hx-m.dx*m.len,ty=hy-m.dy*m.len,ox=-m.dy,oy=m.dx;
  const g=c.createLinearGradient(hx,hy,tx,ty);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.08,'rgba(255,235,200,.95)');g.addColorStop(.3,'rgba(255,170,90,.55)');g.addColorStop(.7,'rgba(220,80,30,.18)');g.addColorStop(1,'rgba(150,40,10,0)');
  c.fillStyle=g;c.beginPath();c.moveTo(hx+ox*m.w,hy+oy*m.w);c.lineTo(tx,ty);c.lineTo(hx-ox*m.w,hy-oy*m.w);c.closePath();c.fill();
  const g2=c.createLinearGradient(hx,hy,tx,ty);g2.addColorStop(0,'rgba(255,200,140,.35)');g2.addColorStop(1,'rgba(255,100,40,0)');c.fillStyle=g2;c.beginPath();c.moveTo(hx+ox*m.w*4,hy+oy*m.w*4);c.lineTo(tx,ty);c.lineTo(hx-ox*m.w*4,hy-oy*m.w*4);c.closePath();c.fill();
  const R=m.big?34:20,hg=c.createRadialGradient(hx,hy,0,hx,hy,R);hg.addColorStop(0,'rgba(255,255,255,1)');hg.addColorStop(.25,'rgba(255,220,170,.7)');hg.addColorStop(1,'rgba(255,120,40,0)');c.fillStyle=hg;c.beginPath();c.arc(hx,hy,R,0,7);c.fill();
  if(tr.length<500&&Math.random()<(m.big?.9:.5))tr.push({x:hx,y:hy,vx:-m.dx*40*dt+(Math.random()-.5)*1.5,vy:-m.dy*40*dt+(Math.random()-.5)*1.5,l:1,d:.03,r:.8+Math.random()*1.4,h:'255,170,90'})}
 requestAnimationFrame(f)})(last);
})();
/* WebGL scene: dust + rocks, scroll-driven camera */
const R=new THREE.WebGLRenderer({canvas:$('#gl'),antialias:!LITE,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio,LITE?1.25:2));
const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(50,1,.1,200);C.position.z=12;
const N=LITE?700:1700,pa=new Float32Array(N*3),ca=new Float32Array(N*3);
for(let i=0;i<N;i++){pa.set([(Math.random()-.5)*64,(Math.random()-.5)*90,(Math.random()-.5)*40-6],i*3);ca.set([[1,1,1],[.8,.8,.85],[1,.55,.25]][i%3],i*3)}
const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pa,3));pg.setAttribute('color',new THREE.BufferAttribute(ca,3));
const pts=new THREE.Points(pg,new THREE.PointsMaterial({size:.07,vertexColors:true,transparent:true,opacity:.85,blending:THREE.AdditiveBlending,depthWrite:false}));S.add(pts);
const dl=new THREE.DirectionalLight(0xffe2c0,2.6);dl.position.set(-6,4,6);S.add(dl,new THREE.AmbientLight(0x303046,.8));
const rk=document.createElement('canvas');rk.width=rk.height=256;const rc=rk.getContext('2d');rc.fillStyle='#6b6258';rc.fillRect(0,0,256,256);
for(let i=0;i<2600;i++){const g=55+Math.random()*115|0;rc.fillStyle='rgba('+g+','+(g-6)+','+(g-14)+',.32)';rc.fillRect(Math.random()*256,Math.random()*256,Math.random()*6+1,Math.random()*6+1)}
for(let i=0;i<30;i++){rc.strokeStyle='rgba(20,18,16,.45)';rc.lineWidth=1.5;rc.beginPath();rc.arc(Math.random()*256,Math.random()*256,3+Math.random()*12,0,7);rc.stroke()}
const rt=new THREE.CanvasTexture(rk);rt.wrapS=rt.wrapT=THREE.RepeatWrapping;
const rmat=new THREE.MeshStandardMaterial({map:rt,bumpMap:rt,bumpScale:3,roughness:1,metalness:.05});
const rgs=[0,1,2,3].map(()=>{const g=new THREE.IcosahedronGeometry(1,LITE?3:4),p=g.attributes.position,s=Math.random()*9;for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),k=1+.28*Math.sin(x*3+s)*Math.cos(y*2.6+s)+.15*Math.sin(z*7+s*2)+.07*Math.sin((x+y+z)*13+s);p.setXYZ(i,x*k*1.25,y*k*.85,z*k)}g.computeVertexNormals();return g});
const fl=[];for(let i=0;i<(LITE?10:26);i++){const o=new THREE.Mesh(rgs[i%4],rmat);o.scale.setScalar(.12+Math.random()*.45);o.userData.r=Math.random()*6;o.position.set((Math.random()-.5)*30,(Math.random()-.5)*50,-Math.random()*18);S.add(o);fl.push(o)}
function size(){R.setSize(innerWidth,innerHeight,false);C.aspect=innerWidth/innerHeight;C.updateProjectionMatrix()}
addEventListener('resize',size);size();
const clk=new THREE.Clock();
(function f(){
  if(document.hidden){requestAnimationFrame(f);return}
  const t=clk.getElapsedTime(),p=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight);
  bar.style.width=p*100+'%';bgw.style.transform='translate3d('+(-m.x*36)+'px,'+(-p*40-m.y*16)+'px,0) scale('+(1+p*.1)+')';
  C.position.y=-p*22;C.position.x+=(m.x*1.6-C.position.x)*.04;C.position.z=12-Math.sin(p*Math.PI)*3;C.lookAt(C.position.x*.3,C.position.y+m.y*-.8,0);
  fl.forEach((o,i)=>{o.rotation.x=o.userData.r+t*.06*(1+i%3);o.rotation.y=o.userData.r*2+t*.08;o.position.x+=Math.sin(t*.3+i)*.002});
  pts.rotation.y=t*.01;pts.material.opacity=.75+Math.sin(t*2.2)*.12;
  R.render(S,C);requestAnimationFrame(f);
})();

/* smooth scroll + hero */
const lenis=RM?{raf(){},stop(){},start(){},scrollTo(t){t.scrollIntoView()}}:new Lenis({lerp:.075,wheelMultiplier:.9});if(!RM)(function r(t){lenis.raf(t);requestAnimationFrame(r)})(0);
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();lenis.scrollTo(t,{offset:-70})}}));
import('./hero.js').then(h=>h.initHero(RM,LITE));

/* resume viewer */
$$('[data-dl]').forEach(a=>a.href=resumeUrl);
const mdl=$('#mdl'),mf=$('#mf');let blob;
const lock=on=>['main','.nav','footer','.up','.skip'].forEach(s=>{const e=$(s);if(e)e.inert=on});let opener=null;
async function openR(){let u=resumeUrl;if(u.startsWith('data:')){if(!blob)blob=URL.createObjectURL(await (await fetch(u)).blob());u=blob}
 if(matchMedia('(pointer:coarse)').matches||innerWidth<700){window.open(u,'_blank','noopener');return}
 opener=document.activeElement;mf.src=u;$('#mnew').href=u;mdl.hidden=false;lock(true);lenis.stop();$('#mx').focus()}
function closeR(){mdl.hidden=true;mf.src='about:blank';lock(false);lenis.start();opener&&opener.focus()}
$$('[data-resume]').forEach(b=>b.addEventListener('click',openR));$('#mx').onclick=closeR;
mdl.addEventListener('click',e=>{if(e.target===mdl)closeR()});addEventListener('keydown',e=>{if(e.key==='Escape'&&!mdl.hidden)closeR()});

/* arenas list modal + chip stagger */
$$('.tg').forEach(t=>[...t.children].forEach((c,i)=>c.style.setProperty('--i',i)));
const lm=$('#lm');
function openL(){opener=document.activeElement;lm.classList.add('show');lm.setAttribute('aria-hidden','false');lock(true);lenis.stop();setTimeout(()=>$('#lx').focus(),400)}
function closeL(){lm.classList.remove('show');lm.setAttribute('aria-hidden','true');lock(false);lenis.start();(opener||$('#lo')).focus()}
$('#lo').onclick=openL;$('#lx').onclick=closeL;
lm.addEventListener('click',e=>{if(e.target===lm)closeL()});
addEventListener('keydown',e=>{if(e.key==='Escape'&&lm.classList.contains('show'))closeL()});

/* alive: mouse parallax, reactive headings, chip physics, live clock (only for on-screen elements) */
const M={x:0,y:0,tx:0,ty:0,px:-999,py:-999};
addEventListener('pointermove',e=>{M.tx=e.clientX/innerWidth-.5;M.ty=e.clientY/innerHeight-.5;M.px=e.clientX;M.py=e.clientY});
const lay=[...new Set($$('[data-t],.sh,.pill'))].map((el,i)=>({el,d:3+(i*5%5)}));
const hds=$$('.sh h2,.pj h3,.po h3'),chips=LITE?[]:$$('.c').map(el=>({el,x:0,y:0,vx:0,vy:0}));
const vis=new Set(),vio=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting?vis.add(e.target):vis.delete(e.target)),{rootMargin:'80px'});
hds.forEach(h=>vio.observe(h));chips.forEach(c=>vio.observe(c.el));lay.forEach(o=>vio.observe(o.el));
const clkEl=$('#clk');if(clkEl){const tk=()=>clkEl.textContent='· '+new Date().toLocaleTimeString('en-GB',{timeZone:'Asia/Kolkata',hour12:false})+' IST';tk();setInterval(tk,1000)}
(function alive(){if(RM)return;if(document.hidden){requestAnimationFrame(alive);return}
 M.x+=(M.tx-M.x)*.06;M.y+=(M.ty-M.y)*.06;
 lay.forEach(o=>{if(vis.has(o.el))o.el.style.translate=(M.x*o.d).toFixed(1)+'px '+(M.y*o.d*.8).toFixed(1)+'px'});
 hds.forEach(h=>{if(!vis.has(h))return;const r=h.getBoundingClientRect();h.style.setProperty('--hx',(M.px-r.left)+'px');h.style.setProperty('--hy',(M.py-r.top)+'px')});
 chips.forEach(c=>{if(!vis.has(c.el))return;const r=c.el.getBoundingClientRect(),dx=r.left+r.width/2-c.x-M.px,dy=r.top+r.height/2-c.y-M.py,d=Math.hypot(dx,dy)||1,f=d<140?(1-d/140)*34:0;c.vx+=(dx/d*f-c.x)*.14;c.vy+=(dy/d*f-c.y)*.14;c.vx*=.76;c.vy*=.76;c.x+=c.vx;c.y+=c.vy;c.el.style.translate=c.x.toFixed(1)+'px '+c.y.toFixed(1)+'px'});
 requestAnimationFrame(alive)})();
