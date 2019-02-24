exports.up = function(knex, Promise) {
  return knex.schema.createTable('tasks', (t) => {
    t.increments()
    t.string('note')
    t.datetime('createdAt').defaultTo(knex.fn.now())
    t.datetime('doneAt')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tasks')
};
