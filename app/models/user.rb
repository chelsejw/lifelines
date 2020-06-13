class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_one :profile
  has_many :appeals
  has_many :lifelines
  has_and_belongs_to_many :conversations

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
end
