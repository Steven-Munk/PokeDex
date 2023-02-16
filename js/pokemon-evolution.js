async function renderPokemonEvolutions() {
    loadEvolutionSection();
    renderPokemonFirstStage();
    checkIfThereIsMoreThanOneStage();
}


async function checkIfThereIsMoreThanOneStage() {
    if (pokemonHasMoreThanOneStage()) {
        renderSecondStagePokemon();
        if (pokemonHasMoreThanTwoStages()) {
            renderThirdStagePokemon();
        } else {
            noThirdStage();
        }
    } else {
        noSecondOrThirdStage();
    }
}


function renderPokemonFirstStage() {
    renderFirstStageImg();
    getFirstEvolutionName();
}


function renderSecondStagePokemon() {
    renderSecondStageImg();
    getSecondEvolutionName();
    getTriggerForFirstEvolution();
}


function renderThirdStagePokemon() {
    renderThirdStageImg();
    getThirdEvolutionName();
    getTriggerForSecondEvolution();
}


/*********************************************HELP FUNCTIONS v**************************************************/

async function loadPokemonEvolutions() {
    let pokemonEvolutionURL = pokemonSpeciesAsJson['evolution_chain']['url'];
    let pokemonEvolutionResponse = await fetch(pokemonEvolutionURL);
    pokemonEvolutionAsJson = await pokemonEvolutionResponse.json(); // Evolution API
}


async function renderFirstStageImg() {
    let pokemonStage1 = pokemonEvolutionAsJson['chain']['species']['name'];
    let evolution1URL = `https://pokeapi.co/api/v2/pokemon/${pokemonStage1}`;
    let evolution1Response = await fetch(evolution1URL);
    evolution1AsJSON = await evolution1Response.json();
    let evolution1Artwork = evolution1AsJSON['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('evolution-1').src = evolution1Artwork;
}


function getFirstEvolutionName() {
    let firstLetter = String(pokemonEvolutionAsJson['chain']['species']['name'].charAt(0)).toLocaleUpperCase();
    firstEvolutionName = firstLetter + pokemonEvolutionAsJson['chain']['species']['name'].slice(1);
    document.getElementById('first-evolution-name').innerHTML = firstEvolutionName;
}


function pokemonHasMoreThanOneStage() {
    return pokemonEvolutionAsJson['chain']['evolves_to'].hasOwnProperty(0)
}


async function renderSecondStageImg() {
    let pokemonStage2 = pokemonEvolutionAsJson['chain']['evolves_to']['0']['species']['name'];
    let evolution2URL = `https://pokeapi.co/api/v2/pokemon/${pokemonStage2}`;
    let evolution2Response = await fetch(evolution2URL);
    evolution2AsJSON = await evolution2Response.json();
    let evolution2Artwork = evolution2AsJSON['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('evolution-2').src = evolution2Artwork;
}


function getSecondEvolutionName() {
    let firstLetter = String(pokemonEvolutionAsJson['chain']['evolves_to']['0']['species']['name'].charAt(0)).toLocaleUpperCase();
    secondEvolutionName = firstLetter + pokemonEvolutionAsJson['chain']['evolves_to']['0']['species']['name'].slice(1);
    document.getElementById('second-evolution-name').innerHTML = secondEvolutionName;
}


function getTriggerForFirstEvolution() {
    let evolutionTrigger = pokemonEvolutionAsJson['chain']['evolves_to']['0']['evolution_details']['0']['trigger']['name'];
    let evolutionTriggerPoint = pokemonEvolutionAsJson['chain']['evolves_to']['0']['evolution_details']['0'];

    if (evolutionTrigger == 'level-up') {
        if (evolutionTriggerPoint['min_level']) {
            let minLvl = evolutionTriggerPoint['min_level'];
            document.getElementById('first-evolution').innerHTML = `Lvl. ${minLvl}`;
        } else {
            let minFriendship = evolutionTriggerPoint['min_happiness'];
            document.getElementById('first-evolution').innerHTML = `Friendship of ${minFriendship}`;
        }
    } else {
        if (evolutionTrigger == 'trade') {
            document.getElementById('first-evolution').innerHTML = `After a Trade`;
        } else {
            if (evolutionTrigger == 'use-item') {
                let neededItem = evolutionTriggerPoint['item']['name'];
                document.getElementById('first-evolution').innerHTML = `Use ${neededItem}`;
            }
        }
    }
}


function pokemonHasMoreThanTwoStages() {
    return pokemonEvolutionAsJson['chain']['evolves_to']['0']['evolves_to'].hasOwnProperty(0)
}


async function renderThirdStageImg() {
    let pokemonStage3 = pokemonEvolutionAsJson['chain']['evolves_to']['0']['evolves_to']['0']['species']['name'];
    let evolution3URL = `https://pokeapi.co/api/v2/pokemon/${pokemonStage3}`;
    let evolution3Response = await fetch(evolution3URL);
    evolution3AsJSON = await evolution3Response.json();
    let evolution3Artwork = evolution3AsJSON['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('evolution-3').src = evolution3Artwork;
}


function getThirdEvolutionName() {
    let firstLetter = String(pokemonEvolutionAsJson['chain']['evolves_to']['0']['evolves_to']['0']['species']['name'].charAt(0)).toLocaleUpperCase();
    thirdEvolutionName = firstLetter + pokemonEvolutionAsJson['chain']['evolves_to']['0']['evolves_to']['0']['species']['name'].slice(1);
    document.getElementById('third-evolution-name').innerHTML = thirdEvolutionName;
}


function getTriggerForSecondEvolution() {
    let evolutionTrigger = pokemonEvolutionAsJson['chain']['evolves_to']['0']['evolves_to']['0']['evolution_details']['0']['trigger']['name'];
    let evolutionTriggerPoint = pokemonEvolutionAsJson['chain']['evolves_to']['0']['evolves_to']['0']['evolution_details']['0'];

    if (evolutionTrigger == 'level-up') {
        if (evolutionTriggerPoint['min_level']) {
            let minLvl = evolutionTriggerPoint['min_level'];
            document.getElementById('second-evolution').innerHTML = `Lvl. ${minLvl}`;
        } else {
            let minFriendship = evolutionTriggerPoint['min_happiness'];
            document.getElementById('second-evolution').innerHTML = `Friendship of ${minFriendship}`;
        }
    } else {
        if (evolutionTrigger == 'trade') {
            document.getElementById('second-evolution').innerHTML = `After a Trade`;
        } else {
            if (evolutionTrigger == 'use-item') {
                let neededItem = evolutionTriggerPoint['item']['name'];
                document.getElementById('second-evolution').innerHTML = `Use ${neededItem}`;
            }
        }
    }
}


function noThirdStage() {
    document.getElementById('evolution-3').src = '';
    let unnecessaryItems = ['second-ev-trigger', 'third-evolution-name', 'third-evolution-container',];
    for (let i = 0; i < unnecessaryItems.length; i++) {
        const id = unnecessaryItems[i];
        document.getElementById(`${id}`).style = 'display:none;';
    }
}


function noSecondOrThirdStage() {
    document.getElementById('evolution-2').src = '';
    document.getElementById('evolution-3').src = '';
    let unnecessaryItems = ['first-ev-arrow', 'second-evolution-name', 'second-evolution-container', 'second-ev-trigger', 'third-evolution-name', 'third-evolution-container',];
    for (let i = 0; i < unnecessaryItems.length; i++) {
        const id = unnecessaryItems[i];
        document.getElementById(`${id}`).style = 'display:none;';
    }
    document.getElementById('first-evolution').innerHTML = 'No Futher Evolution'
}


function loadEvolutionSection() {
    highlightEvolution();
    loadEvolutionHTML();
}


function highlightEvolution() {
    document.getElementById('base-stats-link').classList.remove('nav-bar-link-active');
    document.getElementById('about-link').classList.remove('nav-bar-link-active');
    document.getElementById('evolution-link').classList.add('nav-bar-link-active');
    document.getElementById('moves-link').classList.remove('nav-bar-link-active');
}