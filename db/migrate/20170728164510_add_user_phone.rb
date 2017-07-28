class AddUserPhone < ActiveRecord::Migration[5.1]
    def up
      add_column :users, :phone, :string
    end

    def down
      remove_column :users, :phone
    end
end
