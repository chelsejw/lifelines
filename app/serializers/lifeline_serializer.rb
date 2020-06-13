
class LifelineSerializer < ActiveModel::Serializer
  attributes :id, :appeal, :user, :conversation, :confirmed, :created_at, :updated_at
  has_one :conversation
  belongs_to :user
end