
exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return Promise.all([
        knex('users').insert({
          email: 'user@example.com',
          password_digest: 'password',
          api_key: '123api456key789'
        }, 'id')
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
