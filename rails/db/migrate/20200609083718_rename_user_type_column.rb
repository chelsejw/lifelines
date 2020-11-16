class RenameUserTypeColumn < ActiveRecord::Migration[6.0]
  def change
    rename_column :profiles, :type, :user_type
  end
end
