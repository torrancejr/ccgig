class UserMailer < ApplicationMailer

  def new_quote(task, quote)
    @task = task
    @quote = quote
    mail(
    to: quote.user.email,
    subject: "Thank you!. Your quote has been sent."
    )
  end
end
