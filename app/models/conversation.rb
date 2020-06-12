class Conversation < ApplicationRecord
  belongs_to :lifeline
  has_and_belongs_to_many :users
  has_many :messages

  before_create :generate_token
  def generate_token(length=50)
    loop do
      token = self.token = SecureRandom.urlsafe_base64(length, false)
      break token unless self.class.exists?(token: token)
    end
  end

end
