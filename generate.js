const Promise = require('bluebird')
const faker = require('faker')
const fs = require('fs')
const { dbNames, dbPath, connect } = require('./db')

dbNames
  .forEach((dbName) => {
    const file = dbPath(dbName)
    if (fs.existsSync(file)) {
      fs.unlinkSync(file)
    }
  })

const db = connect()
const cache = dbNames
  .reduce((acc, dbName) => {
    acc[dbName] = []
    return acc
  }, {})

function insert(name, object) {
  return new Promise((resolve, reject) => {
    db[name].insert(object, (err, result) => {
      if (err) {
        reject(err)
      } else {
        cache[name].push(result)
        resolve(result)
      }
    })
  })
}

function rnd(limit) {
  return Math.floor(Math.random() * limit)
}

function rndArr(arr) {
  return arr[rnd(arr.length)]
}

function generateAddress() {
  return {
    zipCode: faker.address.zipCode(),
    city: faker.address.city(),
    cityPrefix: faker.address.cityPrefix(),
    citySuffix: faker.address.citySuffix(),
    streetName: faker.address.streetName(),
    streetAddress: faker.address.streetAddress(),
    streetSuffix: faker.address.streetSuffix(),
    streetPrefix: faker.address.streetPrefix(),
    secondaryAddress: faker.address.secondaryAddress(),
    county: faker.address.county(),
    country: faker.address.country(),
    countryCode: faker.address.countryCode(),
    state: faker.address.state(),
    stateAbbr: faker.address.stateAbbr(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
  }
}

function generateCompanies() {
  return Promise.map(new Array(1000).fill(0), () =>
    insert('companies', {
      address: generateAddress(),
      suffixes: faker.company.suffixes(),
      companyName: faker.company.companyName(),
      companySuffix: faker.company.companySuffix(),
      catchPhrase: faker.company.catchPhrase(),
      bs: faker.company.bs(),
      catchPhraseAdjective: faker.company.catchPhraseAdjective(),
      catchPhraseDescriptor: faker.company.catchPhraseDescriptor(),
      catchPhraseNoun: faker.company.catchPhraseNoun(),
      bsAdjective: faker.company.bsAdjective(),
      bsBuzz: faker.company.bsBuzz(),
      bsNoun: faker.company.bsNoun(),
    })
  )
}

function generateUsers() {
  return Promise.mapSeries(new Array(1000).fill(0), () =>
    insert('users', {
      address: generateAddress(),
      company: rndArr(cache.companies)._id,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      findName: faker.name.findName(),
      jobTitle: faker.name.jobTitle(),
      prefix: faker.name.prefix(),
      suffix: faker.name.suffix(),
      title: faker.name.title(),
      jobDescriptor: faker.name.jobDescriptor(),
      jobArea: faker.name.jobArea(),
      jobType: faker.name.jobType(),
      avatar: {
        400: faker.image.avatar(),
        600: faker.image.avatar(),
        800: faker.image.avatar(),
      },
      followers: new Array(rnd(Math.min(cache.users.length, 10))).fill(0).map(() =>
        rndArr(cache.users)._id
      ),
    })
  )
}

function generatePosts() {
  return Promise.map(new Array(1000).fill(0), () =>
    insert('posts', {
      date: faker.date.past(),
      author: rndArr(cache.users)._id,
      title: faker.lorem.sentence(),
      text: faker.lorem.paragraphs(),
      likers: new Array(rnd(100)).fill(0).map(() =>
        rndArr(cache.users)._id
      ),
    })
  )
}

Promise.resolve()
  .then(generateCompanies)
  .then(generateUsers)
  .then(generatePosts)
  .catch(err => console.log(err))
