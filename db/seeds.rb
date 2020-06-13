# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'ffaker'


['Dog', 'Cat'].each do |s|
    Species.create(name: s)
end

25.times{print"-"}
puts


# Fake Users [username: firstname, email: firstname@email.com, password: 123456]
7.times do
    name = "#{FFaker::Name.first_name.downcase}#{rand(1..100)}"
    User.create! :email => "#{name}@email.com", :password => "123456", :password_confirmation => "123456"

    puts "Created user called #{name} with email #{name}@email.com"
end

25.times{print"-"}
puts

# Fake user profiles for each user
User.all.each do |user|
    puts "Created profile for #{user.email}"
    name = user.email.slice(0..user.email.length-11)
    Profile.create(user_id: user.id, username: name, display_name: name, img_url: "https://loremflickr.com/400/400/#{name}?lock=#{user.id}", bio: FFaker::Lorem.paragraph, address: FFaker::Address.street_address, account_type: "user", verified: false)
end


clinics = [
    {:name => "AAVC- Animal and Avian Veterinary Clinic", :address=> "716 Yishun Street 71 #01-254, Singapore 760716", :email => "aavcsingapore@gmail.com", :phone => "68539397"},
    {:name => "Allpets & Aqualife Clinic", :address=> "24 Jalan Kelulut, Seletar Hills Estate, Singapore 809041", :email => "info@allpetsaqualife.com", :phone => "64813700"},
    {:name => "Amber Veterinary Practice Pte Ltd", :address=> "50 Burnfoot Terrace, Frankel Estate", :email => "enquiry@ambervet.com", :phone => "62455543"},
    {:name => "Mount Pleasant Veterinary Centre (Mandai)", :address=> "5 Mandai Road, Singapore 779391", :email => "mpmandai@mountpleasant.com.sg", :phone => "64515242"},
    {:name => "Passion Veterinary Clinic Pte Ltd", :address=> "Blk 111 Woodlands Street 13 #01-86", :email => "passionvet@gmail.com", :phone => "66358725"},
]

clinics.each do |c| 
    @clinic = Clinic.create!(name: c[:name], address: c[:address], email: c[:email], phone: c[:phone])
    
    puts "Created #{c[:name]}"

    @user = User.create! :email => c[:email], :password => "123456", :password_confirmation => "123456"

    puts "Created #{@user} for #{c[:name]}"

    @profile = Profile.create!(user_id: @user.id, username: c[:name].delete(" "), display_name: c[:name].delete(" "), img_url: "https://loremflickr.com/400/400/#{c[:name].delete(" ")}?lock=#{c[:phone]}", bio: FFaker::Lorem.paragraph, address: c[:address], account_type: "clinic", verified: true)

    puts "Created #{@profile} for #{c[:name]}"

end

6.times do
    @appeal = Appeal.create!(user_id: rand(User.first.id..User.last.id), img_url: "https://i.picsum.photos/id/#{rand(1..999)}/200/300.jpg", clinic_id: rand(Clinic.first.id..Clinic.last.id), species_id: rand(Species.first.id..Species.last.id), pet_name: FFaker::Name.first_name, status: "open", description: FFaker::Lorem.paragraph)
    puts "Created appeal for #{@appeal.user.profile.username}"
end
