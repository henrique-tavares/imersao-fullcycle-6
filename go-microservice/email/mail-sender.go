package email

import gomail "gopkg.in/mail.v2"

type MailSender struct {
	From   string
	Dialer *gomail.Dialer
}

func NewMailSender() *MailSender {
	return &MailSender{}
}

func (ms *MailSender) Send(emailChan chan Email) error {
	mail := gomail.NewMessage()
	mail.SetHeader("From", ms.From)
	for ec := range emailChan {
		mail.SetHeader("Subject", ec.Subject)
		mail.SetBody("text/html", ec.Body)

		for _, to := range ec.Emails {
			mail.SetHeader("To", to)
			err := ms.Dialer.DialAndSend(mail)

			if err != nil {
				return err
			}
		}
	}

	return nil
}
