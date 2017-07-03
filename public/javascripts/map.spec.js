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
            method: 'get',
            path: '/api/mapmaker',
            headers: {
                'features': '30',
                'bugs':'4'
            }
          },
          willRespondWith: {
            status: 200,
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
                done()
          }, function(e) {
            done.fail(e)
          })
      })
    })
  })
})()
