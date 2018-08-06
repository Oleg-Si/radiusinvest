/* ---------------------Scroll------------------------------ */

$('.howitworksButton').click(function(){
  event.preventDefault();
  $('html, body').animate({scrollTop:$('#howitworks').position().top}, 1000);
});

$('.installButton').click(function(){
  event.preventDefault();
  $('html, body').animate({scrollTop:$('#install').position().top}, 1000);
});

$('.partnerButton').click(function(){
  event.preventDefault();
  $('html, body').animate({scrollTop:$('#partner').position().top}, 1000);
});

/* ---------------------Popup------------------------------ */

var popup = document.querySelector('.popup');
var openPopup = document.querySelectorAll('.openPopup');
var overlay = document.querySelector('.overlay');
var closePopup = document.querySelector('.closePopup');

for (var i = 0; i < openPopup.length; i++) {
  openPopup[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    overlay.classList.add('overlay--open');
    popup.classList.add('popup--open');
  });
}

closePopup.addEventListener('click', function () {
  overlay.classList.remove('overlay--open');
  popup.classList.remove('popup--open');
});

overlay.addEventListener('click', function () {
  overlay.classList.remove('overlay--open');
  popup.classList.remove('popup--open');
  popupReview.classList.remove('popup__review--open');
  popupCertificate.classList.remove('popup__certificate--open');
});

/* ---------------------phone-mask------------------------------ */

jQuery(function($){
  $("#phone").mask("+375 (99) 999-99-99");
  $("#phone2").mask("+375 (99) 999-99-99");
});
