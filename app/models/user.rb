class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable


  ratyrate_rateable "rating"
  ratyrate_rater

  has_many :tasks
  has_many :quotes
  has_many :reviews
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :username, presence: true
  validates :phone, length: { is: 10 }, presence: true
  validates :email, presence: true, format: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
  validates :admin, inclusion: { in: [true, false] }
end
