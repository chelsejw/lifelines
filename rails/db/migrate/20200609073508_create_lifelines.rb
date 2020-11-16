class CreateLifelines < ActiveRecord::Migration[6.0]
  def change
    create_table :lifelines do |t|
      t.references :appeal, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :status

      t.timestamps
    end
  end
end
