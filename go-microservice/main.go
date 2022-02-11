package main

import (
	"crypto/tls"
	"encoding/json"
	"fmt"
	"os"
	"strconv"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/henrique-tavares/imersao6-go/email"
	"github.com/henrique-tavares/imersao6-go/kafka"
	"github.com/joho/godotenv"
	gomail "gopkg.in/mail.v2"
)

func goDotEnvVariable(keys ...string) (map[string]string, error) {
	err := godotenv.Load(".env")
	if err != nil {
		return map[string]string{}, err
	}

	envVariables := make(map[string]string)
	for _, key := range keys {
		envVariables[key] = os.Getenv(key)
	}

	return envVariables, nil
}

func parseInt(s string) int {
	num, err := strconv.Atoi(s)
	if err != nil {
		panic(err)
	}

	return num
}

func main() {
	emailChan := make(chan email.Email)
	msgChan := make(chan *ckafka.Message)

	envVariables, err := goDotEnvVariable("DIALER_HOST", "DIALER_PORT", "DIALER_USERNAME", "DIALER_PASSWORD")
	if err != nil {
		panic(err)
	}

	dialer := gomail.NewDialer(envVariables["DIALER_HOST"], parseInt(envVariables["DIALER_PORT"]), envVariables["DIALER_USERNAME"], envVariables["DIALER_PASSWORD"])

	dialer.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	ms := email.NewMailSender()
	ms.From = envVariables["DIALER_HOST"]
	ms.Dialer = dialer

	go ms.Send(emailChan)

	configMap := &ckafka.ConfigMap{
		"bootstrap.servers": "host.docker.internal:9092",
		"client.id":         "emailapp",
		"group.id":          "emailapp",
	}
	topics := []string{"emails"}

	consumer := kafka.NewConsumer(configMap, topics)

	go consumer.Consume(msgChan)

	for msg := range msgChan {
		var input email.Email
		json.Unmarshal(msg.Value, &input)
		fmt.Println("Recebendo mensagem")
		emailChan <- input
	}
}
