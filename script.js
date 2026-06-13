
<script>
  // sticky nav style
  const hdr=document.getElementById('hdr');
  addEventListener('scroll',()=>hdr.classList.toggle('scrolled',scrollY>40));
  // mobile menu
  const mb=document.getElementById('menuBtn'),nl=document.getElementById('navlinks');
  mb.addEventListener('click',()=>nl.classList.toggle('open'));
  nl.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nl.classList.remove('open')));
  // reveal on scroll
  const io=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  // client logos: try several sources, then fall back to styled text
  // client logos load from local /logos files; if one is missing the name still shows
  // year
  document.getElementById('yr').textContent=new Date().getFullYear();
  // form
  const cf=document.getElementById('contactForm');
  if(cf)cf.addEventListener('submit',async function(e){
    e.preventDefault();
    const btn=cf.querySelector('button[type=submit]');const msg=document.getElementById('okMsg');const orig=btn.textContent;
    const key=cf.querySelector('[name=access_key]').value;
    msg.classList.remove('err');
    if(!key||key.indexOf('YOUR_WEB3FORMS')===0){msg.textContent='Form not yet activated — add your Web3Forms key. Meanwhile, email powerlinksol@gmail.com.';msg.classList.add('err');msg.style.display='block';return;}
    btn.textContent='Sending…';btn.disabled=true;msg.style.display='none';
    try{
      const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Accept':'application/json'},body:new FormData(cf)});
      const d=await r.json();
      if(d.success){msg.textContent="Thank you — your enquiry has been sent. We'll be in touch shortly.";msg.style.display='block';cf.reset();btn.textContent='Sent ✓';}
      else{msg.textContent="Sorry, we couldn't send that just now. Please email us at powerlinksol@gmail.com.";msg.classList.add('err');msg.style.display='block';btn.textContent=orig;btn.disabled=false;}
    }catch(err){msg.textContent="Sorry, we couldn't send that just now. Please email us at powerlinksol@gmail.com.";msg.classList.add('err');msg.style.display='block';btn.textContent=orig;btn.disabled=false;}
  });
</script>
