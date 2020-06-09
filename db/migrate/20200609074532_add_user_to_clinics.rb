class AddUserToClinics < ActiveRecord::Migration[6.0]
  def change
    add_reference :clinics, :user, null: true, foreign_key: true
  end
end
