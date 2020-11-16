class AppealSerializer < ActiveModel::Serializer
  belongs_to :user
  has_many :lifelines

  attributes :id, :img_url, :lifelines, :pet_name, :status, :species, :description, :clinic, :user, :created_at, :updated_at
end
