class CreateVerifications < ActiveRecord::Migration[6.0]
  def change
    create_table :verifications do |t|
      t.references :user
      t.references :authorizer
      t.string :type
      t.string :status
      t.text :details
      t.string :owner_name
      t.string :mobile
      t.string :pet_name

      t.timestamps
    end

    add_foreign_key :verifications, :users, column: :user_id, primary_key: :id
    add_foreign_key :verifications, :users, column: :authorizer_id, primary_key: :id
  end
end
