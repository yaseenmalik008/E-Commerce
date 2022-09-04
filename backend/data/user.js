import bcrypt from "bcryptjs"

const user = [
    {
        name : "Admin",
        email : "admin@example.com",
        password : bcrypt.hashSync('123456',10),
        isAdmin : true
    },
    {
		name: 'John Doe',
		email: 'john@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false,
	},
    {
        name  : "Jane Doe",
        email : "jane@example.com",
        password : bcrypt.hashSync('123456',10),
        isAdmin  : false, 
    },
];

console.log(user)

export default user