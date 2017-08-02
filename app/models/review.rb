class Review < ApplicationRecord
  belongs_to :user
  belongs_to :reviewed, class_name: "User", foreign_key: :reviewed_id

  validates :rating, presence: true, numericality: {only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5}

end
