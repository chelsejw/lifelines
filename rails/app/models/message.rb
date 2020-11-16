class Message < ApplicationRecord
  belongs_to :conversation
  belongs_to :user
  accepts_nested_attributes_for :user

end
