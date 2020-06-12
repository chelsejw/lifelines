class ProfileSerializer < ActiveModel::Serializer
    belongs_to :user

    attributes :bio, :address, :account_type
  end
  