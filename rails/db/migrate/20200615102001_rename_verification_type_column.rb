class RenameVerificationTypeColumn < ActiveRecord::Migration[6.0]
  def change
    rename_column :verifications, :type, :verification_for
  end
end
