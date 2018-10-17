---
layout: page
title: Example Interactions
permalink: example
---

# Example Interactions

## Create a User
```
mutation CreateUser($ui : UserInput!) {
  createUser(user : $ui)
}
```
```
{
	"ui": {
		"firstName": "",
		"lastName": "",
		"username": "",
		"email": "",
		"birthdate": "",
		"password": "",
		"confirmPassword": ""
	}
}
```
