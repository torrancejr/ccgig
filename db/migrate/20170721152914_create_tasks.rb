class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string "name", null: false
      t.string "location", null: false
      t.string "description", default: "", null: false
      t.string "task_length"
      t.date "task_date", null: false
      t.integer "user_id"
      t.integer "quote_id"
    end
  end
end
