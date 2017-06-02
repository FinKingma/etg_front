const pact = require('@pact-foundation/pact-node')
const path = require('path')
const opts = {
  pactUrls: [path.resolve(__dirname, './pacts/exploratorytestinggame-mapmakerapi.json')],
  pactBroker: 'http://54.197.31.162:80/',
  //pactBrokerUsername: 'dXfltyFMgNOFZAxr8io9wJ37iUpY42M',
  //pactBrokerPassword: 'O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1',
  //tags: ['prod', 'test'],
  consumerVersion: '8.0.0'
}

pact.publishPacts(opts)
  .then(() => {
    console.log('Pact contract publishing complete!')
    console.log('')
    console.log('Head over to https://test.pact.dius.com.au/ ')
    console.log('to see your published contracts.')
  })
  .catch(e => {
    console.log('Pact contract publishing failed: ', e)
  })