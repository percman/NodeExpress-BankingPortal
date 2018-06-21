const R = require('ramda');

describe('Savings Route', () => {
  let stack;
  let handleSpy;

  before(() => {
    stack = routeStack('/', 'get');
    if (typeof stack === 'undefined') {
      handleSpy = {
        restore: () => {}
      };
    } else {
      handleSpy = sinon.spy(stack, 'handle');
    }
  });

  it('should contain the index route @app-get-index-route', () => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');
    const req = mockReq();
    const res = mockRes();

    assert(typeof handleSpy === 'function', 'The credit get route has not been created.');
    handleSpy(req, res);
    assert(res.render.called, 'The index route may have not been created.');
    assert(
      res.render.firstCall.args[0] === 'account',
      'The index route does not seem to be rendering the `index` view.'
    );
    assert(typeof res.render.firstCall.args[1] === 'object', 'res.render maybe missing arguments');
    assert(
      R.has('title')(res.render.firstCall.args[1]),
      'The index route maybe missing an object with a account key value pair.'
    );
  });

  after(() => {
    handleSpy.restore();
  });
});