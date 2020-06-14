class Verification < ApplicationRecord
  belongs_to :user, :class_name => 'User'
  belongs_to :admin, :class_name => 'User'
  has_many :documents
end
