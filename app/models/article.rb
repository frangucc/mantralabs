class Article < ActiveRecord::Base
  attr_accessible :content, :html, :sub_title, :title, :picture

  has_attached_file :picture, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
end
