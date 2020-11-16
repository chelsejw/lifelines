class ConversationsUsersTable < ActiveRecord::Migration[6.0]
  def change
    create_table :conversations_users do |t|
      t.references :conversation, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
