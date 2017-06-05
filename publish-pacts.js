const pact = require('@pact-foundation/pact-node')
const path = require('path')
if (!process.env.PACTBROKERURL) throw new Error('Please specify where the pactbroker can be found with PACTBROKERURL');
const opts = {
  pactUrls: [path.resolve(__dirname, './pacts/exploratorytestinggame-mapmakerapi.json')],
  pactBroker: process.env.PACTBROKERURL,
  //pactBrokerUsername: 'dXfltyFMgNOFZAxr8io9wJ37iUpY42M',
  //pactBrokerPassword: 'O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1',
  //tags: ['prod', 'test'],
  consumerVersion: '8.0.0'
}

pact.publishPacts(opts)
  .then(() => {
    console.log('Pact contract publishing complete!')
    console.log('')
    console.log('Head over to ' + process.env.PACTBROKERURL)
    console.log('to see your published contracts.')
  })
  .catch(e => {
    console.log('Pact contract publishing failed: ', e)
  })