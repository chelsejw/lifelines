# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'ffaker'


# ['Dog', 'Cat'].each do |s|
#     Species.create(name: s)
# end


# 25.times{print"-"}
# puts


# # Fake Users [username: firstname, email: firstname@email.com, password: 123456]
# 20.times do
#     name = FFaker::Name.first_name.downcase
#     User.create! :email => "#{name}@email.com", :password => "123456", :password_confirmation => "123456"

#     puts "Created user called #{name} with email #{name}@email.com"
# end

# 25.times{print"-"}
# puts

# # Fake user profiles for each user
# User.all.each do |user|
#     puts "Created profile for #{user.email}"
#     name = user.email.slice(0..user.email.length-11)
#     Profile.create(user_id: user.id, username: name, display_name: name, img_url: "https://loremflickr.com/400/400/#{name}?lock=#{user.id}", bio: FFaker::Lorem.paragraph, address: FFaker::Address.street_address, user_type: "user", verified: false)
# end

# 45.times do 
#     name = FFaker::Address.neighborhood
#     @clinic = Clinic.create(name: "#{name} Veterinary Clinic", email: "enquiry@#{name.delete(' ')}.com", address: FFaker::Address.street_address, phone: FFaker::PhoneNumberSG.fixed_line_number)
#     puts "Created clinic called for #{@clinic.name}"
# end

# Clinic.all.each do |clinic|
#     @user = User.create! :email => "#{clinic.email}", :password => "123456", :password_confirmation => "123456"
#     name = clinic.name.slice(0..clinic.name.length-19)
    
#     @profile = Profile.create(user_id: @user.id, username: name, display_name: name, img_url: "https://loremflickr.com/400/400/#{name}?lock=#{@user.id}", bio: FFaker::Lorem.paragraph, address: FFaker::Address.street_address, user_type: "clinic", verified: false)

#     puts "Created #{name} clinic profile"
# end

# 50.times do
#     @appeal = Appeal.create(user_id: rand(User.first.id..User.last.id), clinic_id: rand(Clinic.first.id..Clinic.last.id), species_id: (1..2), pet_name: FFaker::Name.first_name, status: "open", description: FFaker::Lorem.paragraph)
#     puts @appeal
#     puts "Created appeal for #{@appeal.user.profile.username}"
# end
