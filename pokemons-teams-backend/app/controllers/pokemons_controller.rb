require 'faker'
class PokemonsController < ApplicationController
    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.new(nickname: name, species: species, trainer_id: params[:id])
        if(pokemon.save!)
            render json: pokemon
        else
            render text: "Didn't save"
        end
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
        render json: pokemon  
    end
end
