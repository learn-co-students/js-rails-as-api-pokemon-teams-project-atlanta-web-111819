class PokemonsController < ApplicationController
    before_action :pokemon_or_null
    
    def show
        
        render json: @pokemon
    end
    def destroy
        @pokemon = Pokemon.find_by(id: params[:id])
        if @pokemon.respond_to?('persisted?') 
            @pokemon.destroy
           render json: @pokemon
        else
            render json: @pokemon
        end
    end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        trainer_id = params[:trainer_id]
        trainer = Trainer.find_by(id: trainer_id)
        @pokemon = Pokemon.new(nickname: name, species: species, trainer_id: trainer_id)
        if trainer.pokemons.count <= 6
            if @pokemon.save
                print('====================')
                print(@pokemon)
                render json: @pokemon
            else
                render json: {message: "Failed to create pokemon"}
            end
        else
            render json: {message: "Failed to create pokemon"}
        end
    end

    private

    def pokemon_or_null
        @pokemon = Pokemon.find_by(id: params[:id])
        if @pokemon.nil?
            @pokemon = {message: "Does not exist"}
        end
    end
end
