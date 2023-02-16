let currentPokemon;
let currentPokemonName;
let currentPokemonArtwork;
let currentPokemonNumber;
let currentPokemonType1;
let currentPokemonType2;
let currentPokemonGerman;


let pokemonSpeciesAsJson;
let pokemonEvolutionAsJson;


let backgroundColors1 = [{ 'normal': '#BBBBAA', 'fire': '#F4563A', 'water': '#3399FF', 'grass': '#77CC55', 'flying': '#6699FF', 'fighting': '#BB5544', 'poison': '#AA5599', 'electric': '#FFCC33', 'ground': '#DDBB55', 'rock': '#BBAA66', 'psychic': '#FF5599', 'ice': '#83D4EF', 'bug': '#AABB22', 'ghost': '#6666BB', 'steel': '#AAAABB', 'dragon': '#7766EE', 'dark': '#775544', 'fairy': '#FFAAFF' }];
let backgroundColors2 = [{ 'normal': '#a7a7a7', 'fire': '#fa8975', 'water': '#7bbdff', 'grass': '#a8f888', 'flying': '#c3d7ff', 'fighting': '#e99687', 'poison': '#eb8ed8', 'electric': '#694f00', 'ground': '#775f15', 'rock': '#817647', 'psychic': '#ffadce', 'ice': '#daf6ff', 'bug': '#dce97d', 'ghost': '#31315e', 'steel': '#d6d6d6', 'dragon': '#411692', 'dark': '#1f130d', 'fairy': '#fde4fd' }];


let pokemonRenderd = 31;
let renderedPokemonNames = [];


let pokemonStats = [];
let pokemonMovesJSON = [];


//Configuration for Base Stats Chart//
const CONFIG_BG_COLOR = [
    'rgba(75, 192, 192, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
];

const CONFIG_BORDER_COLOR = [
    'rgba(75, 192, 192, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
]


function renderPokemon() {
    renderPokemonInfo();
    renderPokemonDescription();
}


function upperCaseFirstLetter(someWord) {
    let firstLetter = String(someWord.charAt(0)).toLocaleUpperCase();
    upperCaseWord = firstLetter + someWord.slice(1);
    return upperCaseWord;
}


function likePokemon() {
    let currentHeart = document.getElementById('heart').src;
    if (currentHeart == 'http://127.0.0.1:5500/icons/herz.png') {
        document.getElementById('heart').src = 'icons/herz-ausgefüllt.png';
    } else {
        document.getElementById('heart').src = 'icons/herz.png';
    }

}

async function renderPokemonEntrie(ID) {
    renderPokemonEntrieHTML();

    let pokemonSpecies = `https://pokeapi.co/api/v2/pokemon-species/${ID}/`;                
    let pokemonSpeciesResponse = await fetch(pokemonSpecies);
    pokemonSpeciesAsJson = await pokemonSpeciesResponse.json(); // Species API              

    let currentPokemonName = pokemonSpeciesAsJson['name'];                                  
    document.title = `Pokedex || ${currentPokemonName}`;
    /////////////////////////////
    let url = `https://pokeapi.co/api/v2/pokemon/${currentPokemonName}`;
    let response = await fetch(url);                                                        
    currentPokemon = await response.json(); //General API

    loadPokemonEvolutions();
    renderPokemon();
}


function renderAllPokemon() {
    renderAllPokemonHTML();
    document.getElementById('all-pokemon').innerHTML = '';
    for (let i = 1; i < pokemonRenderd; i++) {
        let ii = i + 1000;
        renderPokemonCardHTML(i, ii);
        loadPokemonSpecies(i, ii);
    }
    document.getElementById('load-more-btn').style = "display:block;"
}


async function loadPokemonSpecies(i, ii) {
    let pokemonSpecies = `https://pokeapi.co/api/v2/pokemon-species/${i}/`;
    let pokemonSpeciesResponse = await fetch(pokemonSpecies);
    let allPokemonSpeciesAsJson = await pokemonSpeciesResponse.json(); // Species API
    loadPokemonCardImgAndTypes(allPokemonSpeciesAsJson, i, ii);
}


function render50MorePokemon() {
    let pokemonAmount = pokemonRenderd;
    pokemonRenderd = pokemonAmount + 50;
    if (pokemonRenderd < 807) {
        renderMorePokemon(pokemonAmount);
    } else { }
}


function renderMorePokemon(pokemonAmount) {
    for (let i = pokemonAmount; i < pokemonRenderd; i++) {
        let ii = i + 1000;
        renderPokemonCardHTML(i, ii);
        loadPokemonSpecies(i, ii);
    }
}


async function loadPokemonCardImgAndTypes(allPokemonSpeciesAsJson, i, ii) {
    let onePokemon = allPokemonSpeciesAsJson['name'];
    renderedPokemonNames.push({ onePokemon, i });
    let onePokemonUpperCase = upperCaseFirstLetter(onePokemon)
    document.getElementById(`pokemon-card-name${i}`).innerHTML = onePokemonUpperCase;
    let url = `https://pokeapi.co/api/v2/pokemon/${onePokemon}`;
    let response = await fetch(url);
    let onePokemonApi = await response.json(); //General API
    let onePokemonImg = onePokemonApi['sprites']['other']['official-artwork']['front_default'];
    document.getElementById(`pokemon-crad-img${i}`).src = onePokemonImg;
    getPokemonCardTypes(onePokemonApi, i, ii)
}


function getPokemonCardTypes(onePokemonApi, i, ii) {
    if (onePokemonApi['types'].length == 2) {
        PokemonWithCardTwoTypes(onePokemonApi, i, ii);
    } else {
        PokemonWithCardOneType(onePokemonApi, i, ii);
    }
}


function PokemonWithCardTwoTypes(onePokemonApi, i, ii) {
    let onePokemonType1 = onePokemonApi['types']['0']['type']['name'];
    document.getElementById(`${i}pokemon-card-type1`).innerHTML = onePokemonType1;

    let onePokemonType2 = onePokemonApi['types']['1']['type']['name'];
    document.getElementById(`${ii}pokemon-card-type2`).innerHTML = onePokemonType2;
    let backgroundColor1 = backgroundColors1[0][onePokemonType1];
    let backgroundColor2 = backgroundColors2[0][onePokemonType2];
    document.getElementById(`pokemon-card${i}`).style = `background-image: linear-gradient(115deg, ${backgroundColor1}, ${backgroundColor2})`;
}


function PokemonWithCardOneType(onePokemonApi, i, ii) {
    let onePokemonType1 = onePokemonApi['types']['0']['type']['name'];
    document.getElementById(`${i}pokemon-card-type1`).innerHTML = onePokemonType1;

    document.getElementById(`${ii}pokemon-card-type2`).style = "display:none;";
    let backgroundColor1 = backgroundColors1[0][onePokemonType1];
    let backgroundColor2 = backgroundColors2[0][onePokemonType1];
    document.getElementById(`pokemon-card${i}`).style = `background-image: linear-gradient(115deg, ${backgroundColor1}, ${backgroundColor2})`;
}


function searchPokemon() {
    document.getElementById('load-more-btn').style = "display:none;"
    search = getInputValue();
    if (search == '') {
        renderAllPokemon();
    } else {
        renderPokemonWithInputValue();
    }
}


function getInputValue() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    return search
}


function renderPokemonWithInputValue() {
    document.getElementById('all-pokemon').innerHTML = '';
    for (let j = 0; j < renderedPokemonNames.length; j++) {
        if (renderedPokemonNames[`${j}`]['onePokemon'].includes(search)) {
            let i = renderedPokemonNames[`${j}`]['i'];
            let ii = i + 1000;
            renderSearchedPokemon(i, ii)
        } else { }
    }
}


function renderSearchedPokemon(i, ii) {
    renderPokemonCardHTML(i, ii);
    loadSearchedPokemonSpecies(i, ii);
}


async function loadSearchedPokemonSpecies(i, ii) {
    let pokemonSpecies = `https://pokeapi.co/api/v2/pokemon-species/${i}/`;
    let pokemonSpeciesResponse = await fetch(pokemonSpecies);
    let allPokemonSpeciesAsJson = await pokemonSpeciesResponse.json(); // Species API
    loadSearchedPokemonCardImgAndTypes(allPokemonSpeciesAsJson, i, ii);
}


async function loadSearchedPokemonCardImgAndTypes(allPokemonSpeciesAsJson, i, ii) {
    let onePokemon = allPokemonSpeciesAsJson['name'];
    let onePokemonUpperCase = upperCaseFirstLetter(onePokemon)
    document.getElementById(`pokemon-card-name${i}`).innerHTML = onePokemonUpperCase;
    let url = `https://pokeapi.co/api/v2/pokemon/${onePokemon}`;
    let response = await fetch(url);
    let onePokemonApi = await response.json(); //General API
    let onePokemonImg = onePokemonApi['sprites']['other']['official-artwork']['front_default'];
    document.getElementById(`pokemon-crad-img${i}`).src = onePokemonImg;
    getPokemonCardTypes(onePokemonApi, i, ii)
}