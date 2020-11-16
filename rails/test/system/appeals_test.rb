require "application_system_test_case"

class AppealsTest < ApplicationSystemTestCase
  setup do
    @appeal = appeals(:one)
  end

  test "visiting the index" do
    visit appeals_url
    assert_selector "h1", text: "Appeals"
  end

  test "creating a Appeal" do
    visit appeals_url
    click_on "New Appeal"

    fill_in "Clinic", with: @appeal.clinic_id
    fill_in "Description", with: @appeal.description
    fill_in "Pet name", with: @appeal.pet_name
    fill_in "Species", with: @appeal.species_id
    fill_in "Status", with: @appeal.status
    fill_in "User", with: @appeal.user_id
    click_on "Create Appeal"

    assert_text "Appeal was successfully created"
    click_on "Back"
  end

  test "updating a Appeal" do
    visit appeals_url
    click_on "Edit", match: :first

    fill_in "Clinic", with: @appeal.clinic_id
    fill_in "Description", with: @appeal.description
    fill_in "Pet name", with: @appeal.pet_name
    fill_in "Species", with: @appeal.species_id
    fill_in "Status", with: @appeal.status
    fill_in "User", with: @appeal.user_id
    click_on "Update Appeal"

    assert_text "Appeal was successfully updated"
    click_on "Back"
  end

  test "destroying a Appeal" do
    visit appeals_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Appeal was successfully destroyed"
  end
end
