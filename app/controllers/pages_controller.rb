class PagesController < ApplicationController
   def index
   	 @body_class = 'home_bg'
   end

   def info

   end

   def video

   end
	
   def tour
   
   end
   
   def works
   @body_class = 'works_bg'
   end
   
   def worksingle
   @body_class = 'works_monthlys'
   end
   
   def team
   
   end

end