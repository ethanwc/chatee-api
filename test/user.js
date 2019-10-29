const chai = require("chai");
const request = require("supertest");
const app = require("../src/config/server/server").default;
const UserModel = require("../src/components/User/model").default;
chai.should();

/**
 * Created user id
 */
let userId = undefined;
/**
 * User tests
 */

describe("User", () => {
  it("get all users", done => {
    request(app)
      .get("/v1/users")
      .set("x-access-token", global.token)
      .expect(res => {
        res.status.should.equal(200);
        res.body.should.be.an("array");
      })
      .end(done);
  });

  it("create new user", done => {
    const newUser = {
      email: "new.user@gmail.com",
      name: "John Doe"
    };

    request(app)
      .post("/v1/users")
      .send(newUser)
      .set("x-access-token", global.token)
      .expect(res => {
        res.status.should.equal(201);
        res.body.should.have.property("email");
        userId = res.body._id;
      })
      .end(done);
  });

  it("add user to new chat", done => {
    const fakeChat = {
      chatid: "fakechat1234",
      userid: userId
    };
    request(app)
      .post("/v1/users/addChat")
      .send(fakeChat)
      .set("x-access-token", global.token)
      .expect(res => {
        res.status.should.equal(200);
        res.body.should.have.property("chats");
      })
      .end(done);
  });

  it("remove user from chat", done => {
    const fakeChat = {
      chatid: "fakechat1234",
      userid: userId
    };
    request(app)
      .post("/v1/users/removeChat")
      .send(fakeChat)
      .set("x-access-token", global.token)
      .expect(res => {
        res.status.should.equal(200);
        res.body.should.have.property("chats");
      })
      .end(done);
  });
});

/**
 * clear database after tests
 */
after(async () => {
  try {
    await UserModel.collection.drop();
  } catch (error) {
    console.log(
      "Something went wrong after tests, seems your database doesnt cleaned",
      error
    );
  }
});
