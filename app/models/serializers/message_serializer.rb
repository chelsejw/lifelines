class Serializers::MessageSerializer < ActiveModel::Serializer
  belongs_to :user
  belongs_to :conversation
  def profile
   object.profile # or whatever methood
  end
  attributes :id, :text, :conversation_id, :user, :created_at, :profile
end
