import mongoose from 'mongoose'
import { mongo } from './configs'

const mongoUrl = `mongodb://${mongo.host}:${mongo.port}/${mongo.dbName}`

// Creating mongodb connection

mongoose.connect(mongoUrl,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    console.log('err db connection', err)
    process.exit(0)
  }
  console.log('db connected')
})