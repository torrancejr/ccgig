class CreateQuotes < ActiveRecord::Migration[5.1]
  def change
    create_table :quotes do |t|
      t.integer "quote", null: false
      t.boolean "accepted_qoute", default: false
      t.integer "user_id", null: false
      t.integer "task_id", null: false
    end
  end
end
