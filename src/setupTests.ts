import mongoose from 'mongoose'

afterAll(async () => {
  await mongoose.disconnect()
})
