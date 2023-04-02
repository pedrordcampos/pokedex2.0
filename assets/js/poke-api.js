const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types =  pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types 

    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {

const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

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

    return fetch(url) // espera uma promisse
            .then((response) => response.json()) // converte a promisse em um objeto json
            .then((jsonBody) => jsonBody.results) // pega o argumento results do objeto
            .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // transforma a lista em um nova lista de promessas
            .then((detailRequests) => Promise.all(detailRequests))
            .then((pokemonsDetails) => pokemonsDetails)
}

// Promise.all([
//     fetch('https://pokeapi.co/api/v2/pokemon/1'),
//     fetch('https://pokeapi.co/api/v2/pokemon/2'),

// ]).then(results => {
//     console.log(results)
// })