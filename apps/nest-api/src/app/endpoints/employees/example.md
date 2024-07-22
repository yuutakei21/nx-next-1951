query {
  users (page:1, pageSize: 1000, search:{}, sort:{}) {
    users{
      id
    }
    count
  }
}


mutation {
  createUser(input: {
    role: "USER",
    email:"testuser@gmail.com",
    password:"aasdasd"
    
  }) {
    id
  }
}
