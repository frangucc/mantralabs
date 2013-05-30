ActiveAdmin.register Article do
 	form :html => { :enctype => "multipart/form-data" } do |f|
	   f.inputs "Details" do
	    
	    f.input :title
	    f.input :sub_title
	    f.input :content
	    f.input :html
	    f.input :picture, :as => :file, :hint => f.template.image_tag(f.object.picture.url(:medium))

	    
	  end
	  f.form_buffers.last << content_tag(:div, f.object.picture.url(:medium))
	  f.buttons
	 end   
end
