class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :title
      t.string :sub_title
      t.text :content
      t.text :html

      t.timestamps
    end
  end
end
