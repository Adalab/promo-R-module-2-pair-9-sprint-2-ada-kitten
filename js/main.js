'use strict';


//crear la lista de gatitos en JS

const listKitten = document.querySelector('.js-list');
//constante de cada gatito

const kittenData_1 = {
  url: "https://ychef.files.bbci.co.uk/976x549/p07ryyyj.jpg",
  name: 'Anastacio'.toUpperCase(),
  desc: 'Risueño, juguetón, le guta estar tranquilo y que nadie le moleste.  Es una maravilla acariciarle!',
  race: ''
};

const kittenData_2 = {
  url: "https://images.emedicinehealth.com/images/article/main_image/cat-scratch-disease.jpg",
  name: 'Fiona'.toUpperCase(),
  desc: 'Risueño, cariñoso, le guta estar tranquilo y que nadie le moleste.  Es una maravilla acariciarle!',
  race: 'British Shorthair'
}

const kittenData_3 = {
  url: "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2019_39/3021711/190923-cat-pet-stock-cs-1052a.jpg",
  name: 'Cielo'.toUpperCase(),
  desc: 'Risueño, cariñoso, le guta estar tranquilo y que nadie le moleste.  Es una maravilla acariciarle!',
  race: ""
}


const kittenDataList = [kittenData_1, kittenData_2, kittenData_3]




//validar la raza
///echarle un ojo, no repetir el h4, incluir solo texto
function renderRace(race) {
  if (race === "") {
    race = `<p class="card_race">No se ha especificado la raza</p>`
  } else {
    race = `<h4 class="card_race">${race}</h4>`
  }
  console.log(typeof (race));
  return race;
}


function renderKitten(kittenData) {
  kittenData.race = renderRace(kittenData.race);
  const htmlKitten = `<li class="card"><img class="card_img"src=${kittenData.url} alt="gatito"/><h3 class="card_title">${kittenData.name}</h3>${kittenData.race}<p class="card_description"> ${kittenData.desc}</p></li>`;
  return htmlKitten
}

/*const kittenOne = renderKitten(kittenData_1);
const kittenTwo = renderKitten(kittenData_2);
const kittenThree = renderKitten(kittenData_3);
renderKittenList(kittenDataList);

  
// cambiamos el contenido de js-list (llamando a la constante)

listKitten.innerHTML = kittenOne + kittenTwo + kittenThree;*/

function renderKittenList(kittenDataList) {
  for (const kitten of kittenDataList) {
    const htmlKitten = renderKitten(kitten);
    listKitten.innerHTML += htmlKitten;
  }
}
renderKittenList(kittenDataList);


//búsqueda por descripción

//constantes de buscar
const input_search_desc = document.querySelector('.js_in_search_desc');
const input_search_race = document.querySelector('.js_in_search_race');
const labelSearch = document.querySelector('.error_search');
let valueSearchDesc = input_search_desc.value;
let valueSearchRace = input_search_race.value;

const searchBtn = document.querySelector('.js-btn-search');

function filterKitten(event) {
  event.preventDefault();
  valueSearchDesc = input_search_desc.value;
  valueSearchRace = input_search_race.value;  
  
   if (valueSearchDesc === "" || valueSearchRace === "") {
      labelSearch.innerHTML = 'Debe rellenar todos los valores.'
      }
  const searchedKitten = kittenDataList.filter(filterFunction);   
  listKitten.innerHTML = '';
  renderKittenList(searchedKitten);
  console.log(searchedKitten);
};

function filterFunction(kitten){
  if (kitten.desc.includes(valueSearchDesc) && kitten.race.includes(valueSearchRace) ){  
  return kitten 
  }
}; 

searchBtn.addEventListener('click', filterKitten);



//Constantes para mostrar/ocultar el formulario

const formAddCat = document.querySelector('.js-new-form');
const btn = document.querySelector(".js-cross");

//validar la información del formulario
const btnAdd = document.querySelector(".js-btn-add");
//const de los input
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race');
let valueDesc = inputDesc.value;
let valuePhoto = inputPhoto.value;
let valueName = inputName.value;
let valueRace = inputRace.value;

//mensaje de error
const labelMesageError = document.querySelector('.js-label-error');

//evento de click en añadir

function addNewKitten(event) {
  event.preventDefault();
  if (inputDesc.value === "" || inputPhoto.value === "" || inputName.value === "") {
    labelMesageError.innerHTML = 'Debe rellenar todos los valores.'
  } else {
    const newKittenDataObject = {
      name: inputName.value,
      desc: inputDesc.value,
      url: inputPhoto.value,
      race: inputRace.value
    }
    kittenDataList.push(newKittenDataObject);
    cleanInput();
    console.log(newKittenDataObject);
    labelMesageError.innerHTML = 'Mola! Un nuevo gatito en Adalab!';
    listKitten.innerHTML = '';
    renderKittenList(kittenDataList);
  };

}

function cleanInput() {
  inputDesc.value = "";
  inputPhoto.value = "";
  inputName.value = "";
  inputRace.value = "";
}


btnAdd.addEventListener('click', (addNewKitten));

//Cancelar formulario

const btonCancel = document.querySelector(".js-btn-cancel");

//Escuchar el boton 
const cancelNewKitten = (event) => {
  event.preventDefault();
  cleanInput();
  formAddCat.classList.add("collapsed");
};

btonCancel.addEventListener('click', (cancelNewKitten));

//Funciones para mostrar/oculta el menú de añadir gatito
function showNewCatForm() {
  formAddCat.classList.remove('collapsed');
}

function hideNewCatForm() {
  formAddCat.classList.add('collapsed');
}
//función que irá con el evento de click y que tiene el "if"
function handleClickNewCatForm(event) {
  event.preventDefault();
  if (formAddCat.classList.contains("collapsed")) {
    showNewCatForm();
  } else {
    hideNewCatForm();
  }
};

//evento de escucha con eventhandler
btn.addEventListener('click', handleClickNewCatForm);

