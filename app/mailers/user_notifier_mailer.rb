class UserNotifierMailer < ApplicationMailer
    default :from => 'lifelines.team@gmail.com'

  # send a signup email to the user, pass in the user object that   contains the user's email address
  def send_signup_email(user)
    @user = user
    mail( :to => 'chelseaejw@gmail.com',
    :subject => "#{@user.email} has signed up for Lifelines" )
  end

  def send_appeal_notice(appeal)
    @appeal = appeal
    mail( :to=> User.all,
    :subject => "#{@appeal.species.name} donor needed at #{@appeal.clinic.name}!" )
  end


end
