const db = require('./connection')

function w(sql, method) {
  preparedSQL = db.prepare(sql)

  function wrapper(params)
}