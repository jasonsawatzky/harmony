
## Type Query



| Field | Type | Arguments | Description |
|-------|------|-----------|-------------|
| createUser | CurrentUser | user: UserInput  | Create a new User |
| currentUser | CurrentUser | username: String , password: String  |  |
| auth | String | username: null , password: null  | Obtain an authorization token for the specified User, Tokens are valid for 1 hour |
| question | Question | id: ID  |  |
| questions | List< Question > |  |  |

## Input UserInput

Required information to register a new user

| Field | Type | Description |
|-------|------|-------------|
  | firstName | String |  |
  | lastName | String |  |
  | username | String | Unique username |
  | email | String | Valid email |
  | birthdate | String | User's date of birth, formatted as mm/dd/yyyy |
  | password | String | Password with at least one capital letter, number, and special character |
  | confirmPassword | String | Confirm the password |

## Interface GroupMember

The CurrentUser or a Groupmate

| Field | Type | Arguments | Description |
|-------|------|-----------|-------------|
| id | ID |  |  |
| firstName | String |  |  |
| lastName | String |  |  |
| details | UserDetails |  |  |

## Type CurrentUser implements GroupMember

The current logged in user

| Field | Type | Arguments | Description |
|-------|------|-----------|-------------|
| id | ID |  |  |
| firstName | String |  |  |
| lastName | String |  |  |
| username | String |  |  |
| email | String |  |  |
| birthdate | String |  |  |
| groups | List< UserGroup > |  |  |
| group | UserGroup | id: ID  |  |
| createGroup | UserGroup | description: String  | Start a new Group |
| details | UserDetails |  |  |
| setInstagramLink | String | value: String  |  |
| createQuestion | Question | text: String , answers: List< String >  | Register a new Question for Users to answer |
| answerQuestion | String | id: ID , choice: ID  | Select an answer for a Question |
| rateAnswer | String | question: ID , answer: ID , rating: Int  | Rate preference for the selected answer |
| activeGroup | ActiveGroup |  | The Group in which the CurrentUser is currently searching for housemates |
| setActiveGroup | String | id: ID  | Select the Group with which to search |

## Type GroupMate implements GroupMember

A fellow member of a Group

| Field | Type | Arguments | Description |
|-------|------|-----------|-------------|
| id | ID |  |  |
| firstName | String |  |  |
| lastName | String |  |  |
| details | UserDetails |  |  |

## Type SuggestedUser

A member of a Group which has been suggested for the CurrentUser's Active Group

| Field | Type | Arguments | Description |
|-------|------|-----------|-------------|
| id | ID |  |  |
| firstName | String |  |  |

## Type MatchedUser

A member of a Group with whom the CurrentUser has matched

| Field | Type | Arguments | Description |
|-------|------|-----------|-------------|
| id | ID |  |  |
| firstName | String |  |  |
| lastName | String |  |  |
| details | UserDetails |  |  |

## Type UserDetails

Information visible to GroupMates and MatchedUsers, but not SuggestedUsers

| Field | Type | Arguments | Description |
|-------|------|-----------|-------------|
| instagramLink | String |  | URL of the user's instagram profile |

## Type UserGroup

A Group for which the Current User is a member

| Field | Type | Arguments | Description |
|-------|------|-----------|-------------|
| id | ID |  |  |
| creator | GroupMember |  |  |
| members | List< GroupMember > |  |  |
| description | String |  |  |
| addMembers | String | members: List< String >  |  |

## Type ActiveGroup

A Group with which the CurrentUser is currently searching for housemates

| Field | Type | Arguments | Description |
|-------|------|-----------|-------------|
| id | ID |  |  |
| creator | GroupMember |  |  |
| members | List< GroupMember > |  |  |
| description | String |  |  |
| addMembers | String | members: List< String >  |  |
| suggestion | SuggestedGroup |  | Request a new Group with high compatibility with this ActiveGroup |
| suggested | SuggestedGroup | id: ID  | Get the specified previously suggested Group |
| matches | List< Match > |  | Groups with whom this Group has mutually approved |
| match | Match | id: ID  |  |

## Type SuggestedGroup

A Group that has been suggested for the ActiveGroup

| Field | Type | Arguments | Description |
|-------|------|-----------|-------------|
| id | ID |  |  |
| members | List< SuggestedUser > |  |  |
| description | String |  |  |
| like | String |  | Register the CurrentUser's approval of this Group |
| dislike | String |  | Register the CurrentUser's disapproval of this Group |

## Type MatchedGroup

A Group with whom the ActiveGroup has mutually approved

| Field | Type | Arguments | Description |
|-------|------|-----------|-------------|
| id | ID |  |  |
| members | List< MatchedUser > |  |  |
| description | String |  |  |

## Type Question

A Question to be answered by Users

| Field | Type | Arguments | Description |
|-------|------|-----------|-------------|
| id | ID |  |  |
| text | String |  |  |
| required | Boolean |  | The Question is required for all Users |
| answers | List< Answer > |  |  |

## Type Answer



| Field | Type | Arguments | Description |
|-------|------|-----------|-------------|
| id | ID |  |  |
| text | String |  |  |
| rating | Int |  | 0: Unacceptable, 1-5: Preference Rating |

## Type Match

A collection of Groups that have mutually approved of each other

| Field | Type | Arguments | Description |
|-------|------|-----------|-------------|
| id | ID |  |  |
| groups | List< MatchedGroup > |  |  |
| conversation | List< Message > |  |  |
| message | Message | text: String  |  |

## Type Message

A message from a user to a Match

| Field | Type | Arguments | Description |
|-------|------|-----------|-------------|
| sender | MatchedUser |  |  |
| text | String |  |  |
| time | Date |  |  |
