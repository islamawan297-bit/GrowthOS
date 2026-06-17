// GrowthOS AI demo interactions: counters, assistant mock, charts, 3D float
document.addEventListener('DOMContentLoaded',()=>{
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Animated stats
  document.querySelectorAll('.num').forEach(el=>{
    const target = parseFloat(el.dataset.target);
    let current = 0;
    const step = target / 60;
    const fmt = (v)=> Number.isInteger(target) ? Math.round(v) : (Math.round(v*10)/10);
    const id = setInterval(()=>{
      current += step;
      if(current >= target){el.textContent = fmt(target);clearInterval(id)} else el.textContent = fmt(current);
    },16);
  });

  // Assistant mock
  const input = document.getElementById('assistant-input');
  const send = document.getElementById('assistant-send');
  const messages = document.getElementById('assistant-messages');
  if(input && send && messages){
    send.addEventListener('click',()=>{const v=input.value.trim();if(!v) return;appendMsg(v,'from-user');input.value='';setTimeout(()=>{appendMsg('Analyzing your data and generating recommendation...','from-ai');scrollMessages();setTimeout(()=>{appendMsg('Recommendation: Increase paid social budget by 12% for the next 6 weeks to capture demand; predicted revenue uplift +8%.','from-ai');scrollMessages();},900);},300);});
  }
  function appendMsg(text,cls){const d=document.createElement('div');d.className='message '+cls;d.textContent=text;messages.appendChild(d);scrollMessages();}
  function scrollMessages(){if(messages) messages.scrollTop = messages.scrollHeight}

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit',e=>{e.preventDefault();alert('Demo request submitted — we\'ll reach out shortly.');e.target.reset();});
  }

  // Pricing toggle
  const toggle = document.getElementById('billingToggle');
  if(toggle){
    toggle.addEventListener('change',()=>{
      const yearly = toggle.checked;
      document.querySelectorAll('.price .amount').forEach((el,i)=>{
        const base = [29,99,249][i];
        el.textContent = yearly ? Math.round(base*12*0.8/12) : base;
      });
    });
  }

  // Charts (Chart.js)
  const forecastCanvas = document.getElementById('forecastChart');
  if(forecastCanvas){
    const ctxF = forecastCanvas.getContext('2d');
    new Chart(ctxF,{type:'line',data:{labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'],datasets:[{label:'Revenue',data:[12,18,22,30,40,48,55,68],borderWidth:2,borderColor:'#7cf9a2',backgroundColor:'rgba(124,249,162,0.08)',tension:0.36}]},options:{plugins:{legend:{display:false}},scales:{y:{ticks:{color:'#9fb1c4'},grid:{color:'rgba(255,255,255,0.02)'}},x:{ticks:{color:'#9fb1c4'}}}}});
  }

  const leadsCanvas = document.getElementById('leadsChart');
  if(leadsCanvas){
    const ctxL = leadsCanvas.getContext('2d');
    new Chart(ctxL,{type:'bar',data:{labels:['Cold','Warm','Hot'],datasets:[{label:'Leads',data:[240,120,45],backgroundColor:['#6a6cff','#00d4ff','#7cf9a2']} ]},options:{plugins:{legend:{display:false}},scales:{y:{display:false},x:{ticks:{color:'#9fb1c4'},grid:{display:false}}}}});
  }

  const sentimentCanvas = document.getElementById('sentimentChart');
  if(sentimentCanvas){
    const ctxS = sentimentCanvas.getContext('2d');
    new Chart(ctxS,{type:'doughnut',data:{labels:['Positive','Neutral','Negative'],datasets:[{data:[68,20,12],backgroundColor:['#7cf9a2','#6a6cff','#ff6b6b'],borderWidth:0}]},options:{plugins:{legend:{position:'bottom',labels:{color:'#9fb1c4'}}}}});
  }

  // Floating 3D orb using three.js
  (function(){
    const el = document.getElementById('floating-3d');
    if(!el) return;
    const w = el.clientWidth, h = el.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50,w/h,0.1,1000);camera.position.z=4;
    const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setSize(w,h);renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));el.appendChild(renderer.domElement);
    const geo = new THREE.IcosahedronGeometry(1.1,2);
    const mat = new THREE.MeshStandardMaterial({color:0x6a6cff,emissive:0x002244,transparent:true,opacity:0.9,roughness:0.15,metalness:0.6});
    const mesh = new THREE.Mesh(geo,mat);scene.add(mesh);
    const light = new THREE.PointLight(0x00d4ff,1.2,10);light.position.set(2,2,3);scene.add(light);
    const light2 = new THREE.PointLight(0x7cf9a2,0.9,10);light2.position.set(-2,-1,2);scene.add(light2);
    function animate(){mesh.rotation.y += 0.004;mesh.rotation.x += 0.002;renderer.render(scene,camera);requestAnimationFrame(animate)}animate();
    window.addEventListener('resize',()=>{const rw=el.clientWidth,rh=el.clientHeight;renderer.setSize(rw,rh);camera.aspect=rw/rh;camera.updateProjectionMatrix();});
  })();
});
