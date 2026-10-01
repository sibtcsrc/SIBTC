/* English <-> Arabic. Add a line to AR to translate any new text: 'English text':'النص العربي' */
(function(){
var AR={
'SIB // Pixel Stream Hub':'SIBTC',
'SIB logo loading':'شعار SIB أثناء التحميل','SIB logo':'شعار SIB',
'Booting SIB.exe':'جاري تشغيل SIB.exe','Loading sprites':'تحميل الرسومات','Dithering pixels':'ترتيب البكسلات','Warming CRT':'تسخين الشاشة','Ready':'جاهز',
'Stream':'البث','Projects':'المشاريع','Clips':'الكليبات','Tweets':'التغريدات','Mods':'المودات','Social':'حساباتي','Services':'الخدمات','Web services':'خدمات المواقع',
'Status: signal detected':'الحالة: تم رصد إشارة',
'Enter the red zone.':'ادخل المنطقة الحمراء.',
'Live games, clean clutch plays and late-night runs. Pick a start button.':'بث مباشر ، وجلسات سهر. اختر زر البداية.',
'Watch live':'شاهد البث','Join party':'انضم للفريق',
'Live on Kick':'مباشر على كيك','Stream offline':'البث متوقف','SIB is live':'SIB في بث مباشر الآن','Watch on Kick':'شاهد على كيك',
'CHANNEL: OFFLINE':'القناة: غير متصلة','CHANNEL: LIVE':'القناة: مباشر',
'Stream schedule':'جدول البث',
'MON':'الإثنين','WED':'الأربعاء','FRI':'الجمعة','SUN':'الأحد',
'Ranked climb, no breaks':'رانك بدون توقف','FPS':'إطلاق نار','Viewer games + chat picks':'ألعاب مع المشاهدين واختيارات الشات','PARTY':'جماعي',
'Late-night speedruns':'سبيد ران آخر الليل','RUN':'سبيد ران','Chill retro session':'جلسة ريترو هادئة','RETRO':'ريترو',
'Next stream':'البث القادم',
'Times are placeholders. Set your own and the schedule updates the same way: one row, one line.':'المواعيد أمثلة فقط. ضع مواعيدك وتتحدث القائمة بنفس الطريقة: سطر لكل يوم.',
'Get alerts':'فعّل التنبيهات',
'Project one':'المشروع الأول','Short line about what it is and why it matters.':'سطر قصير عن المشروع وليش هو مهم.','PROGRESS':'التقدم','LIVE':'مباشر','TOOL':'أداة','Open':'افتح',
'Project two':'المشروع الثاني','A series, overlay pack or community event.':'سلسلة أو حزمة أوفرلاي أو فعالية للمجتمع.','WIP':'قيد العمل','CONTENT':'محتوى',
'Project three':'المشروع الثالث','Something coming soon for the community.':'شيء قادم قريبًا للمجتمع.','SOON':'قريبًا','MOD':'مود',
'Top clips':'أفضل الكليبات',
'1v4 clutch':'كلتش 1 ضد 4','Last life, no armor, one door.':'آخر حياة، بدون درع، وباب واحد.','PLACEHOLDER':'مثال',
'Boss, no hit':'زعيم بدون ضرر','Phase three, zero damage.':'المرحلة الثالثة بدون أي ضرر.',
'Chat takes over':'الشات يتحكم','Viewers vote, SB survives.':'المشاهدون يصوّتون وSB ينجو.',
'Latest tweets':'آخر التغريدات',
'Going live in 10. Bring snacks and bad ideas.':'بنبدأ البث بعد 10 دقائق. جيبوا السناكات والأفكار المجنونة.',
'New clip is up. Chat, you did this.':'نزل كليب جديد. الشات أنتم اللي سويتوه.',
'Friday speedrun stream. Attempt number too many.':'بث سبيد ران الجمعة. محاولة رقم لا أعرف كم.',
'Follow on X':'تابعني على X',
'Kick mod squad':'مشرفو كيك','HEAD MOD':'كبير المشرفين','VIP':'مميز',
'Player stats':'إحصائيات اللاعب','AIM':'التصويب','CLUTCH':'الكلتش','CHAT ENERGY':'طاقة الشات','SLEEP':'النوم',
'Loadout':'العدّة',
'Streaming games with a red-black identity: sharp plays, loud chat, no filler. Replace these stats with real numbers.':'بث ألعاب بهوية حمراء وسوداء: لعب حاد وشات صاخب وبدون حشو. استبدل هذه الأرقام بأرقامك الحقيقية.',
'followers':'متابع','streams':'بث','hours live':'ساعة بث','clips':'كليب',
'Find SIB':'حسابات SIB',
'Join the party':'انضم للفريق','Drop your email to get a ping when SIB goes live.':'اكتب إيميلك ويوصلك تنبيه أول ما يبدأ SIB البث.',
'player@email.com':'اكتب إيميلك هنا','Email':'البريد الإلكتروني','Press start':'ابدأ',
'© SIB // ALL PIXELS RESERVED':'© SIB // جميع البكسلات محفوظة','© SIBTC':'© SIBTC // جميع البكسلات محفوظة','SERVER ONLINE':'السيرفر شغال',
'> Player 2 joined. Check your inbox.':'> انضم اللاعب الثاني. تحقق من بريدك.',
'> Error: enter a valid email.':'> خطأ: اكتب إيميلًا صحيحًا.','> Error: could not send. Try again.':'> خطأ: تعذر الإرسال. حاول مرة ثانية.','> Signups open soon.':'> التسجيل يفتح قريبًا.'
};
if(window.I18N_EXTRA)for(var q in I18N_EXTRA)AR[q]=I18N_EXTRA[q];
var lang='en',items=[],attrs=[];
var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentNode.nodeName;return p==='SCRIPT'||p==='STYLE'?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});
while(w.nextNode()){var n=w.currentNode,k=n.nodeValue.trim();if(AR[k]){var i=n.nodeValue.indexOf(k);items.push({n:n,k:k,pre:n.nodeValue.slice(0,i),post:n.nodeValue.slice(i+k.length)})}}
document.querySelectorAll('[placeholder],[aria-label],[alt]').forEach(function(e){['placeholder','aria-label','alt'].forEach(function(a){var v=e.getAttribute(a);if(v&&AR[v])attrs.push({e:e,a:a,v:v})})});
var title=document.title;
function apply(){
  var ar=lang==='ar';
  items.forEach(function(o){o.n.nodeValue=o.pre+(ar?AR[o.k]:o.k)+o.post});
  attrs.forEach(function(o){o.e.setAttribute(o.a,ar?AR[o.v]:o.v)});
  document.title=ar&&AR[title]?AR[title]:title;
  document.documentElement.lang=lang;document.documentElement.dir=ar?'rtl':'ltr';
  document.querySelectorAll('.gl').forEach(function(g){g.setAttribute('data-t',g.textContent)});
  var b=document.getElementById('lang');if(b){b.textContent=ar?'EN':'عربي';b.setAttribute('aria-label',ar?'English':'العربية')}
  window.dispatchEvent(new Event('langchange'));
}
window.I18N={t:function(s){return lang==='ar'&&AR[s]?AR[s]:s},get lang(){return lang},set:function(l){lang=l;try{localStorage.setItem('sib-lang',l)}catch(e){}apply()}};
var saved=null;try{saved=localStorage.getItem('sib-lang')}catch(e){}
lang=saved||((navigator.language||'').slice(0,2)==='ar'?'ar':'en');
var lb=document.getElementById('lang');if(lb)lb.onclick=function(){I18N.set(lang==='ar'?'en':'ar')};
apply();
})();
