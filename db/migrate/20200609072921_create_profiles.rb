class CreateProfiles < ActiveRecord::Migration[6.0]
  def change
    create_table :profiles do |t|
      t.references :user, null: false, foreign_key: true
      t.string :username
      t.string :display_name
      t.string :img_url
      t.string :address
      t.string :type
      t.boolean :verified

      t.timestamps
    end
  end
end
