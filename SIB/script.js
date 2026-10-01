(function(){
var R='#f01818',D='#680808',M='#c40e0e',L='#ff5252';
function svgFrom(el,map,pal,pad){
  var rows=map.length,cols=map[0].length,h='';
  for(var y=0;y<rows;y++)for(var x=0;x<cols;x++){var c=map[y][x];if(pal[c])h+='<rect x="'+x+'" y="'+y+'" width="1" height="1" fill="'+pal[c]+'"/>';}
  el.setAttribute('viewBox','0 0 '+cols+' '+rows);el.innerHTML=h;
}
/* icons */
var ICONS={
play:["........","..RR....","..RRRR..","..RRRRRR","..RRRRRR","..RRRR..","..RR....","........"],
heart:["........",".RR..RR.","RLRRRRRR","RRRRRRRR","RRRRRRRR",".RRRRRR.","..RRRR..","...RR..."],
star:["...RR...","...RR...","RRRRRRRR",".RRLLRR.","..RLLR..","..RRRR..",".RR..RR.","R......R"],
bolt:["....RRR.","...RRR..","..RRR...",".RRRRRR.","...RRR..","..RR....",".RR.....","R......."],
skull:[".RRRRRR.","RRRRRRRR","R..RR..R","R..RR..R","RRRRRRRR",".RRRRRR.",".R.RR.R.",".RRRRRR."],
gem:["..RRRR..",".RLLRRR.","RRRRRRRR","RRRRRRRR",".RRRRRR.","..RRRR..","...RR...","........"],
ghost:[".RRRRRR.","RRRRRRRR","R.RRRR.R","RRRRRRRR","RRRRRRRR","RRRRRRRR","RR.RR.RR","R..RR..R"],
crown:["R..R..R.","RR.RR.RR","RRRRRRRR","RRLRRLRR","RRRRRRRR","RRRRRRRR","........","........"],
sword:["......RR",".....RRR","....RRR.","R..RRR..","RRRRR...",".RRR....","RRRR....","RR.R...."]};
document.querySelectorAll('svg[data-i]').forEach(function(s){svgFrom(s,ICONS[s.dataset.i],{R:R,L:L})});
/* clip thumbnails: seeded pixel scenes */
document.querySelectorAll('canvas[data-s]').forEach(function(c){
  var x=c.getContext('2d'),s=+c.dataset.s*9973;
  function rnd(){s=(s*16807)%2147483647;return s/2147483647}
  x.fillStyle='#0a0304';x.fillRect(0,0,64,36);
  for(var i=0;i<60;i++){x.fillStyle=rnd()>.5?D:'#2a0a0d';x.fillRect(rnd()*64|0,rnd()*20|0,1,1)}
  x.fillStyle=R;var cx=14+rnd()*36|0;for(var yy=-6;yy<=6;yy++)for(var xx=-6;xx<=6;xx++)if(xx*xx+yy*yy<30)x.fillRect(cx+xx,12+yy,1,1);
  x.fillStyle='#000';var h=0;for(var i=0;i<64;i+=4){h=Math.max(8,Math.min(22,h?h+(rnd()*8-4|0):16));x.fillRect(i,36-h,4,h)}
  x.fillStyle=D;for(var i=0;i<64;i+=4){x.fillRect(i,34-(rnd()*3|0),4,1)}
  x.fillStyle=L;x.fillRect(27,15,2,6);x.fillRect(29,17,2,2);
  for(var i=0;i<4;i++){x.fillStyle=R;x.fillRect(rnd()*64|0,rnd()*36|0,6,1)}
  for(var y=0;y<36;y+=2){x.fillStyle='rgba(0,0,0,.25)';x.fillRect(0,y,64,1)}
});
/* background: pixel noise + red specks, stepped */
var bg=document.getElementById('bg'),bx=bg.getContext('2d'),S=6,W,H,pts=[];
function size(){W=Math.ceil(innerWidth/S);H=Math.ceil(innerHeight/S);bg.width=W;bg.height=H;pts=[];for(var i=0;i<40;i++)pts.push({x:Math.random()*W|0,y:Math.random()*H|0,t:Math.random()*20|0,c:Math.random()>.5})}
size();addEventListener('resize',size);
function frame(){
  bx.fillStyle='#050203';bx.fillRect(0,0,W,H);
  for(var i=0;i<W*H/90;i++){bx.fillStyle=Math.random()>.7?'#1b0709':'#0f0405';bx.fillRect(Math.random()*W|0,Math.random()*H|0,1,1)}
  pts.forEach(function(p){p.t++;if(p.t>24){p.t=0;p.x=Math.random()*W|0;p.y=Math.random()*H|0;p.c=Math.random()>.4}
    if(p.t<14){bx.fillStyle=p.c?R:D;bx.fillRect(p.x,p.y,1,1)}});
  if(Math.random()<.12){bx.fillStyle='rgba(240,24,24,.15)';bx.fillRect(Math.random()*W|0,Math.random()*H|0,10+Math.random()*30|0,1)}
}
frame();
if(!matchMedia('(prefers-reduced-motion:reduce)').matches)setInterval(frame,140);

var CFG=window.SITE,LIVE=CFG.live;
var SI={
kick:["RR..RRRR","RR.RRRR.","RRRRRR..","RRRRR...","RRRRRR..","RR.RRRR.","RR..RRRR","........"],
x:["RR....RR","RRR..RRR",".RRRRRR.","..RRRR..","..RRRR..",".RRRRRR.","RRR..RRR","RR....RR"],
youtube:["........",".RRRRRR.","RRRR.RRR","RRRR..RR","RRRR.RRR",".RRRRRR.","........","........"],
discord:[".RRRRRR.","RRRRRRRR","R..RR..R","R..RR..R","RRRRRRRR","RRRRRRRR","RR.RR.RR","R......R"],
instagram:["RRRRRRRR","R......R","R.RRRR.R","R.R..R.R","R.R..R.R","R.RRRR.R","R......R","RRRRRRRR"],
tiktok:["....RR..","....RRR.","....R.RR","..RRR.RR",".RR.R...",".RR.R...","..RRR...","........"]};
document.querySelectorAll('svg[data-si]').forEach(function(s){svgFrom(s,SI[s.dataset.si]||ICONS.star,{R:R,L:L})});
function soc(k){return CFG.socials.filter(function(s){return s.k===k})[0]}
document.querySelectorAll('[data-soc]').forEach(function(a){var s=soc(a.dataset.soc);if(s)a.href=s.url});
var ks=soc('kick');if(ks)document.getElementById('kick1').href=ks.url;
/* live state */
function paintTV(){var T=I18N.t;document.getElementById('tvt').textContent=T(LIVE?'SIB is live':'Stream offline');document.getElementById('tvs').textContent=T(LIVE?'CHANNEL: LIVE':'CHANNEL: OFFLINE');document.getElementById('tvd').className=LIVE?'dot live':'dot'}
paintTV();addEventListener('langchange',paintTV);
/* TV static */
var tc=document.getElementById('tvc'),tx=tc.getContext('2d');
function tv(){tx.fillStyle='#050203';tx.fillRect(0,0,96,54);
  for(var i=0;i<500;i++){tx.fillStyle=Math.random()>.85?R:(Math.random()>.5?D:'#1a0608');tx.fillRect(Math.random()*96|0,Math.random()*54|0,1,1)}
  var y=Math.random()*54|0;tx.fillStyle='rgba(240,24,24,.35)';tx.fillRect(0,y,96,1+(Math.random()*2|0));
  tx.fillStyle='rgba(0,0,0,.35)';for(var j=0;j<54;j+=2)tx.fillRect(0,j,96,1)}
tv();if(!matchMedia('(prefers-reduced-motion:reduce)').matches)setInterval(tv,120);
/* pixel avatars: symmetric seeded sprites */
document.querySelectorAll('canvas[data-a]').forEach(function(c){
  var x=c.getContext('2d'),s=+c.dataset.a*7919+13;function rnd(){s=(s*16807)%2147483647;return s/2147483647}
  x.fillStyle='#000';x.fillRect(0,0,8,8);
  var cols=[R,M,L,D];
  for(var yy=0;yy<8;yy++)for(var xx=0;xx<4;xx++)if(rnd()>.42){x.fillStyle=cols[rnd()*4|0];x.fillRect(xx,yy,1,1);x.fillRect(7-xx,yy,1,1)}
  x.fillStyle='#000';x.fillRect(2,3,1,1);x.fillRect(5,3,1,1);x.fillStyle=L;x.fillRect(2,3,1,1);x.fillRect(5,3,1,1);
});
/* boot loader */
var bi=document.getElementById('bi'),bt=document.getElementById('bt'),n=0,msgs=['Loading sprites','Dithering pixels','Warming CRT','Ready'];
var t=setInterval(function(){n+=8;bi.style.width=Math.min(n,100)+'%';bt.textContent=I18N.t(msgs[Math.min(3,n/26|0)]);
  if(n>=100){clearInterval(t);setTimeout(function(){document.getElementById('boot').style.display='none';go()},250)}},90);
/* reveal + bars */
function go(){
  function show(e){e.classList.add('in');e.querySelectorAll('.bar i').forEach(function(b){b.style.width=b.dataset.w+'%'})}
  var q=0;
  function check(){q=0;document.querySelectorAll('.rv:not(.in)').forEach(function(e){
    var r=e.getBoundingClientRect();if(r.top<innerHeight*0.92&&r.bottom>0)show(e)})}
  function sched(){if(!q)q=requestAnimationFrame(check)}
  addEventListener('scroll',sched,{passive:true});addEventListener('resize',sched);addEventListener('load',sched);
  check();setTimeout(check,500);setTimeout(check,1500);
  setTimeout(function(){document.querySelectorAll('.rv:not(.in)').forEach(function(e){if(e.getBoundingClientRect().top<innerHeight*2)show(e)})},6000);
}
/* form */
var lastMsg='';addEventListener('langchange',function(){var m=document.getElementById('msg');if(m&&lastMsg)m.textContent=I18N.t(lastMsg)});
document.getElementById('go').onclick=function(){
  var v=document.getElementById('em').value,m=document.getElementById('msg');
  function say(k){lastMsg=k;m.textContent=I18N.t(k)}
  if(!/^\S+@\S+\.\S+$/.test(v)){say('> Error: enter a valid email.');return}
  if(!CFG.formEndpoint){say('> Signups open soon.');return}
  fetch(CFG.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({email:v})})
    .then(function(r){say(r.ok?'> Player 2 joined. Check your inbox.':'> Error: could not send. Try again.')})
    .catch(function(){say('> Error: could not send. Try again.')});
};
})();
