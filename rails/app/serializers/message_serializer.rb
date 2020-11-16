
# app/serializers/message_serializer.rb

class MessageSerializer < ActiveModel::Serializer
  belongs_to :user
  belongs_to :conversation
  def profile
   object.user.profile # or whatever methood
  end
  attributes :id, :text, :conversation_id, :user, :created_at, :profile
end