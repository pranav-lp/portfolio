import * as THREE from 'three';
import gsap from 'gsap';

/* hyperspace streaks: each star = 2 vertices (head, tail) that fly toward the camera */
const SV = `attribute float aE,aR;uniform float uO,uS;varying float vA,vR;
void main(){float d=mod(position.z+uO*(.5+aR),200.);float z=10.-d-aE*uS*(.4+aR);
vA=smoothstep(0.,14.,d)*(1.-smoothstep(150.,200.,d))*(1.-aE*.92);vR=aR;
gl_Position=projectionMatrix*viewMatrix*vec4(position.x,position.y,z,1.);}`;
const SF = `uniform float uA;varying float vA,vR;
void main(){gl_FragColor=vec4(mix(vec3(.65,.78,1.),vec3(1.,.82,.55),vR),vA*uA);}`;

/* 26k-particle spiral galaxy that parts around the cursor and collapses on scroll */
const GV = `attribute float aR,aA,aH,aS;uniform float uT,uC,uPR,uA,uTl;uniform vec2 uM,uOf;varying vec3 vC;varying float vF;
void main(){float rad=aR*9.*(1.-uC*.85);float a=aA+uT*.35/(aR*1.6+.25);
vec3 p=vec3(cos(a)*rad,aH*(1.-aR)*1.1,sin(a)*rad);
float tl=uTl;p.yz=mat2(cos(tl),sin(tl),-sin(tl),cos(tl))*p.yz;
p.xy+=uOf;p.z-=6.;
vec2 dv=p.xy-uM;float dd=length(dv);p.xy+=normalize(dv+.0001)*exp(-dd*dd*.35)*1.6;
vec4 mv=viewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;
gl_PointSize=(1.2+aS*3.2)*uPR*(14./-mv.z);
vC=mix(vec3(1.,.88,.6),vec3(.95,.28,.1),smoothstep(0.,.9,aR));if(aS>.93)vC=vec3(.65,.75,1.);
vF=uA*(1.-smoothstep(.5,1.,uC))*(.35+.65*(1.-aR*.6));}`;
const GF = `varying vec3 vC;varying float vF;
void main(){float d=length(gl_PointCoord-.5);float a=smoothstep(.5,0.,d);gl_FragColor=vec4(vC,a*a*vF);}`;

export function initHero(RM, LITE) {
  const cv = document.getElementById('h3');
  const R = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true });
  R.setPixelRatio(Math.min(devicePixelRatio, LITE ? 1.25 : 2));
  const S = new THREE.Scene(), C = new THREE.PerspectiveCamera(60, 1, .1, 400);
  C.position.z = 10;

  // streaks
  const NS = LITE ? 900 : 1800, sp = new Float32Array(NS * 6), se = new Float32Array(NS * 2), sr = new Float32Array(NS * 2);
  for (let i = 0; i < NS; i++) {
    const a = Math.random() * 6.283, r = 1.5 + Math.sqrt(Math.random()) * 70, z = Math.random() * 200, k = Math.random();
    for (let j = 0; j < 2; j++) { sp.set([Math.cos(a) * r, Math.sin(a) * r * .6, z], (i * 2 + j) * 3); se[i * 2 + j] = j; sr[i * 2 + j] = k; }
  }
  const sg = new THREE.BufferGeometry();
  sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  sg.setAttribute('aE', new THREE.BufferAttribute(se, 1));
  sg.setAttribute('aR', new THREE.BufferAttribute(sr, 1));
  const su = { uO: { value: 0 }, uS: { value: 0 }, uA: { value: 0 } };
  const stars = new THREE.LineSegments(sg, new THREE.ShaderMaterial({ vertexShader: SV, fragmentShader: SF, uniforms: su, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
  stars.frustumCulled = false; S.add(stars);

  // galaxy
  const NG = LITE ? 9000 : 26000, gR = new Float32Array(NG), gA = new Float32Array(NG), gH = new Float32Array(NG), gS = new Float32Array(NG), gp = new Float32Array(NG * 3);
  for (let i = 0; i < NG; i++) {
    gR[i] = Math.pow(Math.random(), 1.6); gA[i] = (i % 3) * 2.094 + gR[i] * 9 + (Math.random() - .5) * .7;
    gH[i] = (Math.random() - .5) * 1.2 * (Math.random() < .2 ? 3 : 1); gS[i] = Math.random();
  }
  const gg = new THREE.BufferGeometry();
  gg.setAttribute('position', new THREE.BufferAttribute(gp, 3));
  [['aR', gR], ['aA', gA], ['aH', gH], ['aS', gS]].forEach(([n, a]) => gg.setAttribute(n, new THREE.BufferAttribute(a, 1)));
  const gu = { uT: { value: 0 }, uC: { value: 0 }, uTl: { value: .95 }, uPR: { value: R.getPixelRatio() }, uA: { value: 0 }, uM: { value: new THREE.Vector2(99, 99) }, uOf: { value: new THREE.Vector2(3.4, .3) } };
  const gal = new THREE.Points(gg, new THREE.ShaderMaterial({ vertexShader: GV, fragmentShader: GF, uniforms: gu, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
  gal.frustumCulled = false; S.add(gal);

  function size() {
    R.setSize(innerWidth, innerHeight, false); C.aspect = innerWidth / innerHeight; C.updateProjectionMatrix();
    gu.uOf.value.set(innerWidth > 900 ? 3.4 : 0, innerWidth > 900 ? .3 : 1.6);
  }
  addEventListener('resize', size); size();

  const mouse = { x: 0, y: 0 }, ray = new THREE.Vector3();
  addEventListener('pointermove', e => {
    mouse.x = e.clientX / innerWidth * 2 - 1; mouse.y = -(e.clientY / innerHeight * 2 - 1);
    ray.set(mouse.x, mouse.y, .5).unproject(C).sub(C.position).normalize();
    const t = (-6 - C.position.z) / ray.z; gu.uM.value.set(C.position.x + ray.x * t, C.position.y + ray.y * t);
  });

  // cinematic jump-in: hyperspace -> drop out -> flash + shockwave
  const st = { sp: RM ? 3 : 320, al: RM ? .7 : 0, ga: RM ? 1 : 0 };
  if (!RM) {
    document.getElementById('bgi').animate(
      [{ scale: 1.9, filter: 'blur(18px) brightness(2.4)' }, { scale: 1, filter: 'blur(0) brightness(1)' }],
      { duration: 3200, delay: 300, easing: 'cubic-bezier(.16,1,.3,1)' });
    gsap.set('.shk', { xPercent: -50, yPercent: -50 });
    gsap.timeline({ delay: .2 })
      .to(st, { al: 1, duration: .6 }, 0)
      .to(st, { sp: 3, duration: 2.6, ease: 'power4.out' }, .5)
      .to(st, { ga: 1, duration: 2.2, ease: 'power2.out' }, 1.8)
      .fromTo('.flash', { opacity: .95 }, { opacity: 0, duration: 1.2, ease: 'power2.out' }, 2.9)
      .fromTo('.shk', { opacity: 1, width: 20, height: 20 }, { opacity: 0, width: 2600, height: 2600, duration: 1.7, ease: 'power3.out' }, 2.9)
      .to(st, { al: .65, duration: 1.5 }, 3.4);
  }

  let last = performance.now(), off = 0, ly = scrollY, sv = 0;
  (function f(now) {
    if (document.hidden) { last = now; requestAnimationFrame(f); return; }
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    const v = (scrollY - ly) / Math.max(dt, .008); ly = scrollY; sv += (v - sv) * .1;
    const sp2 = st.sp + Math.min(140, Math.abs(sv) * .04), co = Math.min(1, scrollY / (innerHeight * 1.1));
    off += sp2 * dt; su.uO.value = off; su.uS.value = Math.min(150, sp2 * .42); su.uA.value = st.al;
    gu.uT.value += dt * (1 + st.sp * .04); const pr = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
    gu.uC.value = Math.min(.25, co * .25); gu.uA.value = st.ga * (1 - co * .45); gu.uTl.value = .95 + Math.sin(pr * 3) * .3;
    gu.uOf.value.set(innerWidth > 900 ? 3.4 * Math.cos(pr * 3) : 0, (innerWidth > 900 ? .3 : 1.6) + Math.sin(pr * 4) * .6);
    C.position.x += (mouse.x * .9 - C.position.x) * .04; C.position.y += (mouse.y * .5 - C.position.y) * .04;
    C.lookAt(0, 0, -6); cv.style.opacity = 1 - co * .4;
    R.render(S, C); requestAnimationFrame(f);
  })(last);
}
