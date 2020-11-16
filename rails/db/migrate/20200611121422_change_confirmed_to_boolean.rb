class ChangeConfirmedToBoolean < ActiveRecord::Migration[6.0]
  def change
    change_column :lifelines, :confirmed, "boolean USING CAST(confirmed AS boolean)"
  end
end
