const pokemonList = document.getElementById('pokemonList')
const loadMore = document.getElementById('loadMore')
const maxRecord = 151
const limit = 4
let offset = 0

function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => { 
         
        const newHtml = pokemons.map((pokemon) => ` 
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" 
                        alt="${pokemon.name}">                           
                </div>
                <div class="detail-stats">
                    <ol class="stats">
                        ${pokemon.stats.map((stat) => `<li class="status ${stat.name}">${stat.name}: ${stat.base_stat}</li>`).join('')}
                    </ol>    
                </div>       
            </li>  
        `).join('')
        pokemonList.innerHTML += newHtml

    })
}

loadPokemonItens(offset, limit)

loadMore.addEventListener('click', () => {
    offset += limit

    const qtdRecord = offset + limit

    if(qtdRecord >= maxRecord){
        const newLimit = maxRecord - offset
        loadPokemonItens(offset, newLimit)

        loadMore.parentElement.removeChild(loadMore)
    } else {
        loadPokemonItens(offset, limit)
    }

})


    
