package main

import (
	"context"
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/jego8725/PR-testgo/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	app := fiber.New()
	app.Use(cors.New())

	clientMgo, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://localhost:27017/pr-testgo"))
	if err != nil {
		panic(err)
	}

	app.Static("/", "./client/dist")

	app.Get("/users", func(c *fiber.Ctx) error {
		var users []models.User
		collUser := clientMgo.Database("pr-testgo").Collection("users")
		results, err := collUser.Find(context.TODO(), bson.M{})
		if err != nil {
			panic(err)
		}

		for results.Next(context.TODO()) {
			var user models.User
			results.Decode(&user)

			users = append(users, user)
		}

		return c.JSON(&fiber.Map{
			"users": users,
		})
	})

	app.Post("/users", func(c *fiber.Ctx) error {
		var user models.User
		c.BodyParser(&user)
		fmt.Println(user)
		collUser := clientMgo.Database("pr-testgo").Collection("users")

		_, errIns := collUser.InsertOne(context.TODO(), bson.D{
			{Key: "name", Value: user.Name},
			{Key: "lastName", Value: user.LastName},
			{Key: "documentation", Value: user.Documentation},
			{Key: "email", Value: user.Email},
			{Key: "phone", Value: user.Phone},
		})

		if errIns != nil {
			panic(errIns)
		}

		return c.JSON(&fiber.Map{
			"data": "creando usuario",
		})
	})

	app.Listen(":" + port)
	fmt.Println("Server on port " + port)
}
