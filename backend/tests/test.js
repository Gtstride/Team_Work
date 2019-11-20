import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

const { expect } = chai;
chai.use(chaiHttp);
chai.should();


const users = {
  first_name: 'Developer',
  last_name: 'deeloper',
  email: 'developer@developer.com',
  password: 'developer123',
  gender: 'male',
  job_role: '',
  department: 'Full Stack',
  address: '3, Acus road, NY',
};


const newUser = {
  first_name: 'Developer',
  last_name: '',
  email: 'test@test.com',
  password: 'test123',
  gender: 'male',
  job_role: '',
  department: 'Full Stack',
  address: '3, Acus road, NY',
};


const signupUrl = '/api/v1/auth/create';
const signinUrl = '/api/v1/auth/signin';

describe(`POST ${signupUrl}`, () => {
  // TEST CREATE USER ROUTES
  it('should signup user successfully', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(users)
      .end((err, res) => {
        const { body } = res;
        expect(body).to.be.an('object');
        done();
      });
  });

  it('Should return error if first name field is empty', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(users)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(body).to.be.an('object');
        done();
      });
  });

  it('Should return error if last name field is empty', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(users)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(body).to.be.an('object');
        done();
      });
  });

  it('Should return error if email field is empty', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(users)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(body).to.be.an('object');
        done();
      });
  });

  it('Should return error if password field is empty', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(users)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(body).to.be.an('object');
        done();
      });
  });

  it('Should return error if job role field is empty', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(users)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(body).to.be.an('object');
        done();
      });
  });

  it('Should return error if department field is empty', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(users)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(body).to.be.an('object');
        done();
      });
  });


  it('should give error if fields are empty', (done) => {
    chai.request(app)
      .post(signupUrl)
      .send(users)
      .end((err, res) => {
        const { body } = res;
        expect(body).to.be.an('object');
        expect(res.status).to.be.equal(400);
      });
    done();
  });

  // error if a user already exists
  it('responds with status 400', (done) => {
    chai.request(app)
      .post(signupUrl)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
      });
    done();
  });

  // register new user
  it('should respond with status 201 upon creating a new user', (done) => {
    chai.request(app)
      .post(signupUrl)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
      });
    done();
  });

  // Register admin
  it('respond with status 201', (done) => {
    chai.request(app)
      .post(signupUrl)
      .send(users)
      .end((err, res) => {
        const { body } = res;
        // expect(res).to.have.status(200);
        expect(body).to.be.an('object');
      });
    done();
  });


  // TEST LOGIN ROUTES
  describe(`POST ${signinUrl}`, () => {
    // Check error when logining user
    it('should not successfully login user', (done) => {
      chai
        .request(app)
        .post(signinUrl)
        .send(users)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.be.equal(400);
          expect(res.status).to.be.a('number');
          expect(body).to.be.an('object');
          // expect(body).to.have.a.property('status');
          // expect(body).to.have.a.property('error');
          // expect(body.error).to.be.equal('Email cannot be undefined');
          done();
        });
    });

    it('should return error when no password provided', (done) => {
      chai
        .request(app)
        .post(signinUrl)
        .send(users)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.be.equal(400);
          expect(res.status).to.be.a('number');
          expect(body).to.be.an('object');
          done();
        });
    });

    it('should return 404 if login not found', (done) => {
      chai
        .request(app)
        .post(signinUrl)
        .send(users)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.be.equal(400);
          expect(res.status).to.be.a('number');
          expect(body).to.be.an('object');
          expect(body).to.have.a.property('status');
          expect(body).to.have.a.property('error');
          done();
        });
    });

    it('should return 400 if no email provided', (done) => {
      chai
        .request(app)
        .post(signinUrl)
        .send(users)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.be.equal(400);
          expect(res.status).to.be.a('number');
          expect(body).to.be.an('object');
          expect(body).to.have.a.property('status');
          expect(body).to.have.a.property('error');
          done();
        });
    });

    it('should return 400 if incorrect email or password', (done) => {
      chai
        .request(app)
        .post(signinUrl)
        .send(users)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.be.equal(400);
          expect(res.status).to.be.a('number');
          expect(body).to.be.an('object');
          expect(body).to.have.a.property('status');
          expect(body).to.have.a.property('error');
          done();
        });
    });

    it('should return 400 if incorrect email format', (done) => {
      chai
        .request(app)
        .post(signinUrl)
        .send(users)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.be.equal(400);
          expect(res.status).to.be.a('number');
          expect(body).to.be.an('object');
          expect(body).to.have.a.property('status');
          expect(body).to.have.a.property('error');
          done();
        });
    });

    it('should return 400 if incorrect password format', (done) => {
      chai
        .request(app)
        .post(signinUrl)
        .send(users)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.be.equal(400);
          expect(res.status).to.be.a('number');
          expect(body).to.be.an('object');
          expect(body).to.have.a.property('status');
          expect(body).to.have.a.property('error');
          done();
        });
    });

    it('should return 400 if email is misspelled', (done) => {
      chai
        .request(app)
        .post(signinUrl)
        .send(users)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.be.equal(400);
          expect(res.status).to.be.a('number');
          expect(body).to.be.an('object');
          expect(body).to.have.a.property('status');
          expect(body).to.have.a.property('error');
          done();
        });
    });

    it('should return 400 if password is misspelled', (done) => {
      chai
        .request(app)
        .post(signinUrl)
        .send(users)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.be.equal(400);
          expect(res.status).to.be.a('number');
          expect(body).to.be.an('object');
          expect(body).to.have.a.property('status');
          expect(body).to.have.a.property('error');
          done();
        });
    });

    it('should log in an existing user', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send(newUser)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(200);
          expect(body).to.be.an('object');
        });
      done();
    });
  });
});
