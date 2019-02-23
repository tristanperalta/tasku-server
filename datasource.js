const tasks = [
  {
    id: 1,
    note: 'Going to work',
    date: (new Date(2019, 1, 1)).toISOString()
  },
  {
    id: 2,
    note: 'Buy food',
    date: (new Date(2019, 1, 2)).toISOString()
  },
  {
    id: 3,
    note: 'Cook',
    date: (new Date(2019, 1, 3)).toISOString()
  },
  {
    id: 4,
    note: 'Workout',
    date: (new Date(2019, 2, 1)).toISOString()
  }
]

module.exports = { tasks }
