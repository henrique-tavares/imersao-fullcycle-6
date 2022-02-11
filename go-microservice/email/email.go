package email

type Email struct {
	Emails  []string `json:"emails"`
	Subject string   `json:"subject"`
	Body    string   `json:"body"`
}

func NewEmail() *Email {
	return &Email{}
}
