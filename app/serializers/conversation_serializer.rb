
# app/serializers/conversation_serializer.rb

class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :token
  has_many :messages
  belongs_to :lifeline
  has_many :users
end