class ManifestController < ApplicationController
  
  layout false
  
  def show
	 headers['Content-Type'] = 'text/cache-manifest'
    #render :text => Manifesto.cache, :layout => false
  end

end
