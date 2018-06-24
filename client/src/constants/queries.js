export const createUser = `
	mutation {
		createUser(user:{
			name:"Test User"
			email:"abc@123.io"
			password:"hi"
			birthdate:"01/12/1994"
			username:"testuser"
		})
	}
`