class Serializers::VerificationSerializer < ActiveModel::Serializer
    has_one :user
    has_one :authorizer
    has_many :documents
    attributes :user, :authorizer, :documents, :user_id, :authorizer_id, :verification_for, :status, :details, :owner_name, :pet_name, :mobile
  end
  