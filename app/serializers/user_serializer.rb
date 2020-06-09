class UserSerializer < ActiveModel::Serializer
    has_one :profile

    attributes :id, :email, :profile
  end
  