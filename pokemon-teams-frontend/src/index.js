const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

function fetchTeams() {
    fetch(TRAINERS_URL).then(res => res.json()).then(function(trainersData) {
        for(trainer of trainersData) {
            addCardstoPage(trainer) 
        }
        
    })

}

function addCardstoPage(trainer) {
    const div = document.createElement('div')
    div.className = "card"
    div.setAttribute('data-id', trainer.id)
    const trainerName = document.createElement('p')
    trainerName.textContent = trainer.name
    div.appendChild(trainerName)
    main.appendChild(div)
    const team = document.createElement('ul')
    for(pokemon of trainer.pokemons) {
       addPokemontoTeamList(pokemon, team)
    }
    div.appendChild(team)
    const addPokemonBtn = document.createElement('button')
    addPokemonBtn.textContent = "Add Pokemon"
    addPokemonBtn.setAttribute("data-trainer-id", trainer.id)
    addPokemonBtn.addEventListener('click', addPokemon)
    div.appendChild(addPokemonBtn)

}

function addPokemontoTeamList(pokemon, list) {
    let li = document.createElement('li')
    li.textContent = `${pokemon.nickname} (${pokemon.species})`
    let releaseBtn = document.createElement('button')
    releaseBtn.className = "release"
    releaseBtn.setAttribute('data-pokemon-id', pokemon.id)
    releaseBtn.textContent = "Release"
    releaseBtn.addEventListener('click', removePokemon)
    li.appendChild(releaseBtn)
    list.appendChild(li)
}

function addPokemon(event) {
    const ul = event.target.parentElement.querySelector('ul')
    addPokemonToDb(event.target.getAttribute('data-trainer-id'), ul)
    console.log(event.target.getAttribute('data-trainer-id'))
}

function addPokemonToDb(trainerId, list) {
    fetch(POKEMONS_URL, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            'trainer_id': trainerId
        })
    })
    .then(res => res.json())
    .then(pokemon => {
        console.log('Got pokemon: ', pokemon)
        if (pokemon.id) {
            addPokemontoTeamList(pokemon, list)
        }
    })
}

function removePokemon(e) {
  deletePokemonFromDb(e.target)
}

function removePokemonFromDom(li) {
   li.remove()
}

function deletePokemonFromDb(btn) {
  fetch(`${POKEMONS_URL}/${btn.getAttribute('data-pokemon-id')}`, {
      method:'delete', 
      'Accept': 'application/json'
    } )
   .then(res => res.json())
   .then(pokemon => {
       if(pokemon.id) {
         removePokemonFromDom(btn.parentElement)
       } 
   })
}


// Load DOM Content

document.addEventListener("DOMContentLoaded", function() {

    fetchTeams()
})

