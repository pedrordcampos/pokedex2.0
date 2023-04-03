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

    const stats = pokeDetail.stats.map((stat) => ({
        name: stat.stat.name,
        base_stat: stat.base_stat
      }))
    
    pokemon.stats = stats

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {

const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url) // espera uma promisse
            .then((response) => response.json()) // converte a promisse em um objeto json
            .then((jsonBody) => jsonBody.results) // pega o argumento results do objeto
            .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // transforma a lista em um nova lista de promessas
            .then((detailRequests) => Promise.all(detailRequests))
            .then((pokemonsDetails) => pokemonsDetails)
}

