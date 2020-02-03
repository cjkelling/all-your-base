
exports.seed = function(knex) {
  return knex('locations').del() // delete all footnotes first
    .then(() => knex('users').del())
    .then(() => {
      return Promise.all([
        knex('users').insert({
          email: 'user@example.com',
          password_digest: 'password',
          api_key: '123api456key789'
        }, 'id')
        .then(user => {
          return knex('locations').insert([
            { name: 'Northglenn,CO', user_id: user[0] }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
