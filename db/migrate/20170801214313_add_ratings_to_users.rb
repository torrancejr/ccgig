class AddRatingsToUsers < ActiveRecord::Migration[5.1]
  def up
    add_column :users, :rating, :integer
  end

  def down
    remove_column :users, :ratings
  end
end
