const Datastore = require('nedb')
const DataLoader = require('dataloader')

const dbNames = module.exports.dbNames = [
  'companies',
  'users',
  'posts',
]

const dbPath = module.exports.dbPath = dbName => `${__dirname}/db/${dbName}.db`

module.exports.connect = () => {
  return dbNames
    .reduce((acc, dbName) => {
      acc[dbName] = new Datastore({
        filename: dbPath(dbName),
        autoload: true,
      })
      return acc
    }, {})
}

module.exports.createLoaders = (db) => {
  return dbNames
    .reduce((acc, dbName) => {
      acc[dbName] = new DataLoader((ids) => {
        return new Promise((resolve, reject) => {
          db[dbName].find({ _id: { $in: ids } }, (err, docs) => {
            if (err) {
              reject(err)
            } else {
              resolve(docs)
            }
          })
        })
      })
      return acc
    }, {})
}
