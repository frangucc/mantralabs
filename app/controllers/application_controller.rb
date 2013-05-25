class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter lambda { @body_class = 'page' }

end
