class CreateDocuments < ActiveRecord::Migration[6.0]
  def change
    create_table :documents do |t|
      t.references :verification, null: false, foreign_key: true
      t.string :url
      t.string :type

      t.timestamps
    end
  end
end
