class PagesController < ApplicationController
   
   before_filter lambda { 
      @body_class = params[:action] }

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
   
   def team
   
   end

   def work_mantra
   end
   
   def work_sellsimple
   end

   def work_bfi
   end

   def work_bsb
   end

   def work_ciw
   end

   def work_benchprep
   end

   def work_agentrun
   end

   def work_tagkast
   end

   def work_greenbeans
   end

   def work_chatyeo
   end

   def work_getable
   end

   def work_bevel
   end
   
   def ux
   end

   def ux_research

   end

   def ux_design

   end





end