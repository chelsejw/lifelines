class CreateBots < ActiveRecord::Migration[6.0]
  def change
    create_table :bots do |t|
      t.integer :chat_id
      t.string :name
      t.boolean :started
      t.string :step
      t.timestamps
    end
  end
end
