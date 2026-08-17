const modal=document.getElementById("modal");
const modalTitle=document.getElementById("modalTitle");
const modalText=document.getElementById("modalText");
const modalInput=document.getElementById("modalInput");
const modalAction=document.getElementById("modalAction");
const toast=document.getElementById("toast");
const themeToggle=document.getElementById("themeToggle");

function applyTheme(mode){
  const isLight=mode==="light";
  document.body.classList.toggle("light-mode", isLight);
  document.documentElement.style.colorScheme = isLight ? "light" : "dark";
  if(themeToggle){
    const icon=themeToggle.querySelector(".theme-icon");
    if(icon) icon.textContent = isLight ? "☀️" : "🌙";
    themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  }
  localStorage.setItem("gamex-theme", mode);
}

function initTheme(){
  const savedTheme=localStorage.getItem("gamex-theme");
  const preferredTheme=window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  applyTheme(savedTheme || preferredTheme);
}

if(themeToggle){themeToggle.addEventListener("click",()=>applyTheme(document.body.classList.contains("light-mode")?"dark":"light"));}
initTheme();

function scrollToSection(id){document.getElementById(id)?.scrollIntoView({behavior:"smooth"})}
function showMessage(message){toast.textContent=message;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2500)}
function openModal(type){
  modal.classList.add("show");
  if(type==="login"){modalTitle.textContent="Welcome Back";modalText.textContent="Log in to your GAMEX account.";modalInput.placeholder="Email address";modalAction.textContent="LOGIN";}
  else {modalTitle.textContent="Join GAMEX";modalText.textContent="Create your free gaming account.";modalInput.placeholder="Email address";modalAction.textContent="CREATE ACCOUNT";}
}
document.getElementById("loginBtn").onclick=()=>openModal("login");
document.getElementById("signupBtn").onclick=()=>openModal("signup");
document.getElementById("communityBtn").onclick=()=>openModal("signup");
document.getElementById("closeModal").onclick=()=>modal.classList.remove("show");
modal.onclick=e=>{if(e.target===modal)modal.classList.remove("show")};
modalAction.onclick=()=>{if(modalInput.value.trim()){modal.classList.remove("show");showMessage("Demo action completed! Connect a backend to make this live.");}else{modalInput.focus();}};
function openTrailer(){showMessage("Trailer player can be connected here.");}
document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const category=btn.dataset.filter;
    document.querySelectorAll(".game-card").forEach(card=>{
      card.style.display=category==="all"||card.dataset.category===category?"":"none";
    });
  });
});
const menu=document.querySelector(".menu-toggle"), nav=document.querySelector(".nav");
menu.addEventListener("click",()=>{
  const open=nav.style.display==="flex";
  nav.style.display=open?"none":"flex";
  if(!open){nav.style.position="absolute";nav.style.top="76px";nav.style.left="0";nav.style.right="0";nav.style.padding="20px";nav.style.background="var(--bg)";nav.style.flexDirection="column";nav.style.gap="18px";}
});
window.addEventListener("scroll",()=>{
  const sections=["home","games","news","esports","videos","community"];
  let current="home";
  sections.forEach(id=>{const el=document.getElementById(id);if(el&&window.scrollY>=el.offsetTop-120)current=id;});
  document.querySelectorAll(".nav a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current));
});
