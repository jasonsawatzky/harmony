---
layout: page
title: Example Interactions
permalink: example.html
---

# Example Interactions
The user interface for harmony is still in development. Users can experiment with the system and develop integrations by interacting directly with the GraphQL API.

[GraphQL Playground](https://api.harmonyapp.org/graphql)

To view available query schema in GraphQL Playground, select Schema on the right.

Below are a series of example interactions, demonstrating a subset of harmony's features. Because of the dynamic nature of GraphQL, these queries can be combined and extended.

## Create a User
Add a new user to the system

All fields must be populated. Email must be valid. Birthdate must match format "1/1/2000".

A confirmation message will be sent to the specified address.

```
mutation CreateUser($ui : UserInput!) {
  createUser(user : $ui)
}
```

User parameters must be specified as Query Variables. In GraphQL Playground, select "Query Variables" on the bottom left, and include the following:

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

## Login User
Request a session token

```
{
	session(username : "", password : "")
}
```
This will return a token. All privileged requests require a valid session token as HTTP header X-Access-Token.

In GraphQL Playground, select "Query Variables" on the bottom left, and include the session token in the following:
```
{
  "X-Access-Token": ""
}
```

## User Information
The currentUser query is the entry point for user queries in the application. All permitted user information can be queried from this top level query.

A subset of available user data is requested here:
```
{
	currentUser {
		firstName,
		lastName,
		username,
		email,
		birthdate
	}
}
```

## User Groups

Users can create new Groups:
```
{
  currentUser {
    createGroup(description : "")
  }
}
```

Users can add members to Groups they created:
```
{
  currentUser {
    group(id: "") {
      addMembers(memberIds: ["", "", ...])
    }
  }
}
```

The current user can request the groups for which they are a member, as well as permitted group data for the current user.

```
{
	currentUser {
		groups {
      id,
      description,
      members {
        username
      }
    }
	}
}
```

Retrieving a specified group

```
{
	currentUser {
		group(id:"") {
      id,
      description,
      members {
        username
      }
    }
	}
}
```

## Setting the Active Group
The current user can set a group for which they are a member as their Active Group. This allows suggestions to be generated for the specified group.

```
{
	currentUser {
		setActiveGroup(id: "")
	}
}
```

## Questions
Users and Groups are matched based on their preferences regarding questions.

Users can add new questions to the system:

```
{
	currentUser {
		createQuestion(text: "", required: "true/false", answers: ["", "", "", ...]) {
			id
		}
	}
}
```

Users can retrieve all Questions in the system:
```
{
	currentUser {
		questions {
			id,
			text,
      answers {
        text,
        id
      }
		}
	}
}
```

Retrieving a specified question:
```
{
	currentUser {
		question(id: "") {
      text,
      answers {
        text,
        id
      }
		}
	}
}
```

Users can answer a Question:
```
{
	currentUser {
		answerQuestion(id: "", choice : "answerId")
	}
}
```

Users can rate Answers to Questions 0-5:
```
{
	currentUser {
		rateAnswer(question: "", answer: "", rating: 0-5)
	}

}
```

## Matching
Users can request suggestions for their active group:
```
{
	currentUser {
		activeGroup {
			suggestion {
				id,
				description,
        members {
          username
        }
			}
		}
	}
}
```

Users can retrieve suggested Groups, as well as Like or Dislike them:
```
{
	currentUser {
		activeGroup {
			suggested(id: "") {
				description,
        like
			}
		}
	}
}
```

Users can retrieve their active Group's matches. Matched Groups have mutually Liked each other.

```
{
	currentUser {
		activeGroup {
			matches {
				description,
        members{
          id
        }
			}
		}
	}
}
```
