/* =========================================================
   EDIT YOUR SITE HERE: projects, socials, live status, form
   ========================================================= */
window.SITE={
  live:false,                 /* true = show "SIB is live" on the TV */
  formEndpoint:'',            /* e.g. 'https://formspree.io/f/xxxxxx' to receive emails */

  /* Socials: each has its own name, handle and link. Add/remove lines freely.
     k = pixel icon (kick, x, youtube, discord, instagram, tiktok). Any other k gets a star. */
  socials:[
    {k:'kick',     name:'KICK',      handle:'@SIBTC',     url:'https://kick.com/SIBTC'},
    {k:'x',        name:'X',         handle:'@JustSIBTC', url:'https://x.com/JustSIBTC'},
    {k:'youtube',  name:'YOUTUBE',   handle:'@SIBTC',     url:'https://youtube.com/@SIBTC'},
    {k:'discord',  name:'DISCORD',   handle:'SIBTC',      url:'https://discord.gg/Pkgk9Xkb'},
    {k:'instagram',name:'INSTAGRAM', handle:'@JustSIBTC',  url:'https://instagram.com/JustSIBTC'},
    {k:'tiktok',   name:'TIKTOK',    handle:'@JustSIBTC',    url:'https://tiktok.com/@JustSIBTC'}
  ],

  /* Web services pages: each card opens its own page (file or link) */
  pages:[
    {icon:'gem',  title:'Saudi web pricing',desc:'What websites cost in Saudi Arabia',url:'web/saudi-web-pricing.html',     ar:{title:'أسعار المواقع في السعودية',desc:'كم تكلف المواقع في السعودية'}},
    {icon:'crown',title:'SIB web proposal', desc:'Design and development offer',      url:'web/sib-proposal-websites.html', ar:{title:'عرض SIB للمواقع',desc:'عرض تصميم وبرمجة المواقع'}}
  ],

  /* Projects 1 to 9. icon: heart, star, play, bolt, skull, gem, ghost, crown, sword
     url = the website that opens when the card is clicked (empty = not clickable yet) */
  projects:[
    {icon:'heart', title:'Project 1',desc:'BOTANGY website',pct:50, tags:['LIVE','TOOL'],   url:'web/B.html', ar:{title:'المشروع 1',desc:'موقع BOTANGY'}},
    {icon:'star',  title:'Project 2',desc:'ADHM_8 website', pct:100, tags:['LIVE','TOOL'],   url:'adhmsa.netlify.app', ar:{title:'المشروع 2',desc:'موقع ADHM_8'}},
    {icon:'bolt',  title:'Project 3',desc:'Azeez website',  pct:100,tags:['LIVE','TOOL'],   url:'https://1azeez.netlify.app/', ar:{title:'المشروع 3',desc:'موقع Azeez'}},
    {icon:'skull', title:'Project 4',desc:'GHED website',   pct:25, tags:['WIP','CONTENT'], url:'web/gh.html', ar:{title:'المشروع 4',desc:'موقع GHED'}},
    {icon:'gem',   title:'Project 5',desc:'itsOG website',  pct:0,  tags:['WIP','CONTENT'], url:'web/OG.html', ar:{title:'المشروع 5',desc:'موقع itsOG'}},
    {icon:'ghost', title:'Project 6',desc:'Roy website',  pct:0,  tags:['WIP','CONTENT'], url:'web/Roy.html', ar:{title:'المشروع 6',desc:'موقع Roy'}},
    {icon:'crown', title:'Project 7',desc:'SOON',           pct:0,  tags:['SOON','SOON'],   url:'', ar:{title:'المشروع 7'}},
    {icon:'sword', title:'Project 8',desc:'SOON',           pct:0,  tags:['SOON','SOON'],   url:'', ar:{title:'المشروع 8'}},
    {icon:'play',  title:'Project 9',desc:'SOON',           pct:0,  tags:['SOON','SOON'],   url:'', ar:{title:'المشروع 9'}}
  ]
};
(function(){
  var S=window.SITE,X=window.I18N_EXTRA={};
  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
  var P=document.getElementById('projs');
  S.projects.forEach(function(p){
    if(p.ar){if(p.ar.title)X[p.title]=p.ar.title;if(p.ar.desc)X[p.desc]=p.ar.desc}
    var has=!!p.url,el=document.createElement(has?'a':'div');
    el.className='box card proj rv';
    if(has){el.href=p.url;el.target='_blank';el.rel='noopener'}
    el.innerHTML='<svg class="ic" data-i="'+esc(p.icon)+'"></svg><h3>'+esc(p.title)+'</h3><p>'+esc(p.desc)+'</p>'+
      '<div class="bar"><i data-w="'+(+p.pct||0)+'"></i></div><div class="lb"><span>PROGRESS</span><span>'+(+p.pct||0)+'%</span></div>'+
      '<div class="tags">'+p.tags.map(function(t){return '<span class="chip">'+esc(t)+'</span>'}).join('')+'</div>'+
      '<span class="btn alt">'+(has?'Open':'SOON')+'</span>';
    P.appendChild(el);
  });
  var G=document.getElementById('pgs');
  S.pages.forEach(function(p){
    if(p.ar){X[p.title]=p.ar.title;X[p.desc]=p.ar.desc}
    var a=document.createElement('a');a.className='box card proj rv';a.href=p.url;a.target='_blank';a.rel='noopener';
    a.innerHTML='<svg class="ic" data-i="'+esc(p.icon)+'"></svg><h3>'+esc(p.title)+'</h3><p>'+esc(p.desc)+'</p><span class="btn alt" style="margin-top:20px">Open</span>';
    G.appendChild(a);
  });
  var W=document.getElementById('socs');
  S.socials.forEach(function(s){
    var a=document.createElement('a');a.className='box soc rv';a.href=s.url;a.target='_blank';a.rel='noopener';
    a.innerHTML='<svg data-si="'+esc(s.k)+'"></svg><div><b>'+esc(s.name)+'</b><span>'+esc(s.handle)+'</span></div>';
    W.appendChild(a);
  });
})();
