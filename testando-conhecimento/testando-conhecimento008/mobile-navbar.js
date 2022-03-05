class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
      this.mobileMenu = document.querySelector(mobileMenu);
      this.navList = document.querySelector(navList);
      this.navLinks = document.querySelectorAll(navLinks);
      this.activeClass = "active";
  
      this.handleClick = this.handleClick.bind(this);
    }
  
    animateLinks() {
      this.navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = "")
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
            }s`);
      });
    }
  
    handleClick() {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
      this.animateLinks();
    }
  
    addClickEvent() {
      this.mobileMenu.addEventListener("click", this.handleClick);
    }
  
    init() {
      if (this.mobileMenu) {
        this.addClickEvent();
      }
      return this;
    }
  }
  
  const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
  );
  mobileNavbar.init();

  var imgs = new Array();
  var mostradores = new Array();
  var pos=[10,90,170,250];
  var imgAtual=0;
  var imgMax=3;
  var timer,timerTroca;
  var p,objeto;
  var tempoTroca=0;
 var dir="direita";

 //função responsavel por controlar a animação quando o botão da direita for precionado
  function controleDireita(){
      if(imgAtual < imgMax){
      imgs[imgAtual].style.filter = "blur(5px)";
      mostradores[imgAtual].style.backgroundColor="rgba(255,255,255,50%)";
      imgAtual++;
      imgs[imgAtual].style.filter="blur(0px)";
      mostradores[imgAtual].style.backgroundColor="rgba(255,255,255,100%)";
      tempoTroca=0;
      timer = requestAnimationFrame(paraDireita);
      clearInterval(timerTroca);
      timerTroca = setInterval(cronometro,1000);
      d.removeEventListener("click",controleDireita);
     }
  }

 //animação para a direita
  function paraDireita(){
      for(var i=0;i<4;i++){
           p = pos[i];
           pos[i]-=80;
           p-=80;
           imgs[i].style.left=p+"%";
      }
      d.addEventListener("click",controleDireita);
  }

 //função responsavel por controlar a animação quando o botão da esquerda for precionado
  function controleEsquerda(){
  if(imgAtual > 0){
      imgs[imgAtual].style.filter="blur(5px)";
      mostradores[imgAtual].style.backgroundColor="rgba(255,255,255,50%)";
      imgAtual--;
      imgs[imgAtual].style.filter="blur(0px)";
      mostradores[imgAtual].style.backgroundColor="rgba(255,255,255,100%)";
      tempoTroca=0;
      timer = requestAnimationFrame(paraEsquerda);
      clearInterval(timerTroca);
      timerTroca = setInterval(cronometro,1000);
      e.removeEventListener("click",controleEsquerda);
     }
  }

 //animação para a esquerda
  function paraEsquerda(){
     for(var i=0;i<4;i++){
           p = pos[i];
           pos[i]+=80;
           p+=80;
           imgs[i].style.left=p+"%";
      }
      e.addEventListener("click",controleEsquerda);
  }

 //função responsavel pela troca automatica
  function cronometro(){
     if(!document.hidden){
         if(imgAtual==imgMax){
             dir="esquerda";
         }
         if(imgAtual==0){
             dir="direita";
         }
         tempoTroca++;
         if((tempoTroca==15)&&(dir=="direita")){
             controleDireita();
             tempoTroca=0;
         }
         if((tempoTroca==15)&&(dir=="esquerda")){
             controleEsquerda();
             tempoTroca=0;
         }
     }
  }

 //função que inicializa os elementos
  function inicia(){
      var id;
      var obj;
      for(var i=1;i<5;i++){
          id="img"+i;
          obj = document.getElementById(id);
          imgs[i-1]=obj;
      }
      for(var i=1;i<5;i++){
          id="b"+i;
          obj = document.getElementById(id);
          mostradores[i-1]=obj;
      }
      timerTroca = setInterval(cronometro,1000);
  }

 //eventos
  window.addEventListener("load",inicia);
  var d,e;
  d = document.getElementById("direita");
  e = document.getElementById("esquerda");
  d.addEventListener("click",controleDireita);
  e.addEventListener("click",controleEsquerda);