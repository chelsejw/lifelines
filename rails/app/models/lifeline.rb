class Lifeline < ApplicationRecord
  belongs_to :appeal
  belongs_to :user
  has_one :conversation
end
