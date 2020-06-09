class AppealSerializer < ActiveModel::Serializer
  belongs_to :user

  attributes :id, :pet_name, :status,  :description, :clinic, :user, :created_at, :updated_at
end
