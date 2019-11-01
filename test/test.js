const chai = require("chai");
const request = require("supertest");
const app = require("../src/config/server/server").default;
const UserModel = require("../src/components/User/model").default;
chai.should();
const user = {
  email: "test@mail.com",
  password: "test123"
};
let token = undefined;

describe("/auth", () => {
  it("sign up", done => {
    request(app)
      .post("/auth/signup")
      .send(user)
      .expect("Content-type", /json/)
      .expect(res => {
        res.body.status.should.equal(201);
        res.body.logged.should.equal(true);
        res.body.message.should.be.a("string");
        token = res.body.token;
      })
      .end(done);
  });
  it("sign up user with existing email", done => {
    request(app)
      .post("/auth/signup")
      .send(user)
      .expect("Content-type", /json/)
      .expect(res => {
        res.body.status.should.equal(400);
      })
      .end(done);
  });
  it("login to app", done => {
    request(app)
      .post("/auth/login")
      .send(user)
      .expect("Content-type", /json/)
      .expect(res => {
        res.body.status.should.equal(200);
        res.body.logged.should.equal(true);
        res.body.message.should.be.a("string");
        token = res.body.token;
      })
      .end(done);
  });
});

describe("/v1/users", () => {
  it("get user by id", done => {
    request(app)
      .get(`/v1/users/${user.email}`)
      .set("x-access-token", token)
      .expect(res => {
        res.body.friends.should.be.a("array");
        res.body.email.should.be.a("string");
      })
      .end(done);
  });

  it("update profile", done => {
    const profileData = {
      fakeData: "1234"
    };
    request(app)
      .patch(`/v1/users/updateProfile`)
      .send(profileData)
      .set("x-access-token", token)
      .expect(res => {
        res.body.friends.should.be.a("array");
        res.body.email.should.be.a("string");
      })
      .end(done);
  });
});

/**
 * API tests
 */

/**
 * clear database after tests
 */
after(async () => {
  try {
    await UserModel.collection.drop();
  } catch (error) {
    console.log("Failed to clear Users from DB");
  }
});
