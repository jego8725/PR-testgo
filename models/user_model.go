package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	Id            primitive.ObjectID `json:"_id" bson:"_id"`
	Name          string             `json:"name"`
	LastName      string             `json:"lastName"`
	Documentation int                `json:"documentation"`
	Email         string             `json:"email"`
	Phone         int                `json:"phone"`
}
