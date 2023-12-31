package main

import (
	"bufio"
	"fmt"
	"github.com/joho/godotenv"
	"github.com/pusher/pusher-http-go/v5"
	"log"
	"os"
	"strings"
)

func main() {

	if err := godotenv.Load(); err != nil {
		log.Fatal("Ошибка при загрузке файла .env")
	}

	pusherClient := pusher.Client{
		AppID:   os.Getenv("PUSHER_ID"),
		Key:     os.Getenv("PUSHER_KEY"),
		Secret:  os.Getenv("PUSHER_SECRET"),
		Cluster: os.Getenv("PUSHER_CLUSTER"),
	}

	reader := bufio.NewReader(os.Stdin)
	fmt.Println("Type a message...")

	for {
		text, _ := reader.ReadString('\n')
		text = strings.TrimSpace(text)

		if text == "exit" {
			os.Exit(0)
		}

		data := map[string]string{"message": text}
		err := pusherClient.Trigger("my-channel", "my-event", data)
		if err != nil {
			fmt.Println("Error triggering event:", err)
		}
	}
}
