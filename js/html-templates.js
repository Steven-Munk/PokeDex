function renderAllPokemonHTML() {
    document.getElementById('body').innerHTML = '';
    document.getElementById('body').innerHTML = `
    <screen id="screen">
        <div class="head-btn">
            <input placeholder="Search a Pokemon..." type="text" id="search" oninput="searchPokemon()">
            <img class="pokeball" src="icons/pokeball.png">
            <img src="icons/menu.png">
        </div>
        <div class="h1-container">
            <h1>Pokedex</h1>
        </div>
        <div id="all-pokemon" class="pokemon"></div>
        <button id="load-more-btn" class="load-more-btn" onclick="render50MorePokemon()">Render 50 more Pokemon!</button>
    </screen>
    `;
}


function renderPokemonCardHTML(i, ii) {
    document.getElementById('all-pokemon').innerHTML += `        
    <div onclick="renderPokemonEntrie(${i})" id="pokemon-card${i}" class="pokemon-card">
        <span id="pokemon-card-name${i}" class="pokemon-card-name"></span>
        <div class="pokemon-card-content">
            <div class="pokemon-card-text">
                <span id="${i}pokemon-card-type1" class="pokemon-card-type"></span>
                <span id="${ii}pokemon-card-type2" class="pokemon-card-type"></span>
            </div>
            <img id="pokemon-crad-img${i}" class="pokemon-card-img" src="">
        </div>
        <img class="pokemon-card-pokeball" src="icons/pokeball.png">
    </div>`;
}


function renderPokemonEntrieHTML() {
    document.getElementById('body').innerHTML = '';
    document.getElementById('body').innerHTML = `
    <header id="certain-pokemon">
    <div class="pokemon-header-text">
        <div class="pokemon-header-text-left">
                <img onclick="renderAllPokemon()" class="back-arrow" src="icons/pfeil-links.png">
            <h1 id="pokemonName"></h1>
            <div class="pokemon-header-types">
                <p id="pokemonFirstType" class="pokemon-header-type"></p>
                <p id="pokemonSecondType" style="display:none;" class="pokemon-header-type"></p>
            </div>
        </div>
        <div class="pokemon-header-text-right">
            <img onclick="likePokemon()" id="heart" src="icons/herz.png">
            <p id="pokemonNumber" class="pokemon-header-number"></p>
            <p id="germanPokemonName" class="pokemon-header-animal"></p>
        </div>
    </div>
    <img id="pokemonArtwork" src="">
</header>
<div class="info-container">
    <div class="nav-bar">
        <p id="about-link" class="nav-bar-link nav-bar-link-active" onclick="renderPokemonDescription()">About</p>
        <p id="base-stats-link" class="nav-bar-link" onclick="renderBaseStats()">Base Stats</p>
        <p id="evolution-link" class="nav-bar-link" onclick="renderPokemonEvolutions()">Evolution</p>
        <p id="moves-link" class="nav-bar-link" onclick="renderPokemonMoves()">Moves</p>
    </div>
    <div id="content-container"></div>
</div>
`;
}


function renderAboutHTML() {
    document.getElementById('content-container').innerHTML = `
        <div id="pokemon-description"></div>
        <table class="about-table">
            <tr>
                <td class="td-left">
                    Abilities
                </td>
                <td class="td-right">
                    <p id="ability-1"></p>
                    <p id="ability-2">Ability2</p>
                </td>
            </tr>
            <tr>
                <td class="td-left">
                    Weight
                </td>
                <td class="td-right" id="weight">
                </td>
            </tr>
            <tr>
                <td class="td-left">
                    Legendary
                </td>
                <td class="td-right" id="legendary">
                </td>
            </tr>
            <tr>
                <td class="td-left">
                    Genera
                </td>
                <td class="td-right" id="genera">
                </td>
            </tr>
            <tr>
                <td class="td-left">
                    Shape
                </td>
                <td class="td-right" id="shape">
                </td>
            </tr>
        </table>
        <div class="box about-box"></div>
    `;
}


function getBaseStatsHTML() {
    document.getElementById('content-container').innerHTML = `
    <div id="base-stats">
    <canvas id="myChart" width="400" height="400"></canvas>
    <div class="box"></div>
    </div>
`;
}


function loadEvolutionHTML() {
    document.getElementById('content-container').innerHTML = '';
    document.getElementById('content-container').innerHTML = `
    <div class="evolution-container">
        <div style="text-align: center;">
            <div id="first-evolution-name" class="evolution-name"></div>
            <div class="evolution-img-container">
                <img id="evolution-1" class="evolution-img" src="">
                <img class="evolution-img-background" src="icons/pokeball.png">
            </div>
        </div>
        <div class="evolution-trigger evt-1">
            <div id="first-evolution"></div>
            <img id="first-ev-arrow" class="first-ev-arrow" src="icons/pfeil-runter.png">
            <img class="first-ev-arrow-right" src="icons/pfeil-rechts.png">
        </div>
        <div style="text-align: center;">
            <div id="second-evolution-name" class="evolution-name sen"></div>
            <div id="second-evolution-container" class="evolution-img-container evic2">
                <img id="evolution-2" class="evolution-img" src="">
                <img class="evolution-img-background" src="icons/pokeball.png">
            </div>
        </div>
        <div id="second-ev-trigger" class="evolution-trigger evt-2">
            <div id="second-evolution"></div>
            <img class="first-ev-arrow" src="icons/pfeil-runter.png">
            <img class="first-ev-arrow-right" src="icons/pfeil-rechts.png">
        </div>
        <div style="text-align: center;">
            <div id="third-evolution-name" class="evolution-name ten"></div>
            <div id="third-evolution-container" class="evolution-img-container evic3">
                <img id="evolution-3" class="evolution-img" src="">
                <img class="evolution-img-background" src="icons/pokeball.png">
            </div>
        </div>
    </div>
    `;
}


function getMovesHTML() {
    document.getElementById('content-container').innerHTML = '';
    document.getElementById('content-container').innerHTML = `
    <div id="moves">
        <h2>Attacks through Lvl-Up</h2>
        <table id="lvl-table">
        </table>
        <div class="box"></div>
    </div>    
    `;
}