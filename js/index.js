// MENU ---------------------------------------------------------
// "use strict";
var heroPhone = document.querySelector('.hero__phone')
var menuJaune = document.querySelector('#menu')
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
var body = document.querySelector('body')
var projectWrapper = document.querySelector('.project-wrapper')
var form = document.querySelector('form')
const dropdown = document.querySelector('.value-list');
const dropdownArray = [...document.querySelectorAll('#menu li')];
var valueList =  document.querySelectorAll('.value-list li:not(:first-child):not(:last-child)')


let valueArray = [];
dropdownArray.forEach(item => {
  valueArray.push(item.textContent);
});

const closeDropdown = () => {
  dropdown.classList.remove('open');
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

inputField.addEventListener('blur', () => {

  inputField.placeholder = 'Rechercher une oeuvre';
  dropdown.classList.remove('open');

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


function moveLi() {
 
  var liAllClass = Array.prototype.slice.call( document.querySelectorAll('li'), 0 );
  var nbLiAllClass = (liAllClass.indexOf(event.currentTarget));
  var nbSection;

    menuJaune.style.bottom="2%"
    inputField.value=""

    if (nbLiAllClass >= 0 && nbLiAllClass <= 2){
       nbSection = 1;
    }
    if (nbLiAllClass >= 3 && nbLiAllClass <= 6){
        nbSection = 2;
     }
     if (nbLiAllClass >= 7 && nbLiAllClass <= 11){
        nbSection = 3;
     }

    document.location.href= `section${nbSection}.html#${liAll[nbLiAllClass].innerHTML.toLowerCase()}`

}
 
liAll.forEach ( liSelected => {
  liSelected.addEventListener('click', moveLi)
})