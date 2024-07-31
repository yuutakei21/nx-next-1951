query {
  login(user: {
    email:"testuser3@gmail.com",
    password:"123123ss"    
  }) {
    token
    user
    {
      email
      password
    }
  }
}
