package model

type User struct {
	Name          string `json:"name"`
	LastName      string `json:"lastName"`
	Documentation int    `json:"documentation"`
	Email         string `json:"email"`
	Phone         int    `json:"phone"`
}
