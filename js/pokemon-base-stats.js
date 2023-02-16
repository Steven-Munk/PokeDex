function renderBaseStats() {
    getBaseStatsSection();
    getAPIData();
    drawChart();
}


function getAPIData() {

    let allPokemonStats = currentPokemon['stats'];
    for (let i = 0; i < 6; i++) {
        let singlePokemonStat = allPokemonStats[`${i}`]['base_stat'];
        pokemonStats.push(singlePokemonStat);
    }

}


function drawChart() {  // From 'Chart.js'
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP.', 'Atk.', 'Def.', 'Sp-Atk.', 'Sp-Def.', 'Init'],
            datasets: [{
                label: 'Pokemon Base HP',
                data: pokemonStats,
                backgroundColor: CONFIG_BG_COLOR,
                borderColor: CONFIG_BORDER_COLOR,
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


function getBaseStatsSection() {
    highlightBaseStats();
    getBaseStatsHTML();
}


function highlightBaseStats() {
    document.getElementById('base-stats-link').classList.add('nav-bar-link-active');
    document.getElementById('about-link').classList.remove('nav-bar-link-active');
    document.getElementById('evolution-link').classList.remove('nav-bar-link-active');
    document.getElementById('moves-link').classList.remove('nav-bar-link-active');
}