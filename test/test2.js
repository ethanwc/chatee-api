const chai = require("chai");
const request = require("supertest");
const app = require("../src/config/server/server").default;
const user1 = require("./fixtures/user1.json");
const user2 = require("./fixtures/user2.json");
const ChatModel = require("../src/components/Chat/model").default;
const UserModel = require("../src/components/User/model").default;
const MessageModel = require("../src/components/Message/model").default;
chai.should();

/**
 * Ensures that only the authenticated individual can perform operatinos with their own id.
 */
user1t = user2t = user1d = user2id = undefined;
/**
 * Authentication tests
 */
describe("Authentication - 2 users", () => {
  it("sign up user 1", done => {
    request(app)
      .post("/auth/signup")
      .send(user1)
      .expect("Content-type", /json/)
      .expect(res => {
        res.body.status.should.equal(201);
        res.body.logged.should.equal(true);
        res.body.message.should.be.a("string");
      })
      .end(done);
  });

  it("sign up user 2", done => {
    request(app)
      .post("/auth/signup")
      .send(user2)
      .expect("Content-type", /json/)
      .expect(res => {
        res.body.status.should.equal(201);
        res.body.logged.should.equal(true);
        res.body.message.should.be.a("string");
      })
      .end(done);
  });

  it("sign in user1", done => {
    request(app)
      .post("/auth/login")
      .send(user1)
      .expect("Content-type", /json/)
      .expect(res => {
        res.body.status.should.equal(200);
        res.body.logged.should.equal(true);
        res.body.message.should.be.a("string");
        user1t = res.body.token;
        user1id = res.body.id;
      })
      .end(done);
  });

  it("sign in user2", done => {
    request(app)
      .post("/auth/login")
      .send(user1)
      .expect("Content-type", /json/)
      .expect(res => {
        res.body.status.should.equal(200);
        res.body.logged.should.equal(true);
        res.body.message.should.be.a("string");
        user2t = res.body.token;
        user2id = res.body.id;
      })
      .end(done);
  });

  it("user1 creates a new chat with user1 id", done => {
    const info = {
      id: user1id
    };
    request(app)
      .post("/v1/chat")
      .send(info)
      .set("x-access-token", user1t)
      .expect(res => {
        res.status.should.equal(201);
      })
      .end(done);
  });

  it("user2 creates a new chat with user 1 id", done => {
    const info = {
      id: user1id
    };
    request(app)
      .post("/v1/chat")
      .send(info)
      .set("x-access-token", user2t)
      .expect(res => {
        res.status.should.equal(201);
      })
      .end(done);
  });
});

// after(async () => {
//   try {
//     await UserModel.collection.drop();
//   } catch (error) {
//     console.log("Clearing Chats Failed", error);
//   }
// });
