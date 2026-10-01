/* SIB 8-bit sound: all sounds are synthesized (no audio files).
   Add before </body>, after script.js:  <script src="sound.js"></script>
   Edit the settings below to change volume, music speed or turn things off. */
(function(){
var CFG={sfxVol:.5, musVol:.10, step:.15, defaultSfx:true, defaultMusic:false};

var AC=null,master,musG,sfxOn=CFG.defaultSfx,musOn=CFG.defaultMusic,timer=null,nextT=0,idx=0;
try{var a=localStorage.getItem('sib-sfx'),b=localStorage.getItem('sib-mus');if(a!==null)sfxOn=a==='1';if(b!==null)musOn=b==='1'}catch(e){}

function ctx(){
  if(!AC){var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;
    AC=new C();master=AC.createGain();master.gain.value=CFG.sfxVol;master.connect(AC.destination);
    musG=AC.createGain();musG.gain.value=CFG.musVol;musG.connect(AC.destination)}
  if(AC.state==='suspended')AC.resume();
  return AC;
}
function tone(f,t,d,type,v,dest,to){
  var o=AC.createOscillator(),g=AC.createGain();
  o.type=type||'square';o.frequency.setValueAtTime(f,t);
  if(to)o.frequency.exponentialRampToValueAtTime(to,t+d);
  g.gain.setValueAtTime(v,t);g.gain.setValueAtTime(v,t+d*.6);g.gain.linearRampToValueAtTime(0,t+d);
  o.connect(g);g.connect(dest||master);o.start(t);o.stop(t+d+.03);
}
function seq(notes,st,type,v){
  if(!sfxOn||!ctx())return;var t=AC.currentTime;
  notes.forEach(function(f,i){if(f)tone(f,t+i*st,st*.95,type,v||.12)});
}
var SFX={
  hover:function(){if(sfxOn&&ctx())tone(1200,AC.currentTime,.03,'square',.04)},
  click:function(){seq([660,990],.045,'square',.1)},
  nav:function(){seq([440,587,784],.04,'square',.1)},
  ok:function(){seq([523,659,784,1047],.07,'square',.12)},
  err:function(){seq([220,165,110],.09,'sawtooth',.12)},
  start:function(){seq([262,330,392,523,392,523,659,784],.07,'square',.12)},
  off:function(){seq([392,262],.06,'square',.1)}
};
window.SIBSound=SFX;

/* ---- background music: slow Am-F-C-G chiptune loop ---- */
var BARS=[[110,[220,261.6,329.6]],[87.3,[174.6,220,261.6]],[130.8,[261.6,329.6,392]],[98,[196,246.9,293.7]]];
var ARP=[0,1,2,1,0,1,2,1];
function sched(){
  while(nextT<AC.currentTime+.25){
    var bar=BARS[(idx/8|0)%4],s=idx%8,st=CFG.step;
    if(s===0||s===4)tone(bar[0],nextT,st*3.6,'triangle',.9,musG);
    tone(bar[1][ARP[s]]*2,nextT,st*.8,'square',.35,musG);
    if(s===0&&(idx/8|0)%4===3)tone(bar[1][2]*4,nextT,st*.6,'square',.15,musG);
    nextT+=st;idx++;
  }
}
function musicStart(){if(timer||!ctx())return;nextT=AC.currentTime+.05;idx=0;timer=setInterval(sched,60)}
function musicStop(){clearInterval(timer);timer=null}

/* ---- UI: two small buttons in the nav ---- */
var css=document.createElement('style');
css.textContent='.sbox{display:flex;gap:8px;align-items:center;flex:none}.sbtn{padding:12px 10px!important;font-size:9px!important}.sbtn.off{opacity:.45;text-decoration:line-through}@media(max-width:820px){.sbtn{padding:10px 6px!important;font-size:7px!important}.sbox{gap:4px}}';
document.head.appendChild(css);
var lb=document.getElementById('lang'),box=document.createElement('div');box.className='sbox';
function mk(id){var x=document.createElement('button');x.type='button';x.id=id;x.className='btn alt lbtn sbtn';box.appendChild(x);return x}
var bs=mk('sfx'),bm=mk('mus');
if(lb&&lb.parentNode){lb.parentNode.insertBefore(box,lb);box.appendChild(lb)}
else{var n=document.querySelector('nav .wrap');if(n)n.appendChild(box)}
function label(){
  var ar=document.documentElement.lang==='ar';
  bs.textContent=ar?'صوت':'SFX';bm.textContent=ar?'موسيقى':'MUSIC';
  bs.classList.toggle('off',!sfxOn);bm.classList.toggle('off',!musOn);
  bs.setAttribute('aria-pressed',sfxOn);bm.setAttribute('aria-pressed',musOn);
  bs.setAttribute('aria-label',ar?'المؤثرات الصوتية':'Sound effects');
  bm.setAttribute('aria-label',ar?'الموسيقى':'Music');
}
function save(){try{localStorage.setItem('sib-sfx',sfxOn?'1':'0');localStorage.setItem('sib-mus',musOn?'1':'0')}catch(e){}}
bs.onclick=function(e){e.stopPropagation();sfxOn=!sfxOn;save();label();if(sfxOn){ctx();SFX.start()}else{sfxOn=true;SFX.off();sfxOn=false}};
bm.onclick=function(e){e.stopPropagation();musOn=!musOn;save();label();if(musOn){ctx();musicStart()}else musicStop()};
label();addEventListener('langchange',label);

/* browsers block audio until the first tap: unlock then, and start saved music */
function unlock(){
  removeEventListener('pointerdown',unlock);removeEventListener('keydown',unlock);
  if(sfxOn||musOn)ctx();
  if(musOn)musicStart();
}
addEventListener('pointerdown',unlock);addEventListener('keydown',unlock);
document.addEventListener('visibilitychange',function(){
  if(!AC)return;if(document.hidden)AC.suspend();else if(sfxOn||musOn)AC.resume()});

/* ---- hook into the page ---- */
var HOV='.btn,nav a.l,.card,.soc,.mod,.clip,.tw,.brand,.row',lastEl=null;
document.addEventListener('mouseover',function(e){
  var el=e.target.closest&&e.target.closest(HOV);
  if(el&&el!==lastEl&&!el.classList.contains('sbtn'))SFX.hover();
  lastEl=el;
});
document.addEventListener('click',function(e){
  var t=e.target.closest&&e.target.closest('a,button');if(!t||t.classList.contains('sbtn'))return;
  if(t.matches('nav a.l,.brand'))SFX.nav();else SFX.click();
});
/* scroll ticks: one soft pixel tick every ~140px, higher going down, lower going up */
var lastY=scrollY,acc=0,lastT=0,STEP=140;
addEventListener('scroll',function(){
  if(!sfxOn||!AC)return;
  var y=scrollY,d=y-lastY;lastY=y;acc+=d;
  if(Math.abs(acc)<STEP)return;
  var now=performance.now();if(now-lastT<70){acc=0;return}
  var down=acc>0;acc=0;lastT=now;
  var t=AC.currentTime;
  tone(down?520:390,t,.035,'square',.05,null,down?700:300);
},{passive:true});
/* form result sounds */
var msg=document.getElementById('msg');
if(msg)new MutationObserver(function(){
  var s=msg.textContent;if(!s)return;
  if(/Error|خطأ/.test(s))SFX.err();else if(/Player 2|انضم/.test(s))SFX.ok();
}).observe(msg,{childList:true,characterData:true,subtree:true});
/* boot screen blip once it is gone */
var boot=document.getElementById('boot');
if(boot)new MutationObserver(function(){if(boot.style.display==='none')SFX.start()}).observe(boot,{attributes:true,attributeFilter:['style']});
})();
