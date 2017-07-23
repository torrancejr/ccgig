class Quote < ApplicationRecord
  belongs_to :user
  belongs_to :task

  validates :quote, presence: true, numericality: true
end
