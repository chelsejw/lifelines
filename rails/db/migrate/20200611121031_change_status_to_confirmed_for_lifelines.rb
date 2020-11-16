class ChangeStatusToConfirmedForLifelines < ActiveRecord::Migration[6.0]
  def change
    rename_column :lifelines, :status, :confirmed
  end
end
