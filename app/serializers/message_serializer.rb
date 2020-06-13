
# app/serializers/message_serializer.rb

class MessageSerializer < ActiveModel::Serializer
  attributes :id, :conversation_id, :text, :created_at, :user

  belongs_to :conversation
  belongs_to :user
end