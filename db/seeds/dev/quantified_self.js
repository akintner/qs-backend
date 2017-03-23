exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE quantified_self RESTART IDENTITY')
  .then(() => {
    return Promise.all([
      knex.raw(
        'INSERT INTO quantified_self (food, created_at) VALUES (?, ?)',
        ["{name: 'taco (crunchy beef)', calories: '155'}", new Date]
      ),
      knex.raw(
        'INSERT INTO quantified_self (food, created_at) VALUES (?, ?)',
        ["{name: 'banana', calories: '105'}", new Date]
      ),
      knex.raw(
        'INSERT INTO quantified_self (food, created_at) VALUES (?, ?)',
        ["{name: 'chocolate cake', calories: '452'}", new Date]
      )
    ]);
  });
};