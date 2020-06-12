class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :lifeline_id, :created_at
  has_many :messages
  has_many :users
end
