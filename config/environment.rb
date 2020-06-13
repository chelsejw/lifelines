# Load the Rails application.
require_relative 'application'
ActionMailer::Base.smtp_settings = {
  :user_name => 'chelsejw@gmail.com',
  :password => 'sincepplcanseethisilovesei22',
  :domain => 'http://localhost:3000/',
  :address => 'smtp.sendgrid.net',
  :port => 465,
  :authentication => :plain,
  :enable_starttls_auto => true
}
# Initialize the Rails application.
Rails.application.initialize!
