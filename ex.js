const express = require('express')
//const axios=require('axios').default;
const app = express()
app.use(express.static('./samples'));
const port = 4000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

