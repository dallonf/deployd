describe('404s', function(){
  it('should not prevent a server from responding', function(done) {
    this.timeout(5000);

    var tests = 50;
    var remaining = tests;

    while(tests--) {
      dpd('/').post({foo: 'bar'}, function (res, err) {
        remaining--;
        if(!remaining) {
          done();
        }
      });
    }
  });
});

describe('Network errors', function() {
  it('should not return an empty string as the exception', function(done) {
    _dpd.ajax('http://0.0.0.0:0000/does-not-exist', {
      method: 'GET',
      success: function() {
        assert.fail("A request to http://0.0.0.0:0000/does-not-exist somehow succeeded");
      },
      error: function(result) {
        expect(result).not.to.equal('');
      }
    })
  });
});