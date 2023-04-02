const pokemonList = document.getElementById('pokemonList')
const loadMore = document.getElementById('loadMore')
const maxRecord = 151
const limit = 4
let offset = 0

/*  Primeira forma
    fetch(url)
    .then(function (response) {
        response.json().then(function (responseBody) {
            console.log(responseBody)
        })
    })
    .catch(function (error) {
        console.log(error)
    })
    .finally(function (){
        console.log('Requisição concluída!')
    }) 
*/



// function loadPokemonItens(offset, limit) {
//     function convertPokemonToHTML(pokemon) {
    // return ` 
    //     <li class="pokemon ${pokemon.type}">
    //         <span class="number">#${pokemon.number}</span>
    //         <span class="name">${pokemon.name}</span>
            
    //         <div class="detail">
    //             <ol class="types">
    //                 ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
    //             </ol>
    //             <img src="${pokemon.photo}" 
    //                 alt="${pokemon.name}">
    //         </div>       
    //     </li>  
    // `
// }

function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => { 

        // const newList = pokemons.map((pokemon) => convertPokemonToHTML(pokemon))
        // const newHtml = newList.join('')
        // const newList = pokemons.map(convertPokemonToHTML).join('')
        // pokemonList.innerHTML += newHtml
       
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
            </li>  
        `).join('')
        pokemonList.innerHTML += newHtml

        // const listaItens = []
        // debugger // permite debugar o código no browser no nodeJs
        // console.log(pokemonList)

        // for (let i = 0 i < pokemons.length i++) {
        //     const pokemon = pokemons[i]
        //     // listaItens.push(convertPokemonToHTML(pokemon)) 
        //     pokemonList.innerHTML += convertPokemonToHTML(pokemon) // adicionando uma nova lista
        // }
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

    
