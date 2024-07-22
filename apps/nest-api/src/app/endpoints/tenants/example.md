query {
  tenants (page:1, pageSize: 1000, search:{}, sort:{}) {
    tenants{
      id
    }
    count
  }
}


mutation {
  createTenant(input: {
    name: "tenant1"
  }) {
    id
  }
}
