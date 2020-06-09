class RemoveUsersFromClinics < ActiveRecord::Migration[6.0]
  def change
    remove_column :clinics, :user_id
  end
end
