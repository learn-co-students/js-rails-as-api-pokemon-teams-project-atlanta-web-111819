class AddColumnToPokemons < ActiveRecord::Migration[6.0]
  def change
    add_reference :pokemons, :trainer, foreign_key: true
  end
end
