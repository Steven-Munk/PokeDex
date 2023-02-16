function renderPokemonMoves() {
    getMovesSection();
    getAllLvlLearnedMoves();
    sortAllMovesByLvl();
    displayPokemonMoves();
}


function getAllLvlLearnedMoves() {
    let allPokemonMoves = currentPokemon['moves'];
    for (let i = 0; i < allPokemonMoves.length; i++) {
        const oneMoveArray = allPokemonMoves[i];

        let oneMoveLowerCase = oneMoveArray['move']['name'];
        let oneMove = upperCaseFirstLetter(oneMoveLowerCase);
        let learnsOnLvl = oneMoveArray['version_group_details']['0']['level_learned_at'];

        if (learnsOnLvl > 0) {
            pokemonMovesJSON.push({ 'lvl': `${learnsOnLvl}`, 'move': `${oneMove}` });
        } else { }
    }
}


function sortAllMovesByLvl() {
    pokemonMovesJSON.sort(function (a, b) {
        return parseFloat(a.lvl) - parseFloat(b.lvl);
    });
}


function displayPokemonMoves() {
    for (let i = 0; i < pokemonMovesJSON.length; i++) {
        let oneMove = pokemonMovesJSON[`${i}`]['move'];
        let learnsOnLvl = pokemonMovesJSON[`${i}`]['lvl'];
        document.getElementById('lvl-table').innerHTML += `
        <tr>
            <td>
            ${oneMove}
            </td>
            <td>
            ${learnsOnLvl}
            </td>
        </tr>
        `;
    }
    pokemonMovesJSON = [];
}


function getMovesSection() {
    highlightMoves();
    getMovesHTML();
}


function highlightMoves() {
    document.getElementById('base-stats-link').classList.remove('nav-bar-link-active');
    document.getElementById('about-link').classList.remove('nav-bar-link-active');
    document.getElementById('evolution-link').classList.remove('nav-bar-link-active');
    document.getElementById('moves-link').classList.add('nav-bar-link-active');
}