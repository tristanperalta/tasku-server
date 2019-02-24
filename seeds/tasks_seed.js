
exports.seed = function(knex, Promise) {
  return knex('tasks').del()
    .then(function () {
      return knex('tasks').insert([
        {note: 'cook'},
        {note: 'buy food'},
        {note: 'got to work'},
        {note: 'workout'},
      ]);
    });
};
