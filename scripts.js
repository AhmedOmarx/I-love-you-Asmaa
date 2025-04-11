const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const message = document.getElementById("message");
const lovedOne = document.getElementById("loved-one");
const hiddenMessage = document.getElementById("hidden-message");
const apologyMessage = document.getElementById("apology-message");
const countdownEl = document.getElementById("countdown");
const namesEl = document.getElementById("names");
const romanticLight = document.querySelector(".romantic-light");
let heartsInterval;

// زر "لا" يهرب عند المرور عليه
noBtn.addEventListener("mouseover", moveButton);
noBtn.addEventListener("click", moveButton); // استخدام click بدلاً من touchstart

function moveButton() {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 40);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 40);

  noBtn.style.transition = "all 0.5s ease-out";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  noBtn.style.transform = "rotate(5deg)";
  setTimeout(() => noBtn.style.transform = "rotate(-5deg)", 100);
  setTimeout(() => noBtn.style.transform = "rotate(0deg)", 200);
}

// زر "نعم" مع عد تنازلي
yesBtn.addEventListener("click", startRomance); // استخدام click بدلاً من touchend

function startRomance() {
  romanticLight.style.opacity = "1";
  countdownEl.style.display = "block";
  lovedOne.classList.add("glowing");
  
  let count = 3;
  countdownEl.textContent = `...${count}`;
  
  const timer = setInterval(() => {
    count--;
    countdownEl.textContent = `...${count}`;
    
    if (count <= 0) {
      clearInterval(timer);
      countdownEl.style.display = "none";
      showLove();
      setTimeout(() => {
        hiddenMessage.style.display = "block";
      }, 500); // تأخير بسيط حتى تظهر الرسالة بعد حب
      
      setTimeout(() => {
        apologyMessage.style.display = "block";
      }, 2000); // ظهور رسالة الاعتذار بعد 2 ثانية
    }
  }, 1000);
}

function showLove() {
  message.style.display = "block";
  namesEl.style.display = "block";
  
  // قلوب حول الصورة
  heartsInterval = setInterval(createHearts, 200);
  setTimeout(() => clearInterval(heartsInterval), 10000);
}

function createHearts() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  
  const angle = Math.random() * Math.PI * 2;
  const radius = 100 + Math.random() * 50;
  const x = lovedOne.offsetLeft + lovedOne.offsetWidth/2 + Math.cos(angle) * radius - 12;
  const y = lovedOne.offsetTop + lovedOne.offsetHeight/2 + Math.sin(angle) * radius - 12;
  
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.animationDuration = `${3 + Math.random() * 3}s`;
  document.body.appendChild(heart);
  
  setTimeout(() => heart.remove(), 4000);
}