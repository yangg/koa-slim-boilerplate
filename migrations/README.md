
https://db-migrate.readthedocs.io/en/latest/API/SQL/

## Add table
```js
exports.up = function (db) {
  return db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    name: 'string',
    uname: { type: 'string', length: 50, comment: 'some column description' },
    height: 'decimal',
    desc: 'text',
    tags: 'json',
    tags22: 'jsonb',
    created_at: { type: 'timestamp', timezone: true },
    updated_at: { type: 'timestamp', timezone: true },
    deleted_at: { type: 'timestamp', timezone: true }
  })
}

exports.down = function (db) {
  return db.dropTable('users')
}
```

## Change Column
addColumn(tableName, columnName, columnSpec, callback)
