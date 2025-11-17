
// Shared JS for multi-page site (Black & Gold)
document.addEventListener('DOMContentLoaded', ()=>{
  // set active nav links
  document.querySelectorAll('a.navlink').forEach(a=>{
    try{
      const href = a.getAttribute('href');
      if(href && (location.pathname.endsWith(href) || (href==='index.html' && (location.pathname.endsWith('/') || location.pathname.endsWith('index.html'))))){
        a.classList.add('active');
      }
    }catch(e){}
  });

  // HEARTS page
  const heartsGrid = document.getElementById('heartsGrid');
  if(heartsGrid){
    let messages = [];
    const dataEl = document.getElementById('messagesData');
    try{ messages = JSON.parse(dataEl.textContent); }catch(e){ messages = []; }
    function buildHearts(){
      heartsGrid.innerHTML='';
      for(let i=0;i<messages.length;i++){
        const btn = document.createElement('button');
        btn.className='heart';
        btn.type='button';
        btn.setAttribute('data-i', i);
        btn.innerHTML = `<div class="inner"><div class="shape">❤</div><div class="msg">${messages[i]}</div></div>`;
        // attach click - use event listener
        btn.addEventListener('click', function toggleReveal(e){
          if(!btn.classList.contains('revealed')) btn.classList.add('revealed');
          else btn.classList.remove('revealed');
        });
        heartsGrid.appendChild(btn);
      }
    }
    buildHearts();

    const revealRandom = document.getElementById('revealRandom');
    if(revealRandom) revealRandom.addEventListener('click', ()=>{
      const unrevealed = Array.from(document.querySelectorAll('.heart')).filter(h=>!h.classList.contains('revealed'));
      if(!unrevealed.length) return alert('All opened!');
      const pick = unrevealed[Math.floor(Math.random()*unrevealed.length)];
      pick.classList.add('revealed');
      pick.scrollIntoView({behavior:'smooth',block:'center'});
    });

    const resetHearts = document.getElementById('resetHearts');
    if(resetHearts) resetHearts.addEventListener('click', ()=>{
      document.querySelectorAll('.heart').forEach(h=>h.classList.remove('revealed'));
    });
  }

  // polaroid click: show note non-intrusively
  document.querySelectorAll('.polaroid').forEach(p=>{
    p.addEventListener('click', ()=>{
      const note = p.getAttribute('data-note') || 'Memory';
      const t = document.createElement('div');
      t.style.position='fixed'; t.style.left='50%'; t.style.top='18%'; t.style.transform='translateX(-50%)';
      t.style.background='#0b0b0b'; t.style.color='#f5e9c6'; t.style.padding='10px 14px'; t.style.borderRadius='8px'; t.style.zIndex='9999';
      t.textContent = note;
      document.body.appendChild(t);
      setTimeout(()=>t.remove(),1800);
    });
  });

  // openwhen letters
  document.querySelectorAll('.open-btn').forEach(b=>{
    b.addEventListener('click', ()=>{
      const key = b.getAttribute('data-key');
      const dataEl = document.getElementById('openWhenData');
      if(!dataEl) return;
      let obj = {};
      try{ obj = JSON.parse(dataEl.textContent); }catch(e){ obj = {}; }
      const out = document.getElementById('openDisplay');
      if(out) out.textContent = obj[key] || '';
    });
  });

  // quiz submit simple scoring
  const quizForm = document.getElementById('quizForm');
  if(quizForm) quizForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const f = new FormData(quizForm);
    const answers = [f.get('q1')||'', f.get('q2')||'', f.get('q3')||'', f.get('q4')||'', f.get('q5')||''].map(s=>s.toLowerCase());
    let score = 0;
    if(answers[1].includes('mcdonald')||answers[1].includes('parking')||answers[1].includes('drive')) score++;
    if(answers[3].includes('westgate')||answers[3].includes('gum')||answers[3].includes('ice')) score++;
    const res = score>=1 ? 'Nice — you remember our moments.' : 'Cute attempt — I still love you.';
    const resEl = document.getElementById('quizResult');
    if(resEl) resEl.textContent = res;
  });

  // shake fallback: click to reveal
  const shakeBox = document.getElementById('shakeBox');
  if(shakeBox) shakeBox.addEventListener('click', ()=>{
    shakeBox.textContent = 'your real gift will come on 19 march at 01:00 exactly 143 hours before your birthday';
  });

  // miss-me button
  const missBtn = document.getElementById('missMe');
  if(missBtn) missBtn.addEventListener('click', ()=>{
    const msgs = ['If I could, I\'d send a thousand hugs right now.','You are my favourite place to be.','Counting the minutes until I see you again.','I\'m in your corner, always.'];
    const out = document.getElementById('missDisplay');
    if(out) out.textContent = msgs[Math.floor(Math.random()*msgs.length)];
  });

  // gift box
  const gift = document.getElementById('gift');
  if(gift) gift.addEventListener('click', ()=>{
    gift.classList.toggle('open');
    const reveal = document.getElementById('giftReveal');
    if(gift.classList.contains('open')) reveal.textContent = '143... I love you — snippet: "I love you — in all small ways". Full gift revealed 19 March 01:00.';
    else reveal.textContent='(closed)';
  });
});
