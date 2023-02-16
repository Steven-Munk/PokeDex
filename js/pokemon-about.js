async function renderPokemonDescription() {
    renderAboutSection();
    renderEnglishDescription();
    renderGeneralInfos();
}


function renderEnglishDescription() {
    for (let i = 10; i < 25; i++) { // 15 descriptions will be checked to find an english one
        if (descriptionIsInEnglish(i)) {
            displayEnglishDescription(i);
        } else { }
    }
}


function renderGeneralInfos() {
    renderAbilities();
    renderPokemonWeight();
    checkAndRenderIfLegendary();
    renderGenera();
    renderShape();
}


/*********************************************HELP FUNCTIONS v**************************************************/

function descriptionIsInEnglish(i) {
    return pokemonSpeciesAsJson['flavor_text_entries'][`${i}`]['language']['name'] == 'en'
}


function displayEnglishDescription(i) {
    let pokemonDescription = pokemonSpeciesAsJson['flavor_text_entries'][`${i}`]['flavor_text'];
    document.getElementById('pokemon-description').innerHTML = pokemonDescription;
}


function renderAbilities() {
    // get first ability
    let firstAbility = upperCaseFirstLetter(currentPokemon['abilities']['0']['ability']['name'])
    document.getElementById('ability-1').innerHTML = firstAbility;

    // if there is a second ability, get that too
    if (currentPokemon['abilities']['1']) {
        let secondAbility = upperCaseFirstLetter(currentPokemon['abilities']['1']['ability']['name'])
        document.getElementById('ability-2').innerHTML = secondAbility;
    } else {
        document.getElementById('ability-2').innerHTML = '';
    }
}


function renderPokemonWeight() {
    let pokemonWeight = + (currentPokemon['weight'] / 10)
    document.getElementById('weight').innerHTML = `${pokemonWeight} Kg`;
}


function checkAndRenderIfLegendary() {
    if (pokemonSpeciesAsJson['is_legendary'] == true) {
        document.getElementById('legendary').innerHTML = 'Yes';
    } else {
        document.getElementById('legendary').innerHTML = 'No';
    }
}


function renderGenera() {
    document.getElementById('genera').innerHTML = pokemonSpeciesAsJson['genera']['7']['genus'];
}


function renderShape() {
    let shape = upperCaseFirstLetter(pokemonSpeciesAsJson['shape']['name'])
    document.getElementById('shape').innerHTML = shape;
}


function renderAboutSection() {
    highlightAbout();
    renderAboutHTML();
}


function highlightAbout() {
    document.getElementById('base-stats-link').classList.remove('nav-bar-link-active');
    document.getElementById('about-link').classList.add('nav-bar-link-active');
    document.getElementById('evolution-link').classList.remove('nav-bar-link-active');
    document.getElementById('moves-link').classList.remove('nav-bar-link-active');
}