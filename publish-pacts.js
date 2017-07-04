const pact = require('@pact-foundation/pact-node')
const path = require('path')
if (!process.env.PACTBROKERURL) throw new Error('Please specify where the pactbroker can be found with PACTBROKERURL');

const opts = {
  pactUrls: [path.resolve(__dirname, './pacts/exploratorytestinggame-mapmakerapi.json')],
  pactBroker: process.env.PACTBROKERURL,
  //pactBrokerUsername: 'DPwCt3YC1WeNEX89vy4TAZbzoWkL5',
  //pactBrokerPassword: 'uUZJtUmyOnutSoErGzTrGAXqmHMoy',
  tags: [process.env.TAG],
  consumerVersion: getDateTime()
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

  function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }   
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }   
    var dateTime = year+month+day+hour+minute+second;   
     return dateTime;
}