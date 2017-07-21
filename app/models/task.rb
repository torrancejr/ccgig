class Task < ApplicationRecord
  belongs_to :user
  has_many :quotes

  validates :name, presence: true
  validates :location, presence: true
  validates :description, presence: true
  validates :task_date, presence: true
end
