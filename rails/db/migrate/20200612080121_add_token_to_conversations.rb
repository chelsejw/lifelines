class AddTokenToConversations < ActiveRecord::Migration[6.0]
  def change
    add_column :conversations, :token, :text
  end
end
