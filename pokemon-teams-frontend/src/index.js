const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded",()=>{

    fetch("http://localhost:3000/trainers")
    .then(resp => resp.json())
    .then(json => createCard(json))
    .catch(err => alert(err));

    

    

})


function createCard(data){
    data.forEach(trainer => {
        buildCard(trainer);
    })
}

function buildCard(trainer){
    const main = document.querySelector("main")
    let div = document.createElement("div")
    div.className = "card"

    let p = document.createElement("p")
    p.textContent = trainer.name 

   let button = document.createElement("button")
   button.setAttribute("data-trainer-id", trainer.id)
   button.textContent = "New Pokemon"
   button.addEventListener("click", addPokemon)

    div.appendChild(p)
    div.appendChild(button)

    let ul = document.createElement("ul")
    trainer.pokemons.forEach(pokemon => {
        // let pokemon_li = document.createElement("li")
        // pokemon_li.textContent = `${pokemon.nickname} (${pokemon.species})`
        // let button = document.createElement("button")
        // button.textContent = "Release"
        // button.className = "release"
        // button.setAttribute("data-pokemon-id", pokemon.id)
        // pokemon_li.appendChild(button)
        // ul.appendChild(pokemon_li)
        createPokemon(pokemon, ul);
    })

    div.appendChild(ul)
    main.appendChild(div)


}

function createPokemon(pokemon, ul){
    let pokemon_li = document.createElement("li")
        pokemon_li.textContent = `${pokemon.nickname} (${pokemon.species})`
        let button = document.createElement("button")
        button.textContent = "Release"
        button.className = "release"
        button.setAttribute("data-pokemon-id", pokemon.id)
        button.addEventListener("click", deletePokemon)
        pokemon_li.appendChild(button)
        ul.appendChild(pokemon_li)
}

function addPokemon(e){
    // console.log(e.target.parentElement)
    let pkmn_count = e.target.parentElement.querySelectorAll("li").length
    // debugger
    if(pkmn_count < 6){
        let options_add = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                id: e.target.getAttribute("data-trainer-id")
            })
        }

        fetch("http://localhost:3000/pokemons", options_add)
        .then(resp => resp.json())
        .then(json => createPokemon(json,e.target.nextSibling))
        .catch(err => alert(err));
    }else{
        alert("This trainer already has enough pokemon")
    }

}

function deletePokemon(e){
    let options_delete = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
        // body: JSON.stringify(e.target.getAttribute("data-pokemon-id"))
    }

    fetch(`http://localhost:3000/pokemons/${e.target.getAttribute('data-pokemon-id')}`, options_delete)
    .then(resp => resp.json())
    .then(json => removeFront(json))
    .catch(err => alert(err));
}

function removeFront(data){
    let pokemon_id = data.id
    let button = document.querySelector(`[data-pokemon-id="${pokemon_id}"]`)
    button.parentElement.remove();
}
