class UserMailer < ApplicationMailer

  def new_quote(task, quote)
    @task = task
    @quote = quote
    mail(
    to: quote.user.email,
    subject: "Thank you!. Your quote has been sent."
    )
  end

  def new_quote_client(task, quote)
    @task = task
    @quote = quote
    @username = quote.user.username

    mail(
    to: task.user.email,
    subject: "Someone submitted a new quote."
    )
  end

def new_task(task)
    @task = task
    mail(
    to: task.user.email,
    subject: "Your task #{task.name} has been added to our website!"
    )
  end

  def accepted_helper(task, quote)
    @task = task
    @quote = quote
    mail(
    to: quote.user.email,
    subject: "Your were picked for the job"
    )
  end

  def accepted_quote(task, quote)
    @task = task
    @quote = quote
    mail(
    to: task.user.email,
    subject: "You picked someone to help for your job, details inside"
    )
  end
end
