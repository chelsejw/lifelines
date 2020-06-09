class AppealSerializer
  include FastJsonapi::ObjectSerializer
  attributes 
  belongs_to :user
  belongs_to :clinic
  belongs_to :species
  has_many :lifelines
end
