require 'rails_helper'

feature "User signs in" do
  let(:user) do
    FactoryGirl.create(:user)
  end

  scenario 'an existing user specifies a valid email and password' do
    visit root_path
    sign_in_as(user)
    expect(page).to have_content('Welcome Back!')
    expect(page).to have_content('Sign Out')

  end

  scenario 'a nonexistent email and password is supplied' do
    visit root_path
    click_link 'Sign In'
    fill_in 'Email', with: 'somebody@example.com'
    fill_in 'Password', with: 'password'
    click_button 'Sign In'
    expect(page).to have_content('Invalid Email or password')
    expect(page).to_not have_content('Welcome Back!')
    expect(page).to_not have_content('Sign Out')
  end

  scenario "successful sign out" do
    visit root_path
    sign_in_as(user)
    click_link "Sign Out"

    expect(page).to have_content "Signed out successfully"
  end
end
