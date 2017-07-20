require 'rails_helper'

feature "User updates profile" do
  let!(:user) do
    FactoryGirl.create(:user)

  end
  scenario 'a user can update their current profile' do
    visit root_path
    sign_in_as(user)
    click_link "Edit/Delete Profile"
    visit edit_user_registration_path(user)
    fill_in 'First Name', with: "Ryan"
    fill_in 'Last Name', with: "Torrance"
    fill_in 'Email', with: "bobbytables123@gmail.com"
    fill_in 'Password', with: "test2test2"
    fill_in 'Password Confirmation', with: "test2test2"
    fill_in 'Current Password', with: user.password

    click_button 'Update'
    expect(page).to have_content("Your account has been updated successfully.")


  end

  scenario 'a user incorrectly updates their email' do
    visit root_path
    sign_in_as(user)
    click_link "Edit/Delete Profile"
    visit edit_user_registration_path(user)
    fill_in 'Email', with: "bobbytables123@gmail.com"
    fill_in 'Password', with: "test2test2"
    fill_in 'Password Confirmation', with: "test2test2"
    fill_in 'Current Password', with: user.password

    click_button 'Update'
    expect(page).to have_content('Email is invalid')


  end

  scenario 'a user incorrectly updates their password' do
    visit root_path
    sign_in_as(user)
    click_link "Edit/Delete Profile"
    visit edit_user_registration_path(user)
    fill_in 'Password', with: "ab12"
    fill_in 'Password Confirmation', with: "ab12"
    fill_in 'Current Password', with: user.password

    click_button 'Update'
    expect(page).to have_content('Password is too short (minimum is 6 characters)')


  end
end
