require 'test_helper'

class ManifestControllerTest < ActionController::TestCase
  test "should get appcache" do
    get :appcache
    assert_response :success
  end

end
