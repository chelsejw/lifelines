class Serializers::LifelineSerializer < ActiveModel::Serializer
    attributes :id, :user_id, :appeal_id, :confirmed

    belongs_to :appeal
    belongs_to :user
    
  end
  