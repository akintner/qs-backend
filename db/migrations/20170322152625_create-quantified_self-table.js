exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE quantified_self(
    id SERIAL PRIMARY KEY NOT NULL,
    food TEXT,
    created_at TIMESTAMP
  )`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE quantified_self`;
  return knex.raw(dropQuery);
};