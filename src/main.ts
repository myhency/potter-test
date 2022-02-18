import app from './app'

app.listen(process.env.OT_SERVER_PORT, () => {
  console.log(`App Server is running at http://localhost:${process.env.OT_SERVER_PORT}`)
})
