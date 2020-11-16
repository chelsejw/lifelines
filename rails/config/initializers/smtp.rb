# config/initializers/smtp.rb

#if you are using the API key
ActionMailer::Base.smtp_settings = {
  :user_name => 'your_sendgrid_username',
  :password => 'your_sendgrid_password',
  :domain => 'yourdomain.com',
  :address => 'smtp.sendgrid.net',
  :port => 465,
  :authentication => :plain,
  :enable_starttls_auto => true
}
