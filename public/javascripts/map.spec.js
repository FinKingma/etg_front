/*eslint-disable*/
(function() {

  describe("map", function() {

    var client, provider

    beforeAll(function(done) {
      provider = Pact({ consumer: 'ExploratoryTestingGame', provider: 'MapMakerApi' })

      // required for slower Travis CI environment
      setTimeout(function () { done() }, 2000)

      // Required if run with `singleRun: false`
      provider.removeInteractions()
    })

    afterAll(function (done) {
      provider.finalize()
        .then(function () { done() }, function (err) { done.fail(err) })
    })

    describe("sayHello", function () {
      beforeAll(function (done) {
        provider.addInteraction({
          uponReceiving: 'request for an awesome map',
          withRequest: {
            method: 'GET',
            path: '/api/mapmaker',
            headers: {
                'features': '30',
                'bugs':'4'
            }
          },
          willRespondWith: {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: {
                "posY0": {
                    "posX0": {
                        "pathRight": Pact.Matchers.term({matcher: "^(Working|Broken)$", generate: "Working"}),
                        "pathDown": Pact.Matchers.term({matcher: "^(Working|Broken)$", generate: "Working"})
                    }
                }
            }
          }
        })
        .then(function () { done() }, function (err) { done.fail(err) })
      })

      it("should say hello", function(done) {
        //Run the tests
        var map = new Map(function(data) {
            expect(data).toBeDefined();
            expect(data["posY0"]["posX0"]["pathRight"]).toBe("Working");
            done();
        });
      })

      // verify with Pact, and reset expectations
      it('successfully verifies', function(done) {
        provider.verify()
          .then(function(a) {
              sendToBroker('http://54.197.31.162/',_interactions);
                done()
          }, function(e) {
            done.fail(e)
          })
      })
    })
  })
})()

function sendToBroker(baseurl,interactions) {
    var xhr = new XMLHttpRequest();
    var url = baseurl+'/pacts/provider/MapMakerApi/consumer/ExploratoryTestingGame/version/8.0.0';
    xhr.onload = function(event) {
        console.log('succesfully send to pact broker.');
    };
    xhr.onerror = function() {
        console.log('not so succesfully send to pact broker.');
    };
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({interactions: interactions}));
}