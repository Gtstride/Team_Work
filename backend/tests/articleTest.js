import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

const { expect } = chai;
chai.use(chaiHttp);
chai.should();


const article = {
  title: '',
  article: '',
};

const createArticleUrl = '/api/v1/articles';


describe(`POST ${createArticleUrl}`, () => {
// TEST CREATE ARTICLE ROUTES

  it('should respond with a success message', (done) => {
    chai
      .request(app)
      .post(createArticleUrl)
      .send(article)
      .end((err, res) => {
        const { body } = res;
        expect(article).to.be.an('object');
        expect(body).to.be.a('array');
        done();
      });
  });

  // TEST UPDATE ARTICLE ROUTES
  // describe(`POST ${}`, () => {
  // });
});
