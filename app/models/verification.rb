class Verification < ApplicationRecord
  belongs_to :user
  belongs_to :authorizer, :class_name => 'User'
  has_many :documents
end
