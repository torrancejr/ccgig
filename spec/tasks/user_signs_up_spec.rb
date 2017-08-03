require 'rails_helper'

feature "User signs up" do
  scenario 'a new user signs up' do

    visit new_user_registration_path
    fill_in 'First Name', with: 'Ryan'
    fill_in 'Last Name', with: 'Torrance'
    fill_in 'Phone', with: '6106565293'
    fill_in 'Username', with: 'bobbytables'
    fill_in 'Email', with: 'bobbytables@gmail.com'
    fill_in 'Password', with: 'testtest'
    fill_in 'Password Confirmation', with: 'testtest'

    click_link 'Sign Up'

  end
end
