

//slider -------------------------------------------------------------
var swiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
//-------------------------------------------------------------------------

// LECTEUR --------------------------------------------------
//var
var playButton = document.querySelectorAll('.play-btn');
var volumeButton = document.querySelectorAll('.volume');
var boutonMilieu = document.querySelectorAll('.column:nth-child(1) i')
var tempsEcoule = document.querySelectorAll('.temps')
var nbAudio;
var audio;
var audioTab =[];
var audio1 = new Audio('mp3/section-1/income-inequality-cut.mp3');
var audio2 = new Audio('mp3/section-1/data-strings-cut.mp3');
var audio3 = new Audio('mp3/section-1/wind-istanbul2.mp3');
var inputBarre = document.querySelectorAll('.barre')
var dureeAudio=[];
var dureeAudio1=55;
var dureeAudio2=50;
var dureeAudio3=40;

audioTab.push(audio1,audio2, audio3);
audioTab[0].muted=true;
audioTab[1].muted=true;
audioTab[2].muted=true;
dureeAudio.push(dureeAudio1, dureeAudio2, dureeAudio3)

$('.column').click(function() {
	$(this).toggleClass("active");
})

function lireAudio(){
  
  var attributEst = $('.swiper-slide-active').attr('rangSlider')
  var attrSlider = parseInt(attributEst, 10);
  audioTab[attrSlider].crossOrigin="anonymous"
  audioTab[attrSlider].muted=false;

  if (!audioTab[attrSlider].paused){ 
    playButton[attrSlider].classList.remove("fa-pause");
    playButton[attrSlider].classList.add("fa-play");
    audioTab[attrSlider].pause();
  }
  else {
    for (let index = 0; index < audioTab.length; index++) {
      playButton[index].classList.add("fa-play");
      audioTab[index].pause();
    }

    playButton[attrSlider].classList.remove("fa-play");
    volumeButton[attrSlider].classList.remove("fa-volume-up");
    volumeButton[attrSlider].classList.add("fa-volume-mute");
    playButton[attrSlider].classList.add("fa-pause");
    audioTab[attrSlider].play();
  }

}

function test(audioTab){ //

  var attributEst = $('.swiper-slide-active').attr('rangSlider')
  var attrSlider = parseInt(attributEst, 10);
  audioTab[attrSlider].currentTime=inputBarre[attrSlider].value;

  if (! audioTab[attrSlider].played){ 
    $('.play-btn').removeClass("fa-play");
    $('.play-btn').addClass("fa-pause");
    audioTab[attrSlider].play();
  }

}
document.querySelectorAll('.barre').forEach(element => {
  element.addEventListener('input',() => {test(audioTab)})
});

function advanceTime(){ //avancer temps

  var attributEst = $('.swiper-slide-active').attr('rangSlider')
  var attrSlider = parseInt(attributEst, 10);
  audioTab[attrSlider].currentTime=audioTab[attrSlider].currentTime+10;
  inputBarre[attrSlider].value=audioTab[attrSlider].currentTime;

}
document.querySelectorAll(".column .plusTemps").forEach(element => {
  element.addEventListener('click', advanceTime) 
})
  
function moveBackTime(){ //reculer temps

  var attributEst = $('.swiper-slide-active').attr('rangSlider')
  var attrSlider = parseInt(attributEst, 10);
  audioTab[attrSlider].currentTime= audioTab[attrSlider].currentTime-10;
  inputBarre[attrSlider].value= audioTab[attrSlider].currentTime;

}
document.querySelectorAll(".column .moinsTemps").forEach(element => {
  element.addEventListener('click', moveBackTime)
});

function sound(){

  var attributEst = $('.swiper-slide-active').attr('rangSlider')
  var attrSlider = parseInt(attributEst, 10);
  if (volumeButton[attrSlider].classList.contains("fa-volume-up") == true) {
    volumeButton[attrSlider].classList.remove("fa-volume-up")
    volumeButton[attrSlider].classList.add("fa-volume-mute")
    audioTab[attrSlider].muted=false;
  }
  else {
    volumeButton[attrSlider].classList.remove("fa-volume-mute")
    volumeButton[attrSlider].classList.add("fa-volume-up")
    audioTab[attrSlider].muted=true;
  }

}
volumeButton.forEach(element => {
  element.addEventListener('click', sound)
});

function temps(){

  var attributEst = $('.swiper-slide-active').attr('rangSlider')
  var attrSlider = parseInt(attributEst, 10);
  s=dureeAudio[attrSlider]; // duree est definie ailleurs 
  m=0; // min
  h=0; //heure
  
  if ( audioTab[attrSlider].currentTime > 59){
    m=Math.floor(audioTab[attrSlider].currentTime/60);
    if (((Math.floor( audioTab[attrSlider].currentTime)) -m*60) < 10){
        tempsEcoule[attrSlider].innerHTML=m+':0'+  ((Math.floor(audioTab[attrSlider].currentTime)) -m*60)
    }
    else{
      tempsEcoule[attrSlider].innerHTML=m+':'+  ((Math.floor(audioTab[attrSlider].currentTime)) -m*60)
    }
  } 

  else{
    if (audioTab[attrSlider].currentTime < 60 && audioTab[attrSlider].currentTime > 10){
      m=Math.floor(audioTab[attrSlider].currentTime/60);
      tempsEcoule[attrSlider].innerHTML=m+':'+  ((Math.floor(audioTab[attrSlider].currentTime)) -m*60)
    }
    if (audioTab[attrSlider].currentTime < 10){
      m=Math.floor(audioTab[attrSlider].currentTime/60);
      tempsEcoule[attrSlider].innerHTML=+m+':0'+  ((Math.floor(audioTab[attrSlider].currentTime)) -m*60)
    }
  } 

  if (inputBarre[attrSlider].value==dureeAudio[attrSlider]){ // si on est a la fin de l'audio
    inputBarre[attrSlider].value=0;
    audioTab[attrSlider].currentTime=0;
    audioTab[attrSlider].pause();
    $('.play-btn').removeClass("fa-pause");
    $('.play-btn').addClass("fa-play");
  }

  if (!audioTab[attrSlider].paused){ 
    inputBarre[attrSlider].value++;
  }

  setTimeout(temps, 999)

}
temps();    
//----------------------------------------------------------------


// LIRE PLUS ----------------------------------------------
var btPlus = document.querySelectorAll('.plus')
var txtDebut= document.querySelectorAll('.txtDebut')
var txtSuite =document.querySelectorAll('.txtSuite')
var heroPhone = document.querySelector('.hero__phone')
var menuJaune = document.querySelector('#menu')
var slider = document.querySelector('.swiper-container')

function lireSuite() {

  var attributEst = $('.swiper-slide-active').attr('rangSlider')
  var attrSlider = parseInt(attributEst, 10);
  btPlus[attrSlider].style.display="none"
  txtSuite[attrSlider].style.display="contents"
   
}
btPlus.forEach(element => {
  element.addEventListener('click',lireSuite)
});
//----------------------------------------------------------------


// MENU ---------------------------------------------------------
// "use strict";

const button = document.querySelector('.menu__button');
const menu = document.querySelector('.menu__body');
const close = document.querySelector('.menu__header button');
const overlay = document.querySelector('.menu__overlay');

function showMenu() {

  button.setAttribute('hidden', '');
  button.style.display="none"
  menu.removeAttribute('hidden');
  overlay.removeAttribute('hidden');
  heroPhone.style.minWidth="300px"
  heroPhone.style.width="300px"

};

function hideMenu() {

  menu.setAttribute('hidden', '');
  overlay.setAttribute('hidden', '');
  button.removeAttribute('hidden');
  button.style.display="flex"
  heroPhone.style.minWidth="7rem"
  heroPhone.style.width="7rem"

};
button.addEventListener('click', showMenu);
close.addEventListener('click', hideMenu);
overlay.addEventListener('click', hideMenu);
//-------------------------------------------------------------


// RECHERCHE INPUT --------------------------------------------------
const inputField = document.querySelector('.chosen-value');
const inputField2 = document.querySelector('.chosen-value2');

var body = document.querySelector('body')
var projectWrapper = document.querySelector('.project-wrapper')
var form = document.querySelector('form')
const dropdown = document.querySelector('.value-list');
const dropdown2 = document.querySelector('.value-list2');
const dropdownArray = [...document.querySelectorAll('#menu li')];
const dropdownArray2 = [...document.querySelectorAll('.value-list2 li')];
var valueList =  document.querySelectorAll('.value-list li:not(:first-child):not(:last-child)')
var valueList2 =  document.querySelectorAll('.value-list2 li:not(:first-child):not(:last-child)')


let valueArray = [];
dropdownArray.forEach(item => {
  valueArray.push(item.textContent);
});

let valueArray2 = [];
dropdownArray2.forEach(item => {
  valueArray2.push(item.textContent);
});

const closeDropdown = () => {
  dropdown.classList.remove('open');
  dropdown2.classList.remove('open');
};



inputField.addEventListener('input', () => {
 
  dropdown.classList.add('open');
  let inputValue = inputField.value.toLowerCase();
  let valueSubstring;

  
  if (inputValue.length > 0) {
    for (let j = 0; j < valueArray.length; j++) {
      if (!(inputValue.substring(0, inputValue.length) === valueArray[j].substring(0, inputValue.length).toLowerCase())) {
        dropdownArray[j].classList.add('closed');
      }
     
      else {
        dropdownArray[j].classList.remove('closed');
      }
    }
  } 
  else {
    for (let i = 0; i < dropdownArray.length; i++) {
      dropdownArray[i].classList.remove('closed');
    }
  }
});

dropdownArray.forEach(item => {

  item.addEventListener('click', evt => {
    inputField.value = item.textContent;
    dropdownArray.forEach(dropdown => {
      hideMenu();
    });
  });
});


inputField2.addEventListener('input', () => {
 
  dropdown2.classList.add('open');
  let inputValue2 = inputField2.value.toLowerCase();
  let valueSubstring;

  if (inputValue2.length > 0) {
    for (let j = 0; j < valueArray2.length; j++) {
      if (!(inputValue2.substring(0, inputValue2.length) === valueArray2[j].substring(0, inputValue2.length).toLowerCase())) {
        dropdownArray2[j].classList.add('closed');
      }
      else {
        dropdownArray2[j].classList.remove('closed');
      }
    }
  } 
  else {
    for (let i = 0; i < dropdownArray2.length; i++) {
      dropdownArray2[i].classList.remove('closed');
    }
  }
});

inputField.addEventListener('click', () => {
  menuJaune.style.bottom="22%"
  body.style.overflow="hidden"
})

inputField.addEventListener('focus', () => {

  inputField.placeholder = 'Taper pour trier'; 
  dropdown.classList.add('open');
  dropdownArray.forEach(dropdown => {
    dropdown.classList.remove('closed');
  });
 
});



inputField2.addEventListener('focus', () => {

  menuJaune.style.display="none"
  inputField2.placeholder = 'Taper pour trier';
  dropdown2.classList.add('open');
  dropdownArray2.forEach(dropdown2 => {
    dropdown2.classList.remove('closed');
  });
 
});

inputField.addEventListener('blur', () => {

  inputField.placeholder = 'Rechercher une oeuvre';
  dropdown.classList.remove('open');

});

inputField2.addEventListener('blur', () => {

  menuJaune.style.display="block"
  menuJaune.style.bottom="2%"
  inputField2.placeholder = 'Rechercher une oeuvre';
  dropdown2.classList.remove('open');

});

document.addEventListener('click', evt => {

  const isDropdown = dropdown.contains(evt.target);
  const isInput = inputField.contains(evt.target);

  if (!isDropdown && !isInput) {
    body.style.overflow="auto"
    menuJaune.style.bottom="2%"
    dropdown.classList.remove('open');
  }
});

document.addEventListener('click', evt => {
  const isDropdown2 = dropdown2.contains(evt.target);
  const isInput2 = inputField2.contains(evt.target);

  if (!isDropdown2 && !isInput2) {
    dropdown2.classList.remove('open');
  }


});
// ----------------------------------------------------------------


// LIENS INPUT RECHERCHE ----------------------------------------------
var liTest = document.querySelector('#liTest')
var liAll = document.querySelectorAll('li')
var swiperWrapper = document.querySelector('.swiper-wrapper')
var swiperSlider1 = document.querySelector('.swiper-slide[rangSlider="0"')
var swiperSlider2 = document.querySelector('.swiper-slide[rangSlider="1"]')
var swiperSlider3 = document.querySelector('.swiper-slide[rangSlider="2"]')
var swiperSliderAll = document.querySelectorAll('.swiper-slide[rangSlider]')
var swiperAllSlider = document.querySelectorAll('.swiper-slide')
var btNext =document.querySelector('.btNext')
var btPrev = document.querySelector('.btPrev')
var barreProgression = document.querySelector('.swiper-pagination-progressbar-fill');
var nbSection;

if(document.URL.indexOf("income") >= 0 || document.URL.indexOf("data") >= 0  || document.URL.indexOf("wind") >= 0  || document.URL.indexOf("disease") >= 0  || document.URL.indexOf("sounds") >= 0  || document.URL.indexOf("trillions") >= 0  || document.URL.indexOf("facebook") >= 0  || document.URL.indexOf("histography") >= 0  || document.URL.indexOf("lostalgic") >= 0  || document.URL.indexOf("love") >= 0  || document.URL.indexOf("one") >= 0 || document.URL.indexOf("earth") >= 0){
  moveLi();
}

function moveLi() {
 
  var nbLiAllClass;
  var nbFooter = document.querySelector('#dailyui').innerHTML
  var attributEst = $('.swiper-slide-active').attr('rangSlider')
  var attrSlider = parseInt(attributEst, 10);
  var sliderActive = document.querySelector('.swiper-slide-active')
  var liAllClass = Array.prototype.slice.call( document.querySelectorAll('li'), 0 );

  if(document.URL.indexOf("income") >= 0 || document.URL.indexOf("data") >= 0  || document.URL.indexOf("wind") >= 0  || document.URL.indexOf("disease") >= 0  || document.URL.indexOf("sounds") >= 0  || document.URL.indexOf("trillions") >= 0  || document.URL.indexOf("facebook") >= 0  || document.URL.indexOf("histography") >= 0  || document.URL.indexOf("lostalgic") >= 0  || document.URL.indexOf("love") >= 0  || document.URL.indexOf("one") >= 0 || document.URL.indexOf("earth") >= 0){


    if(document.URL.indexOf("income") >= 0){
      nbLiAllClass = 0;
    }  
    if(document.URL.indexOf("data") >= 0){
      nbLiAllClass = 1;
    }
    if(document.URL.indexOf("wind") >= 0){
      nbLiAllClass = 2;
    }
    if(document.URL.indexOf("disease") >= 0){
      nbLiAllClass = 3;
    }
    if(document.URL.indexOf("sounds") >= 0){
      nbLiAllClass = 4;
    }
    if(document.URL.indexOf("trillions") >= 0){
      nbLiAllClass = 5;
    }
    if(document.URL.indexOf("facebook") >= 0){
      nbLiAllClass = 6;
    }
    if(document.URL.indexOf("histography") >= 0){
      nbLiAllClass = 7;
    }
    if(document.URL.indexOf("lostalgic") >= 0){
      nbLiAllClass = 8;
    }
    if(document.URL.indexOf("love") >= 0){
      nbLiAllClass = 9;
    }
    if(document.URL.indexOf("one") >= 0){
      nbLiAllClass = 10;
    }
    if(document.URL.indexOf("earth") >= 0){
      nbLiAllClass = 11;
    }

    history.pushState(null, '', `section${nbFooter}.html`);    
  }


 else {
    nbLiAllClass = (liAllClass.indexOf(event.currentTarget));
 }
 


//--------------------------------------------------------------------------

  if (nbLiAllClass >= 12){ //si clic sur li 1, on leur donne valeur li 2
    nbLiAllClass = nbLiAllClass-12;
   
    menuJaune.style.bottom="2%"
    inputField.value=""
  }

  if (nbLiAllClass <= 2 && nbLiAllClass >= 0){  // si clic sur li 2 ds la page

      liAll[nbLiAllClass].style.transitionProperty ="transform";
      swiperWrapper.style.transform =`translate3d(-${(nbLiAllClass)*100}%, 0px, 0px)`
      swiperWrapper.style.transitionDuration ="300ms"
      sliderActive.classList.remove('swiper-slide-active')
      swiperSliderAll[nbLiAllClass].classList.add('swiper-slide-active')

      if (nbLiAllClass != attrSlider){

        if (attrSlider != 2){
        swiperSliderAll[attrSlider+1].classList.remove('swiper-slide-next')
        }
        if (attrSlider != 0){
        swiperSliderAll[attrSlider-1].classList.remove('swiper-slide-prev')
        }

        if (nbLiAllClass != 2){
          swiperSliderAll[nbLiAllClass+1].classList.add('swiper-slide-next')
        }
        if (nbLiAllClass != 0){
          swiperSliderAll[nbLiAllClass-1].classList.add('swiper-slide-prev')
        }

      }

  }

 
  else if (nbLiAllClass > 2){ // clic sur li hors page
    
   
    if (nbLiAllClass >= 3 && nbLiAllClass <= 6){
      nbSection = 2;
    }
    if (nbLiAllClass >= 7 && nbLiAllClass <= 11){
      nbSection = 3;
    }
      document.location.href= `section${nbSection}.html#${liAll[nbLiAllClass].innerHTML.toLowerCase()}`
    }

      // bt next prev
    if (nbLiAllClass != 2){
      btNext.classList.remove('btDisabled')
    }
    else {
      btNext.classList.add('btDisabled')
    }
    if (nbLiAllClass != 0){
      btPrev.classList.remove('btDisabled')
    }
    else {
      btPrev.classList.add('btDisabled')
    }
  
    barreProgression.style.transform =`translate3d(0px, 0px, 0px) scaleX(${(nbLiAllClass+1)*0.333333}) scaleY(1)`
    barreProgression.style.transitionDuration = "300ms" 

}
 
liAll.forEach ( liSelected => {
  liSelected.addEventListener('click', moveLi)
})

function moveBt() {

  var btAllClass = Array.prototype.slice.call( document.querySelectorAll('.btRang'), 0 );
  var nbBtAllClass = (btAllClass.indexOf(event.currentTarget));
  var attributEst = $('.swiper-slide-active').attr('rangSlider')
  var attrSlider = parseInt(attributEst, 10);
  var sliderActive = document.querySelector('.swiper-slide-active')


  if (nbBtAllClass >= 0){ // si clic sur fleche bt


  if (nbBtAllClass == 1){ // si clic sur next

    btPrev.classList.remove('btDisabled')
  
    if (attrSlider != 2 ){ // 
      sliderActive.classList.remove('swiper-slide-active')
      swiperSliderAll[attrSlider+1].classList.add('swiper-slide-active')
      swiperWrapper.style.transform =`translate3d(-${(attrSlider+1)*100}%, 0px, 0px)`
      swiperWrapper.style.transitionDuration ="300ms"

      swiperSliderAll[attrSlider].classList.add('swiper-slide-prev')
      swiperSliderAll[attrSlider+1].classList.remove('swiper-slide-next')

      if (attrSlider != 0){
        swiperSliderAll[attrSlider-1].classList.remove('swiper-slide-prev')
      }
      if (attrSlider != 1){
        swiperSliderAll[attrSlider+2].classList.add('swiper-slide-next')
      }
    
    }

    barreProgression.style.transform =`translate3d(0px, 0px, 0px) scaleX(${(attrSlider+2)*0.333333}) scaleY(1)`

  }
  if (nbBtAllClass == 0){ // si clic sur prev

    if (attrSlider != 0){ //

      sliderActive.classList.remove('swiper-slide-active')
      swiperSliderAll[attrSlider-1].classList.add('swiper-slide-active')
      swiperWrapper.style.transform =`translate3d(-${(attrSlider-1)*100}%, 0px, 0px)`

      swiperSliderAll[attrSlider].classList.add('swiper-slide-next')
      swiperSliderAll[attrSlider-1].classList.remove('swiper-slide-prev')

      if (attrSlider != 1){
        swiperSliderAll[attrSlider-2].classList.add('swiper-slide-prev')
      }
      if (attrSlider != 2){
        swiperSliderAll[attrSlider+1].classList.remove('swiper-slide-next')
      }

  }

  barreProgression.style.transform =`translate3d(0px, 0px, 0px) scaleX(${(attrSlider)*0.333333}) scaleY(1)`
  }
  }

  barreProgression.style.transitionDuration = "300ms" 
}




btNext.addEventListener('click', moveBt)
btPrev.addEventListener('click', moveBt)

// liTest.addEventListener('click', moveRight)

function checkSlide() {
  var attributEst = $('.swiper-slide-active').attr('rangSlider')
  var attrSlider = parseInt(attributEst, 10);

  // bt next prev
  if (attrSlider != 2){
    btNext.classList.remove('btDisabled')
  }
  else {
    btNext.classList.add('btDisabled')
  }
  if (attrSlider != 0){
    btPrev.classList.remove('btDisabled')
  }
  else {
    btPrev.classList.add('btDisabled')
  }

  setTimeout(checkSlide
  , 99);

}
checkSlide();
