class AppealSerializer
  include FastJsonapi::ObjectSerializer
  attributes :pet_name, :description, :status, :created_at, :updated_at

  belongs_to :user
  belongs_to :clinic
  belongs_to :species
  has_many :lifelines
end
