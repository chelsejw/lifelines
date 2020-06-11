class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_one :profile
  has_many :appeals
  has_many :lifelines
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
