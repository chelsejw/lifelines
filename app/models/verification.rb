class Verification < ApplicationRecord
  belongs_to :user, :class_name => 'User'
  belongs_to :authorizer, :class_name => 'User'
  has_many :documents
end
