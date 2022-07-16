const express = require('express')

const router = require('./routes/index')
const config = require('./config/index')
const { connectMongo } = require('./config/mongo')

const app = express()
const port = config.app.port || 3000

async function main() {
  
  await connectMongo();

  app.use(express.json())

  app.use(router)
  app.use((error, _, res) => {
    res.send(error);
  })

  app.listen(port, () => console.log(`App is listening on http://localhost:${port}`))

}

main().catch((error) => console.log(error))
