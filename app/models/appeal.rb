class Appeal < ApplicationRecord
  belongs_to :user
  belongs_to :clinic
  belongs_to :species
end
