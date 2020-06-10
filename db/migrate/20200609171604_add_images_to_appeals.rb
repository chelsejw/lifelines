class AddImagesToAppeals < ActiveRecord::Migration[6.0]
  def change
    add_column :appeals, :img_url, :string
  end
end
