class TrainersController < ApplicationController

    def index
        @trainers = Trainer.all
        render json: @trainers, only: [:id, :name], include: :pokemons
    end
    def show
        @trainer = Trainer.find_by(id: params[:id])
        render json: @trainer
    end
end
