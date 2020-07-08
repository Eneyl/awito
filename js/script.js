'use strict';

const dataBase = [];

const modalAdd = document.querySelector('.modal__add'),
    addAd = document.querySelector('.add__ad'),
    modalBtnSubmit = document.querySelector('.modal__btn-submit'),
    modalSubmit = document.querySelector('.modal__submit'),
    catalog = document.querySelector('.catalog'),
    modalItem = document.querySelector('.modal__item'),
    modalBtnWarnin = document.querySelector('.modal__btn-warning');

const elementsModalSubmit = [...modalSubmit.elements]
      .filter(elem => elem.tagName !== 'BUTTON');


/**
 * ЗАКРЫТИЕ МОДАЛЬНЫХ ОКОН 
*/
const closeModal = function(event) {
  const target = event.target;
  
  if (target.closest('.modal__close') || target === this || event.code === 'Escape') {
    this.classList.add('hide');
    
    if(this === modalAdd){
      modalSubmit.reset();
      modalBtnSubmit.disabled = true;
      modalBtnWarnin.style.display = '';
    }
    
    document.body.removeEventListener('keydown', closeModal);
  } 
};

/** 
 * ВАЛИДАЦИЯ ФОРМЫ МОДАЛЬНОГО ОКНА РАЗМЕЩЕНИЯ ОБЪЯВЛЕНИЙ
*/
modalSubmit.addEventListener('input', () => {
  const isValidForm = elementsModalSubmit.every(elem => elem.value);
  modalBtnSubmit.disabled = !isValidForm;
  modalBtnWarnin.style.display = isValidForm ? 'none' : ''; 
});

/** 
 * ОТПРАВКА ЗНАЧЕНИЙ ПОЛЕЙ ВВОДА ФОРМЫ МОДАЛЬНОГО ОКНА РАЗМЕЩЕНИЯ ОБЪЯВЛЕНИЙ
*/
modalSubmit.addEventListener('submit', event => {
  event.preventDefault();
  const itemObj = {};
  for (const elem of elementsModalSubmit){
    itemObj[elem.name] = elem.value;
  }
  dataBase.push(itemObj);
  modalSubmit.reset();
});

/** 
 * ОТКРЫТИЕ МОДАЛЬНОГО ОКНА РАЗМЕЩЕНИЯ ОБЪЯВЛЕНИЙ
*/
addAd.addEventListener('click', ()=>{
  modalAdd.classList.remove('hide');
  modalBtnSubmit.disabled = true;
  document.body.addEventListener('keydown', closeModal.bind(modalAdd));
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);

/** 
 * ОТКРЫТИЕ МОДАЛЬНОГО ОКНА ЭЛЕМЕНТА КАТАЛОГА ОБЪЯВЛЕНИЙ
*/
catalog.addEventListener('click', event =>{

  if (event.target.closest('.card')) {
    modalItem.classList.remove('hide');
    document.body.addEventListener('keydown', closeModal.bind(modalItem));
  }
  
})


