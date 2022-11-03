'use strict';


//crear la lista de gatitos en JS

const listKitten = document.querySelector('.js-list');
//constante de cada gatito

/*const kittenImage1 ="https://ychef.files.bbci.co.uk/976x549/p07ryyyj.jpg";
const kittenName1 = 'Anastacio'.toUpperCase();
const kittenRace1 = '';
const kittenDesc1 = 'Risueño, juguetón, le guta estar tranquilo y que nadie le moleste.  Es una maravilla acariciarle!';*/

const kittenData_1 = {
  url:"https://ychef.files.bbci.co.uk/976x549/p07ryyyj.jpg",
  name:'Anastacio'.toUpperCase(),
  desc:'Risueño, juguetón, le guta estar tranquilo y que nadie le moleste.  Es una maravilla acariciarle!',
  race:''
};

const kittenData_2 ={
  url:"https://images.emedicinehealth.com/images/article/main_image/cat-scratch-disease.jpg",
  name:'Fiona'.toUpperCase(),
  desc:'Risueño, cariñoso, le guta estar tranquilo y que nadie le moleste.  Es una maravilla acariciarle!',
  race:'British Shorthair'
}

/*const kittenImage2 ="https://images.emedicinehealth.com/images/article/main_image/cat-scratch-disease.jpg";
const kittenName2 = 'Fiona'.toUpperCase();
const kittenRace2 = 'British Shorthair';
const kittenDesc2 = 'Risueño, cariñoso, le guta estar tranquilo y que nadie le moleste.  Es una maravilla acariciarle!';*/

const kittenData_3 ={
  url: "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2019_39/3021711/190923-cat-pet-stock-cs-1052a.jpg",
  name: 'Cielo'.toUpperCase(),
  desc: 'Risueño, cariñoso, le guta estar tranquilo y que nadie le moleste.  Es una maravilla acariciarle!',
  race:""
}
/*const kittenImage3 ="https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2019_39/3021711/190923-cat-pet-stock-cs-1052a.jpg";
const kittenName3 = 'Cielo'.toUpperCase();
const kittenRace3 = '';
const kittenDesc3 = 'Risueño, cariñoso, le guta estar tranquilo y que nadie le moleste.  Es una maravilla acariciarle!';*/

const kittenDataList = [kittenData_1, kittenData_2,kittenData_3]

//validar la raza

/*let html = '';

if (kittenRace1 === "") {
    html = `No se ha especificado la raza`;
  } else {
    html = kittenRace1;
  } 

const kittenOne = `<li class="card"><article> <img class="card_img" src= ${kittenImage1} alt="gatito"/> <h3 class="card_title">${kittenName1}</h3>  <h4 class="card_race">${html}</h4>  <p class="card_description">${kittenDesc1}</p></article></li>`;

if (kittenRace2 === "") {
    html = `No se ha especificado la raza`;
  } else {
    html = kittenRace2;
  } 

const kittenTwo = `<li class="card"><img class="card_img"src=${kittenImage2} alt="gatito"/><h3 class="card_title">${kittenName2}</h3><h4 class="card_race">${html}</h4><p class="card_description"> ${kittenDesc2}</p></li>`;


const kittenThree = `<li class="card"><img class="card_img"  src=${kittenImage3}  alt="gatito" /><h3 class="card_title">${kittenName3}</h3><h4 class="card_race">${kittenRace3 === "" ? "No se ha especificado la raza" : kittenRace3}</h4><p class="card_description">${kittenDesc3}</p></li>`;*/

function renderRace (race){  
  if (race === "") {
    race =`<p class="card_race">No se ha especificado la raza</p>`
  } else {
   race= `<h4 class="card_race">${race}</h4>`
  } 
  console.log(typeof(race));
  return race;
}


/*function renderKitten(url, desc, name, race) {
  race = renderRace(race); 
  const htmlKitten = `<li class="card"><img class="card_img"src=${url} alt="gatito"/><h3 class="card_title">${name}</h3>${race}<p class="card_description"> ${desc}</p></li>`;
  return htmlKitten
}*/
function renderKitten(kittenData) {
  kittenData.race = renderRace(kittenData.race);
  const htmlKitten = `<li class="card"><img class="card_img"src=${kittenData.url} alt="gatito"/><h3 class="card_title">${kittenData.name}</h3>${kittenData.race}<p class="card_description"> ${kittenData.desc}</p></li>`;
  return htmlKitten
}

const kittenOne = renderKitten(kittenData_1);
const kittenTwo = renderKitten(kittenData_2);
const kittenThree = renderKitten(kittenData_3);


  
// cambiamos el contenido de js-list (llamando a la constante)

listKitten.innerHTML = kittenOne + kittenTwo + kittenThree;



//búsqueda por descripción

const searchBtn = document.querySelector('.js-btn-search');

function filterKitten (event) {
  event.preventDefault();
  const input_search_desc = document.querySelector('.js_in_search_desc');
  const input_search_race = document.querySelector('.js_in_search_race');  
  const labelSearch = document.querySelector('.error_search');
  const ValueSearchDesc = input_search_desc.value;
  const ValueSearchRace = input_search_race.value;
  const descrSearchText = input_search_desc.value;  
  if ( ValueSearchDesc === "" || ValueSearchRace=== "") {
  labelSearch.innerHTML = 'Debe rellenar todos los valores.'
  }
     if( kittenDesc1.includes(descrSearchText) ) {
    listKitten.innerHTML += kittenOne;
    }   
     if( kittenDesc2.includes(descrSearchText) ) {
        listKitten.innerHTML += kittenTwo;
    }    
     if( kittenDesc3.includes(descrSearchText) ) {
        listKitten.innerHTML += kittenThree;
    };
    console.log(descrSearchText);
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
const inputRace = document.querySelector ('.js-input-race');
let valueDesc = inputDesc.value;
let valuePhoto = inputPhoto.value;
let valueName = inputName.value;
let valueRace = inputRace.value;

//mensaje de error
const labelMesageError = document.querySelector('.js-label-error');

//evento de click en añadir

  function addNewKitten (event){
    event.preventDefault();    
    if ( inputDesc.value === "" || inputPhoto.value=== "" || inputName.value==="" ) {
      labelMesageError.innerHTML = 'Debe rellenar todos los valores.'
    } else {      
      const gatito = {
        name:inputName.value, 
        desc:inputDesc.value,
        foto:inputPhoto.value,
        race:inputRace.value              
    }  
    console.log(gatito);  
  };     
  return gatito
}

btnAdd.addEventListener('click', (addNewKitten) );

//Cancelar formulario

  const btonCancel = document.querySelector( ".js-btn-cancel");

  //Escuchar el boton 
  const cancelNewKitten = (event) => {
    event.preventDefault();

    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
    inputRace.value = "";
 
    formAddCat.classList.add("collapsed");   
  };

  btonCancel.addEventListener('click', (cancelNewKitten) );

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
      showNewCatForm ();      
    } else {
      hideNewCatForm();
    }      
  };

//evento de escucha con eventhandler
btn.addEventListener('click', handleClickNewCatForm);

