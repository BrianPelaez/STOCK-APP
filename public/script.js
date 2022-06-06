console.log("Consola de navegador");
const inputName = document.querySelector('#productName');
const inputPrice = document.querySelector('#productPrice');

const button = document.querySelector('button');

const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon" // + { id o nombre }

const createPokemon = (pokemon) => {
    const html = `
        <h3>${pokemon.name}</h3>
        <img src="${pokemon.sprites.front_shiny}" alt="${pokemon.name}">
        <span>#${pokemon.id}</span>
        `
        const div = document.createElement('div');
        div.classList.add('poke-card')
        div.innerHTML = html;
        document.querySelector('.pokemon-container').appendChild(div)
}
fetch(`${POKE_API_URL}/`+'charmander')
.then((res) => {
    
    return res.json(); // .json retorna otra promesa por eso hay que esperar a que termine 

}).then(pokemon => { // Cuando termina la peticion de res.json(), ahi ya tengo el pokemon en JSON
    createPokemon(pokemon)
})
.catch((err) => {
    console.log(err)
});

fetch(`${POKE_API_URL}/`+'pikachu')
.then((res) => {
    
    return res.json(); // .json retorna otra promesa por eso hay que esperar a que termine 

}).then(pokemon => { // Cuando termina la peticion de res.json(), ahi ya tengo el pokemon en JSON
    createPokemon(pokemon)
})
.catch((err) => {
    console.log(err)
});


button.addEventListener('click', () => {
    
    const name = inputName.value;
    const price = inputPrice.value;

    fetch('/api/v1/products', { 
        method: 'POST', 
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            name,
            price
        })
    });
});