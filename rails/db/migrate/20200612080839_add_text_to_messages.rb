class AddTextToMessages < ActiveRecord::Migration[6.0]
  def change
    add_column :messages, :text, :string
  end
end
