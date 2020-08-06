//During the test the env variable is set to test
process.env.NODE_ENV = 'test';


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);

describe('patching', () => {

let token='';
  describe('/POST ', () => {
	  it('it should be able login', (done) => {
	  	let auth = {
	  		username: "rodger",
	  		password: "pass123"
	  	}
			chai.request(server)
		    .post('/api/v1/signin')
			.send(auth)
		    .end((err, res) => {
			  	res.should.have.status(200);
				res.body.should.be.a('object');
				  token=res.body.token

		      done();
		    });
	  });
	  it('it should POST for patching ', (done) => {
	  	let body = {
				json: {
					"baz": "qux",
					"foo": "bar"
				},
				patch: [
					{ "op": "replace", "path": "/baz", "value": "boo" },
					{ "op": "add", "path": "/hello", "value": ["world"] },
					{ "op": "remove", "path": "/foo" }
				]
	  	}
			chai.request(server)
			.post('/api/v1/user/patch')
			.set({ "Authorization": token })
			.send(body)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
		      done();

			});
			

	  });
	  it('it should not post for patching without token ', (done) => {
		  let body = {
			  json: {
				  "baz": "qux",
				  "foo": "bar"
			  },
			  patch: [
				  { "op": "replace", "path": "/baz", "value": "boo" },
				  { "op": "add", "path": "/hello", "value": ["world"] },
				  { "op": "remove", "path": "/foo" }
			  ]
		  }
		  chai.request(server)
			  .post('/api/v1/user/patch')
			  .send(body)
			  .end((err, res) => {
				  res.should.have.status(401);

				  done();
			  });
	  });

	  it('it should logout the user ', (done) => {

		  chai.request(server)
			  .get('/api/v1/signout')
			  .end((err, res) => {
				  res.should.have.status(401);

				  done();
			  });
	  });

  });
 /*
  * Test the /GET/:id route
  */
});

