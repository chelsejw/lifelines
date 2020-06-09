class DropSpeciesTable < ActiveRecord::Migration[6.0]
  def change
    remove_column :species, :name
    add_column :species, :name, :string, unique: true
  end
end
