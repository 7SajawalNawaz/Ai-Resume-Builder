
require('dotenv').config() 

const app = require('./api/index')

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Local server running on port ${PORT}`)
})
