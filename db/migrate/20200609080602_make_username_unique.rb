class MakeUsernameUnique < ActiveRecord::Migration[6.0]
  def change
    remove_column :profiles, :username
    add_column :profiles, :username, :string, unique: true
  end
end
