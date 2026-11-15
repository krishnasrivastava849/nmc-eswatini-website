(function(){
var th=document.getElementById('theme');
try{var sv=localStorage.getItem('nmc-theme');if(sv)document.documentElement.dataset.theme=sv}catch(e){}
if(th)th.addEventListener('click',function(){var d=document.documentElement,cur=d.dataset.theme||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'),nx=cur==='dark'?'light':'dark';d.dataset.theme=nx;try{localStorage.setItem('nmc-theme',nx)}catch(e){}});

var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var b=$('.burger'),n=$('nav.main');
if(b)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.1});$$('.reveal').forEach(function(el){io.observe(el)})}else $$('.reveal').forEach(function(el){el.classList.add('in')});

/* Eligibility checker */
var f=$('#elig');
if(f){f.addEventListener('submit',function(e){e.preventDefault();
 var v=function(k){return f.elements[k].value},issues=[],notes=[];
 if(v('app')!=='yes')issues.push('You must submit an application to be part of the programme.');
 var ha=parseFloat(v('land'));if(!(ha>0))issues.push('Enter the land size you have access to.');else if(ha>1)issues.push('The subsidy covers up to 1 hectare of land only (you entered '+ha+' ha).');
 var inc=parseFloat(v('income'));if(isNaN(inc))issues.push('Enter your monthly income.');else if(inc>12000)issues.push('Farmers earning more than E12,000 per month are not eligible.');
 if(v('other')==='yes')issues.push('Farmers already benefiting from another government farming programme are not eligible.');
 if(v('family')==='yes')issues.push('Only one beneficiary per nuclear family is allowed.');
 if(parseInt(v('years'),10)>=3)issues.push('A farmer can remain in the programme for 3 years, after which they graduate to other developmental funds.');
 if(v('soil')!=='yes')notes.push('Soil test results form part of the application - arrange a soil test with your extension officer.');
 var r=$('#elig-result');r.className='result show '+(issues.length?'no':'ok');
 r.innerHTML=issues.length?'<b>You may not qualify yet:</b><ul>'+issues.map(function(i){return '<li>'+i+'</li>'}).join('')+'</ul>Contact NMC on (+268) 2518 7432 to confirm.':'<b>You appear to meet the eligibility criteria.</b> Next: collect an application form from your RDA, Tinkhundla centre, NMC depot or extension officer.'+(notes.length?'<ul><li>'+notes.join('</li><li>')+'</li></ul>':'')+'<br><small>Indicative only - final approval is by the Vetting Committee and NMC.</small>';
})}

/* Input package calculator */
var pk={maize:{n:'Maize',r:[['Fertilizer (37)','6 x 50kg'],['LAN','4 x 50kg'],['Seeds','25kg'],['Herbicides','Any choice'],['Pesticides','Any choice']]},beans:{n:'Beans',r:[['Fertilizer (37)','3 x 50kg'],['LAN','2 x 50kg'],['Seeds','70kg'],['Herbicides','Any choice'],['Pesticides','Any choice']]},sorghum:{n:'Sorghum',r:[['Fertilizer (37)','2 x 50kg'],['LAN','2 x 50kg'],['Seeds','10kg'],['Herbicides','Any choice'],['Pesticides','Any choice']]}};
var pt=$('#pkg-tabs'),pb=$('#pkg-body');
if(pt){var show=function(k){$$('button',pt).forEach(function(x){x.setAttribute('aria-pressed',x.dataset.k===k)});pb.innerHTML=pk[k].r.map(function(x){return '<tr><td>'+x[0]+'</td><td><b>'+x[1]+'</b></td></tr>'}).join('');$('#pkg-title').textContent=pk[k].n+' package (per 1 hectare)'};
 $$('button',pt).forEach(function(x){x.addEventListener('click',function(){show(x.dataset.k)})});show('maize')}

/* Payment reference builder */
var pr=$('#ref');
if(pr){var upd=function(){var id=$('#refid').value.replace(/\s/g,'')||'<ID number>';$('#refout').textContent=id+' - '+$('#refcrop').value};pr.addEventListener('input',upd);upd();
 $('#copyref').addEventListener('click',function(){var t=$('#refout').textContent;if(navigator.clipboard)navigator.clipboard.writeText(t);this.textContent='Copied'})}

/* Officer directory */
var q=$('#fdo-q'),reg=$('#fdo-reg');
if(q){var rows=$$('#fdo tbody tr'),c=$('#fdo-count');var flt=function(){var s=q.value.toLowerCase(),r=reg.value,k=0;rows.forEach(function(tr){var ok=(!r||tr.dataset.r===r)&&tr.textContent.toLowerCase().indexOf(s)>-1;tr.style.display=ok?'':'none';if(ok)k++});c.textContent=k+' officer'+(k===1?'':'s')+' shown'};q.addEventListener('input',flt);reg.addEventListener('change',flt);flt()}

/* Contact form -> mailto */
var cf=$('#contact');
if(cf)cf.addEventListener('submit',function(e){e.preventDefault();var g=function(k){return cf.elements[k].value};
 location.href='mailto:info@nmc.co.sz?subject='+encodeURIComponent(g('topic')+' - '+g('name'))+'&body='+encodeURIComponent(g('msg')+'\n\nFrom: '+g('name')+'\nPhone: '+g('phone')+'\nEmail: '+g('email'))});
})();
