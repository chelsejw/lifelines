class Serializers::ProfileSerializer < ActiveModel::Serializer
    belongs_to :user

    attributes :bio, :address, :account_type, :img_url, :display_name, :verified
  end
  