export default `
	type Query {
		"Create a new User"
		createUser(user: UserInput): CurrentUser
		currentUser(username: String, password: String): CurrentUser
		"""Obtain an authorization token for the specified User
		Tokens are valid for 1 hour"""
		auth(username: String!, password: String!): String,
		question(id: ID): Question,
		questions: [Question]
	}

	"Required information to register a new user"
	input UserInput {
		firstName: String
		lastName: String
		"Unique username"
		username: String
		"Valid email"
		email: String
		"User's date of birth, formatted as mm/dd/yyyy"
		birthdate: String
		"Password with at least one capital letter, number, and special character"
		password: String
		"Confirm the password"
		confirmPassword: String
	}

	"Information visible to GroupMates and MatchedUsers, but not SuggestedUsers"
	type UserDetails {
		"URL of the user's instagram profile"
		instagramLink: String
	}

	"The current logged in user"
	type CurrentUser implements GroupMember {
		id: ID
		firstName: String
		lastName: String
		username: String
		email: String
		birthdate: String
		groups: [UserGroup]
		group(id: ID): UserGroup
		"Start a new Group"
		createGroup(description: String): UserGroup
		details: UserDetails
		setInstagramLink(value: String): String
		"Register a new Question for Users to answer"
		createQuestion(
			text: String,
			answers: [String]
		): Question
		"Select an answer for a Question"
		answerQuestion(
			"The ID of the Question"
			id: ID,
			"The ID of the selected answer"
			choice: ID
		): String
		"Rate preference for the selected answer"
		rateAnswer(
			"The ID of the Question"
			question: ID,
			"The ID of the Answer"
			answer: ID,
			"""The rating for the selected Answer
			0: Unacceptable
			1-5: Preference Rating"""
			rating: Int): String
		"The Group in which the CurrentUser is currently searching for housemates"
		activeGroup: ActiveGroup
		"Select the Group with which to search"
		setActiveGroup(id: ID): String
	}

	"A fellow member of a Group"
	type GroupMate implements GroupMember {
		id: ID
		firstName: String
		lastName: String
		details: UserDetails
	}

	"The CurrentUser or a Groupmate"
	interface GroupMember {
		id: ID
		firstName: String
		lastName: String
		details: UserDetails
	}

	"A member of a Group with whom the CurrentUser has matched"
	type MatchedUser {
		id: ID
		firstName: String
		lastName: String
		details: UserDetails
	}

	"A member of a Group which has been suggested for the CurrentUser's Active Group"
	type SuggestedUser {
		id: ID
		firstName: String
	}

	"A Group for which the Current User is a member"
	type UserGroup {
		id: ID
		creator: GroupMember
		members: [GroupMember]
		description: String
		addMembers(
			"List of the specified members' ids"
			members: [String]
		): String
	}

	"A Group with which the CurrentUser is currently searching for housemates"
	type ActiveGroup {
		id: ID
		creator: GroupMember
		members: [GroupMember]
		description: String
		addMembers(
			"List of the specified members' ids"
			members: [String]
		): String
		"Request a new Group with high compatibility with this ActiveGroup"
		suggestion: SuggestedGroup
		"Get the specified previously suggested Group"
		suggested(
			"The id of a previously suggested Group"
			id: ID
		): SuggestedGroup
		"Groups with whom this Group has mutually approved"
		matches: [[MatchedGroup]]
	}

	"A Group that has been suggested for the ActiveGroup"
	type SuggestedGroup {
		id: ID
		members: [SuggestedUser]
		description: String
		"Register the CurrentUser's approval of this Group"
		like: String
		"Register the CurrentUser's disapproval of this Group"
		dislike: String
	}

	"A Group with whom the ActiveGroup has mutually approved"
	type MatchedGroup {
		id: ID
		members: [MatchedUser]
		description: String
	}

	"A Question to be answered by Users"
	type Question {
		id: ID,
		text: String,
		"The Question is required for all Users"
		required: Boolean,
		answers: [Answer]
	}

	type Answer {
		id: ID,
		text: String,
		"""0: Unacceptable
		1-5: Preference Rating"""
		rating: Int
	}
`
