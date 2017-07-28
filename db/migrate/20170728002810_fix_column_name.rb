class FixColumnName < ActiveRecord::Migration[5.1]
  def change
    rename_column :quotes, :accepted_qoute, :accepted_quote
  end
end
