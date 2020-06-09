class CreateAppeals < ActiveRecord::Migration[6.0]
  def change
    create_table :appeals do |t|
      t.references :user, null: false, foreign_key: true
      t.references :clinic, null: false, foreign_key: true
      t.references :species, null: false, foreign_key: true
      t.string :pet_name
      t.string :description
      t.string :status

      t.timestamps
    end
  end
end
