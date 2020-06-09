class ChangeUserTypeToAccountType < ActiveRecord::Migration[6.0]
  def change
    rename_column :profiles, :user_type, :account_type
  end
end
