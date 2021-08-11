const fs = require('fs')

fs.writeFileSync('./.env',
`REACT_APP_TRELLO_KEY=${process.env.REACT_APP_TRELLO_KEY}\n
REACT_APP_TRELLO_TOKEN=${process.env.REACT_APP_TRELLO_TOKEN}\n
REACT_APP_TRELLO_API_BASEURL=${process.env.REACT_APP_TRELLO_API_BASEURL}\n`)

console.log('.env built');