function renderPokemonInfo() {
    getMainPokemonArtwork();
    getPokemonName();
    getPokemonTypes();
    getPokemonNumber();
    getGermanName();
}


function getMainPokemonArtwork() {
    currentPokemonArtwork = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('pokemonArtwork').src = currentPokemonArtwork;
}


function getPokemonName() {
    document.getElementById('pokemonName').innerHTML = upperCaseFirstLetter(currentPokemon['name']);
}


function getPokemonTypes() {
    currentPokemonType1 = currentPokemon['types']['0']['type']['name'];
    if (pokemonHasOnlyOneType()) {
        renderpokemonWithOneType();
    } else {
        renderpokemonWithTwoTypes();
    }
}


function pokemonHasOnlyOneType() {
    return currentPokemon['types'].length == 1
}


function renderpokemonWithOneType() {
    document.getElementById('pokemonFirstType').innerHTML = currentPokemonType1;
    setBackgroundForOneType();
}


function renderpokemonWithTwoTypes() {
    document.getElementById('pokemonFirstType').innerHTML = currentPokemonType1;
    currentPokemonType2 = currentPokemon['types']['1']['type']['name'];
    document.getElementById('pokemonSecondType').innerHTML = currentPokemonType2;
    document.getElementById('pokemonSecondType').style = 'display:block;'
    setBackgroundForTwoTypes();
}


function setBackgroundForOneType() {
    let backgroundColor1 = backgroundColors1[0][currentPokemonType1];
    let backgroundColor2 = backgroundColors2[0][currentPokemonType1];
    document.getElementById('certain-pokemon').style = `background-image: linear-gradient(115deg, ${backgroundColor1}, ${backgroundColor2})`;
}


function setBackgroundForTwoTypes() {
    let backgroundColor1 = backgroundColors1[0][currentPokemonType1];
    let backgroundColor2 = backgroundColors1[0][currentPokemonType2];
    document.getElementById('certain-pokemon').style = `background-image: linear-gradient(115deg, ${backgroundColor1}, ${backgroundColor2})`;
}


function getPokemonNumber() {
    if (currentPokemon['id'] < 10) { //Pokemon Number is one Digit 
        currentPokemonNumber = `#00${currentPokemon['id']}`;
    } else {
        if (currentPokemon['id'] >= 10 && currentPokemon['id'] < 100) { //Pokemon Number are two Digits 
            currentPokemonNumber = `#0${currentPokemon['id']}`;
        } else {
            if (currentPokemon['id'] >= 100) { //Pokemon Number are three Digits
                currentPokemonNumber = `#${currentPokemon['id']}`;
            }
        }
    }
    document.getElementById('pokemonNumber').innerHTML = currentPokemonNumber;
}


async function getGermanName() {
    currentPokemonGerman = pokemonSpeciesAsJson['names'][5]['name'];
    document.getElementById('germanPokemonName').innerHTML = currentPokemonGerman;
}