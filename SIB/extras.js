/* SIB pixel extras: 9 features in one file, each can be turned on/off.
   Load it AFTER i18n.js and BEFORE script.js:
     <script src="data.js"></script><script src="i18n.js"></script>
     <script src="extras.js"></script><script src="script.js"></script><script src="sound.js"></script>
   Change true/false below, or override from data.js with:  fx:{xpBar:false, tvGame:false}  inside window.SITE */
(function(){
var CFG={
  pressStart:true,    /* 1  PRESS START screen before the boot */
  xpBar:true,         /* 2  XP bar under the nav that fills while scrolling + LEVEL UP */
  achievements:true,  /* 3  "Achievement unlocked" toasts (saved in the browser) */
  clickBurst:true,    /* 4  pixel burst on every click */
  shake:true,         /* 4b screen shake when clicking buttons and links */
  konami:true,        /* 5  secret mode: Konami code, or tap the hero logo 7 times */
  tvGame:true,        /* 6  Snake on the TV while the stream is offline */
  footerSprite:true,  /* 7  little ghost walking in the footer (click to jump) */
  typewriter:true,    /* 8  hero title typed letter by letter */
  modHearts:true      /* 9  hearts under each mod */
};
if(window.SITE&&SITE.fx)for(var k in SITE.fx)CFG[k]=SITE.fx[k];

var RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
var R='#f01818',D='#680808',M='#c40e0e',L='#ff5252';
function ar(){return document.documentElement.lang==='ar'}
function T(en,a){return ar()?a:en}
function snd(n){try{if(window.SIBSound&&SIBSound[n])SIBSound[n]()}catch(e){}}
function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function pix(map,pal){
  var h='',r=map.length,c=map[0].length;
  for(var y=0;y<r;y++)for(var x=0;x<c;x++){var ch=map[y][x];if(pal[ch])h+='<rect x="'+x+'" y="'+y+'" width="1" height="1" fill="'+pal[ch]+'"/>'}
  return '<svg viewBox="0 0 '+c+' '+r+'" shape-rendering="crispEdges">'+h+'</svg>';
}
function whenBooted(cb){
  var b=document.getElementById('boot');
  if(!b||b.style.display==='none'){cb();return}
  var mo=new MutationObserver(function(){if(b.style.display==='none'){mo.disconnect();cb()}});
  mo.observe(b,{attributes:true,attributeFilter:['style']});
}

/* ---------- CSS ---------- */
var st=document.createElement('style');
st.textContent=`
#ps{position:fixed;inset:0;z-index:101;background:#000;display:grid;place-items:center;text-align:center;cursor:pointer}
#ps .px{color:var(--r);font-size:clamp(14px,4vw,24px)}
#ps .blk{animation:blink 1s steps(1) infinite;text-shadow:4px 4px 0 var(--rd)}
#ps .sm{font-size:8px;color:var(--g);margin-top:26px;line-height:1.8}
html:lang(ar) #ps .px{font-size:clamp(20px,5vw,32px)}html:lang(ar) #ps .sm{font-size:14px}
#fx{position:fixed;inset:0;width:100%;height:100%;z-index:120;pointer-events:none}
#xp{position:fixed;left:0;right:0;direction:ltr;top:calc(68px + env(safe-area-inset-top,0px));height:6px;background:#000;z-index:41}
#xp i{display:block;height:100%;width:0;background:repeating-linear-gradient(90deg,var(--r) 0 6px,var(--rd) 6px 8px)}
#lvl{position:fixed;left:0;right:0;top:38%;text-align:center;z-index:121;pointer-events:none;font:clamp(20px,6vw,44px) var(--f1);color:var(--bn);text-shadow:6px 6px 0 var(--rd);animation:blink .3s steps(1) 6}
#fxt{position:fixed;bottom:24px;inset-inline-end:28px;z-index:70;display:flex;flex-direction:column;gap:26px;width:min(300px,76vw);pointer-events:none}
.fxt{display:flex;gap:14px;align-items:center;padding:14px 16px;animation:tin .5s steps(5)}
.fxt svg{width:32px;height:32px;flex:none}
.fxt small{display:block;font:7px/1.6 var(--f1);color:var(--rl)}
.fxt b{display:block;font:10px/1.5 var(--f1);font-weight:400;color:var(--bn)}
html:lang(ar) .fxt small{font-size:13px}html:lang(ar) .fxt b{font-size:17px}
@keyframes tin{from{transform:translateY(160%)}}
@keyframes shk{25%{transform:translate(-4px,2px)}50%{transform:translate(4px,-2px)}75%{transform:translate(-2px,-2px)}}
main.shk{animation:shk .22s steps(4)}
html.k main,html.k nav,html.k footer,html.k #bg,html.k #xp{filter:hue-rotate(120deg)}
#snk{position:absolute;inset:0;width:100%;height:100%;display:none;background:#050203;touch-action:none;z-index:5}
.btn.gbtn{padding:10px 12px;font-size:8px}
.hearts{display:flex;justify-content:center;gap:4px;margin-top:12px}
.hearts svg{width:16px;height:16px;display:block}
.mod:hover .hearts svg{animation:hb .5s steps(2) infinite}
.hearts svg:nth-child(2){animation-delay:.08s}.hearts svg:nth-child(3){animation-delay:.16s}.hearts svg:nth-child(4){animation-delay:.24s}.hearts svg:nth-child(5){animation-delay:.32s}
@keyframes hb{50%{transform:translateY(-4px)}}
footer{position:relative;overflow:hidden}
.spr{position:absolute;top:4px;left:0;width:40px;height:40px;cursor:pointer}
.spr .si svg{width:40px;height:40px;display:block}
.spr .si svg+svg{display:none}.spr .si.f svg:first-child{display:none}.spr .si.f svg+svg{display:block}
.spr.jmp .hop{animation:hop .45s steps(6)}
@keyframes hop{50%{transform:translateY(-26px)}}
`;
document.head.appendChild(st);

/* ---------- 1. PRESS START ---------- */
var pressed=!CFG.pressStart,ps=null;
if(CFG.pressStart){
  /* hold the boot loader (the 90ms interval in script.js) until the player presses */
  var _si=window.setInterval;
  window.setInterval=function(f,d){
    if(d===90){window.setInterval=_si;return _si.call(window,function(){if(pressed)f.apply(this,arguments)},d)}
    return _si.apply(window,arguments);
  };
  ps=document.createElement('div');ps.id='ps';
  ps.innerHTML='<div><img class="lg" src="img/logo.jpg" width="120" height="120" alt="" style="margin-bottom:26px"><div class="px blk" id="ps1"></div><div class="px sm" id="ps2"></div></div>';
  document.body.appendChild(ps);
  var pt=function(){document.getElementById('ps1').textContent=T('PRESS START','اضغط للبدء');document.getElementById('ps2').textContent=T('CLICK, TAP OR PRESS ANY KEY','اضغط أو المس أي مكان')};
  pt();addEventListener('langchange',pt);
  var press=function(){if(pressed)return;pressed=true;removeEventListener('keydown',press);ps.remove();snd('click')};
  ps.addEventListener('click',press);addEventListener('keydown',press);
}

/* ---------- particles (click burst, level up) ---------- */
var fx=document.createElement('canvas'),fc=fx.getContext('2d'),P=[],raf=0;
fx.id='fx';document.body.appendChild(fx);
function rs(){fx.width=innerWidth;fx.height=innerHeight}rs();addEventListener('resize',rs);
function loop(){
  fc.clearRect(0,0,fx.width,fx.height);
  P=P.filter(function(p){
    p.l--;p.vy+=.35;p.x+=p.vx;p.y+=p.vy;if(p.l<=0)return false;
    fc.fillStyle=p.c;fc.fillRect((p.x/4|0)*4,(p.y/4|0)*4,p.z,p.z);return true});
  raf=P.length?requestAnimationFrame(loop):0;
}
function burst(x,y,n,pw){
  if(RM)return;
  for(var i=0;i<n;i++){var a=Math.random()*6.283,s=(Math.random()*.6+.4)*(pw||5);
    P.push({x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-2,l:24+(Math.random()*20|0),c:[R,L,M,D][Math.random()*4|0],z:Math.random()>.5?6:4})}
  if(!raf)raf=requestAnimationFrame(loop);
}
function shake(){
  var m=document.querySelector('main');if(!m||RM)return;
  m.classList.remove('shk');void m.offsetWidth;m.classList.add('shk');setTimeout(function(){m.classList.remove('shk')},260);
}

/* ---------- 4. click burst + shake ---------- */
if(CFG.clickBurst)document.addEventListener('pointerdown',function(e){
  var big=e.target.closest&&e.target.closest('.btn,a,button');
  burst(e.clientX,e.clientY,big?18:9,big?6:4);
  if(big&&CFG.shake)shake();
},true);

/* ---------- 3. achievements ---------- */
var ACH={
  start:['PLAYER 1 READY','اللاعب الأول جاهز'],
  projects:['PROJECT HUNTER','صائد المشاريع'],
  social:['SOCIAL BUTTERFLY','نجم السوشال'],
  mods:['MOD SQUAD','فريق المشرفين'],
  services:['WEB WIZARD','ساحر المواقع'],
  link:['EXPLORER','مستكشف'],
  lang:['POLYGLOT','متعدد اللغات'],
  levelup:['MAX LEVEL','المستوى الأعلى'],
  snake:['SNAKE CHARMER','مروّض الثعبان'],
  konami:['SECRET FOUND','سر مكتشف'],
  player2:['PLAYER 2 JOINED','انضم اللاعب الثاني']
};
var got=[];try{got=JSON.parse(get('sib-ach')||'[]')}catch(e){}
var tw=null;
function toast(title,sub){
  if(!tw){tw=document.createElement('div');tw.id='fxt';document.body.appendChild(tw)}
  var d=document.createElement('div');d.className='box fxt';
  d.innerHTML=pix(['RRRRRRRR','R.RRRR.R','R.RRRR.R','.RRLLRR.','..RRRR..','...RR...','..RRRR..','..RRRR..'],{R:R,L:L})+'<div><small></small><b></b></div>';
  d.querySelector('small').textContent=sub;d.querySelector('b').textContent=title;
  tw.appendChild(d);setTimeout(function(){d.remove()},3600);
}
function ach(id){
  if(!CFG.achievements||!ACH[id]||got.indexOf(id)>-1)return;
  got.push(id);set('sib-ach',JSON.stringify(got));
  var n=got.length+'/'+Object.keys(ACH).length;
  toast(T(ACH[id][0],ACH[id][1]),T('ACHIEVEMENT '+n,'إنجاز '+n));
  snd('ok');
}
if(CFG.achievements){
  whenBooted(function(){setTimeout(function(){ach('start')},700)});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){ach(e.target.id);io.unobserve(e.target)}})},{threshold:.35});
    ['projects','social','mods','services'].forEach(function(id){var s=document.getElementById(id);if(s)io.observe(s)});
  }
  document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('a.proj[href]'))ach('link')});
  addEventListener('langchange',function(){ach('lang')});
  var msg=document.getElementById('msg');
  if(msg)new MutationObserver(function(){if(/Player 2|انضم/.test(msg.textContent))ach('player2')}).observe(msg,{childList:true,characterData:true,subtree:true});
}

/* ---------- 2. XP bar ---------- */
function levelUp(){
  var b=document.createElement('div');b.id='lvl';b.textContent=T('LEVEL UP!','مستوى جديد!');document.body.appendChild(b);
  setTimeout(function(){b.remove()},1700);
  burst(innerWidth/2,innerHeight/2,60,9);snd('start');ach('levelup');
}
if(CFG.xpBar){
  var xb=document.createElement('div');xb.id='xp';xb.innerHTML='<i></i>';document.body.appendChild(xb);
  var xi=xb.firstChild,lvl=false,q=0;
  var upd=function(){
    q=0;var h=document.documentElement.scrollHeight-innerHeight,p=h>0?Math.min(1,scrollY/h):0;
    xi.style.width=(Math.round(p*20)*5)+'%';
    if(p>.985&&!lvl){lvl=true;levelUp()}
  };
  var sch=function(){if(!q)q=requestAnimationFrame(upd)};
  addEventListener('scroll',sch,{passive:true});addEventListener('resize',sch);upd();
}

/* ---------- 5. secret mode ---------- */
function secret(){
  document.documentElement.classList.toggle('k');
  burst(innerWidth/2,innerHeight/2,50,8);snd('start');ach('konami');
}
if(CFG.konami){
  var seq=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'],buf=[];
  addEventListener('keydown',function(e){
    buf.push(e.key.length===1?e.key.toLowerCase():e.key);buf=buf.slice(-10);
    if(buf.join()===seq.join()){buf=[];secret()}
  });
  var lg=document.getElementById('logo'),taps=0,tt=0;
  if(lg)lg.addEventListener('click',function(){
    clearTimeout(tt);taps++;tt=setTimeout(function(){taps=0},4000);
    if(taps>=7){taps=0;secret()}
  });
}

/* ---------- 6. Snake on the TV ---------- */
function game(){
  var scr=document.querySelector('.screen'),bar=document.querySelector('.tvbar');
  if(!scr||!bar||(window.SITE&&SITE.live))return;
  var c=document.createElement('canvas');c.id='snk';c.width=96;c.height=54;scr.appendChild(c);
  var b=document.createElement('button');b.type='button';b.className='btn alt gbtn';bar.insertBefore(b,bar.children[1]||null);
  var x=c.getContext('2d'),on=false,over=false,sn,dir,nd,food,score=0,iv=0;
  function label(){b.textContent=!on?T('PLAY SNAKE','العب ثعبان'):over?T('GAME OVER: ','انتهت: ')+score:T('SCORE: ','النقاط: ')+score}
  function rnd(n){return Math.random()*n|0}
  function place(){do{food={x:rnd(24),y:rnd(13)}}while(sn.some(function(s){return s.x===food.x&&s.y===food.y}))}
  function reset(){sn=[{x:6,y:6},{x:5,y:6},{x:4,y:6}];dir=nd={x:1,y:0};score=0;over=false;place();label();draw()}
  function draw(){
    x.fillStyle='#050203';x.fillRect(0,0,96,54);
    x.fillStyle=L;x.fillRect(food.x*4,food.y*4+1,3,3);
    sn.forEach(function(s,i){x.fillStyle=i?R:L;x.fillRect(s.x*4,s.y*4+1,3,3)});
    if(over){x.fillStyle='rgba(104,8,8,.55)';x.fillRect(0,0,96,54)}
    x.fillStyle='rgba(0,0,0,.3)';for(var j=0;j<54;j+=2)x.fillRect(0,j,96,1);
  }
  function tick(){
    if(over)return;dir=nd;
    var h={x:(sn[0].x+dir.x+24)%24,y:(sn[0].y+dir.y+13)%13};
    if(sn.some(function(s){return s.x===h.x&&s.y===h.y})){over=true;snd('err');draw();label();return}
    sn.unshift(h);
    if(h.x===food.x&&h.y===food.y){score++;snd('click');label();if(score>=10)ach('snake');place()}else sn.pop();
    draw();
  }
  function open(){on=true;c.style.display='block';reset();clearInterval(iv);iv=setInterval(tick,110);snd('start')}
  function close(){on=false;c.style.display='none';clearInterval(iv);label()}
  function turn(d){
    if(over)reset();
    if(!(d.x===-dir.x&&d.y===-dir.y))nd=d;
  }
  b.onclick=function(){on?close():open()};
  var KM={ArrowUp:{x:0,y:-1},w:{x:0,y:-1},ArrowDown:{x:0,y:1},s:{x:0,y:1},ArrowLeft:{x:-1,y:0},a:{x:-1,y:0},ArrowRight:{x:1,y:0},d:{x:1,y:0}};
  addEventListener('keydown',function(e){
    if(!on)return;var a=document.activeElement;if(a&&/INPUT|TEXTAREA/.test(a.tagName))return;
    if(e.key==='Escape'){close();return}
    var d=KM[e.key];if(d){e.preventDefault();turn(d)}
  });
  var sx=0,sy=0;
  c.addEventListener('touchstart',function(e){var t=e.touches[0];sx=t.clientX;sy=t.clientY},{passive:true});
  c.addEventListener('touchend',function(e){
    var t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;
    if(Math.max(Math.abs(dx),Math.abs(dy))<12){if(over)reset();return}
    turn(Math.abs(dx)>Math.abs(dy)?{x:dx>0?1:-1,y:0}:{x:0,y:dy>0?1:-1});
  },{passive:true});
  c.addEventListener('click',function(){if(over)reset()});
  label();addEventListener('langchange',label);
}
if(CFG.tvGame)game();

/* ---------- 7. footer ghost ---------- */
function sprite(){
  var f=document.querySelector('footer');if(!f)return;
  var G=['.RRRRRR.','RRRRRRRR','R.RRRR.R','RRRRRRRR','RRRRRRRR','RRRRRRRR'];
  var pal={R:R,L:L};
  var el=document.createElement('div');el.className='spr';
  el.innerHTML='<div class="hop"><div class="si">'+pix(G.concat(['RR.RR.RR','R..RR..R']),pal)+pix(G.concat(['.RR.RR.R','.R..R..R']),pal)+'</div></div>';
  f.appendChild(el);
  var si=el.querySelector('.si'),x=20,dir=1,vis=true;
  el.style.transform='translateX(20px)';
  el.addEventListener('click',function(){
    var r=el.getBoundingClientRect();el.classList.add('jmp');
    setTimeout(function(){el.classList.remove('jmp')},480);
    snd('nav');burst(r.left+20,r.top+20,10,4);
  });
  if(RM)return;
  if('IntersectionObserver' in window)new IntersectionObserver(function(es){vis=es[0].isIntersecting}).observe(f);
  setInterval(function(){
    if(!vis)return;
    var max=f.clientWidth-44;x+=dir*3;
    if(x>max){x=max;dir=-1}if(x<0){x=0;dir=1}
    if(Math.random()<.01)dir=-dir;
    si.classList.toggle('f');
    el.style.transform='translateX('+x+'px)';
    si.style.transform=dir<0?'scaleX(-1)':'';
  },110);
}
if(CFG.footerSprite)sprite();

/* ---------- 8. typewriter hero ---------- */
function typer(){
  var s=document.querySelector('h1 .gl');if(!s||RM)return;
  var full=s.textContent,iv=0;
  s.textContent='\u00a0';
  function finish(){clearInterval(iv);iv=0;s.textContent=full;s.setAttribute('data-t',full)}
  whenBooted(function(){
    var i=0;
    iv=setInterval(function(){
      i++;s.textContent=full.slice(0,i)+(i<full.length?'_':'');snd('hover');
      if(i>=full.length)finish();
    },130);
  });
  addEventListener('langchange',function(){s.textContent=full;s.setAttribute('data-t',full);clearInterval(iv)});
}
if(CFG.typewriter)typer();

/* ---------- 9. mod hearts ---------- */
function hearts(){
  var H=['........','.RR..RR.','RLRRRRRR','RRRRRRRR','RRRRRRRR','.RRRRRR.','..RRRR..','...RR...'];
  var full=pix(H,{R:R,L:L}),empty=pix(H,{R:'#3a1518',L:'#2a0e10'});
  document.querySelectorAll('.mod').forEach(function(m){
    var r=m.querySelector('.role'),t=r?r.textContent:'',n=/HEAD|كبير/.test(t)?5:/VIP|مميز/.test(t)?3:4;
    var d=document.createElement('div');d.className='hearts';
    for(var i=0;i<5;i++)d.innerHTML+=i<n?full:empty;
    m.appendChild(d);
  });
}
if(CFG.modHearts)hearts();

window.SIBFX={burst:burst,ach:ach,toast:toast,reset:function(){set('sib-ach','[]');got=[]}};
})();
