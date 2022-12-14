"use strict";

//variables de pintar gatitos
const listKitten = document.querySelector(".js-list");
const GITHUB_USER = "marialapc";
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;
let kittenDataList = [];

//variable de boton buscar
const searchBtn = document.querySelector(".js-btn-search");
const input_search_desc = document.querySelector('.js_in_search_desc');
const input_search_race = document.querySelector('.js_in_search_race');
let valueSearchDesc = '';
let valueSearchRace = '';
const labelSearch = document.querySelector(".error_search");

//variable de boton añadir
const btnAdd = document.querySelector(".js-btn-add");
//variable de boton cancelar
const btonCancel = document.querySelector(".js-btn-cancel");

//Constantes para mostrar/ocultar el formulario
const formAddCat = document.querySelector(".js-new-form");
const btn = document.querySelector(".js-cross");

//mensaje de error
const labelMesageError = document.querySelector(".js-label-error");

//const de los input
const inputDesc = document.querySelector(".js-input-desc");
const inputPhoto = document.querySelector(".js-input-photo");
const inputName = document.querySelector(".js-input-name");
const inputRace = document.querySelector(".js-input-race");
let valueDesc = inputDesc.value;
let valuePhoto = inputPhoto.value;
let valueName = inputName.value;
let valueRace = inputRace.value;

// variable para almacenar los gatitos que se encuentren el local storage
const kittenListStored = JSON.parse(localStorage.getItem("kittensList"));

if (kittenListStored !== null) {
  kittenDataList = kittenListStored;
  renderKittenList(kittenDataList);

} else {
  fetch(SERVER_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      kittenDataList = data.results;
      console.log(kittenDataList);
      renderKittenList(kittenDataList);
      localStorage.setItem("kittensList", JSON.stringify(kittenDataList));
    })
    .catch((error) => {
      console.error(error);
    });
}

//validar la raza
///echarle un ojo, no repetir el h4, incluir solo texto
function renderRace(race) {
  if (race === "") {
    race = 'No se ha especificado la raza';
  } else {
    race = race;
  }
  console.log(typeof race);
  return race;
}

//para pintar cada gato
function renderKitten(kittenData) {
  kittenData.race = renderRace(kittenData.race);
  const liElement = document.createElement('li');
  const imgElement = document.createElement('img');
  const h3Element = document.createElement('h3');
  const h4Element = document.createElement('h4');
  const textElement = document.createElement('p');
  liElement.appendChild(imgElement);
  liElement.appendChild(h3Element);
  liElement.appendChild(h4Element);
  liElement.appendChild(textElement);
  imgElement.setAttribute('src', kittenData.image);
  imgElement.setAttribute('alt', "gatito");
  const h3Text = document.createTextNode(kittenData.name);
  const raceText = document.createTextNode(kittenData.race);
  const textDesc = document.createTextNode(kittenData.desc);
  h3Element.appendChild(h3Text);
  h4Element.appendChild(raceText);
  textElement.appendChild(textDesc);
  liElement.setAttribute('class', 'card');
  imgElement.setAttribute('class', 'card_img');
  h3Element.setAttribute('class', 'card_title');
  h4Element.setAttribute('class', 'card_race');
  textElement.setAttribute('class', 'card_description');
  listKitten.appendChild(liElement);


  /*const htmlKitten = `<li class="card"><img class="card_img"src=${kittenData.image} alt="gatito"/><h3 class="card_title">${kittenData.name}</h3>${kittenData.race}<p class="card_description"> ${kittenData.desc}</p></li>`;*/

}

//funcion para pintar la lista de gatos
function renderKittenList(kittenDataList) {
  for (const kitten of kittenDataList) {
    renderKitten(kitten);
    /*listKitten.innerHTML += htmlKitten;*/
  }
}
//búsqueda por descripción
function filterKitten(event) {
  event.preventDefault();
  valueSearchDesc = input_search_desc.value;//mirar esto
  valueSearchRace = input_search_race.value;
  console.log(kittenDataList);
  if (valueSearchDesc === "" || valueSearchRace === "") {
    labelSearch.innerHTML = "Debe rellenar todos los valores.";
  }
  const searchedKitten = kittenDataList.filter(filterFunction);
  listKitten.innerHTML = "";
  renderKittenList(searchedKitten);
  console.log(searchedKitten);
}

function filterFunction(kitten) {
  if (
    kitten.desc.includes(valueSearchDesc) &&
    kitten.race.includes(valueSearchRace)
  ) {
    return kitten;
  }
}

searchBtn.addEventListener("click", filterKitten);

//evento de click en añadir
function addNewKitten(event) {
  event.preventDefault();
  if (
    inputDesc.value === "" ||
    inputPhoto.value === "" ||
    inputName.value === ""
  ) {
    labelMesageError.innerHTML = "Debe rellenar todos los valores.";
  } else {
    const newKittenDataObject = {
      name: inputName.value,
      desc: inputDesc.value,
      image: inputPhoto.value,
      race: inputRace.value,
    };
    fetch(`https://dev.adalab.es/api/kittens/${GITHUB_USER}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newKittenDataObject),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success !== null) {
          kittenDataList.push(newKittenDataObject);
          cleanInput();
          console.log(newKittenDataObject);
          labelMesageError.innerHTML = "Mola! Un nuevo gatito en Adalab!";
          listKitten.innerHTML = "";
          renderKittenList(kittenDataList);
          localStorage.setItem("kittensList", JSON.stringify(kittenDataList));
        } else {
          console.log("ha habido un error");
        }
      });
  }
}

function cleanInput() {
  inputDesc.value = "";
  inputPhoto.value = "";
  inputName.value = "";
  inputRace.value = "";
}

btnAdd.addEventListener("click", addNewKitten);

//Cancelar formulario

const cancelNewKitten = (event) => {
  event.preventDefault();
  cleanInput();
  formAddCat.classList.add("collapsed");
};

btonCancel.addEventListener("click", cancelNewKitten);

//Funciones para mostrar/oculta el menú de añadir gatito
function showNewCatForm() {
  formAddCat.classList.remove("collapsed");
}

function hideNewCatForm() {
  formAddCat.classList.add("collapsed");
}
//función que irá con el evento de click y que tiene el "if"
function handleClickNewCatForm(event) {
  event.preventDefault();
  if (formAddCat.classList.contains("collapsed")) {
    showNewCatForm();
  } else {
    hideNewCatForm();
  }
}

//evento de escucha con eventhandler
btn.addEventListener("click", handleClickNewCatForm);
