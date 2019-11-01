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
 * storing globals to access them in API requests
 */
global.token = "";
global.token2 = "";
let userid1 = undefined;
let userid2 = undefined;
/**
 * Authentication tests
 */
describe("Authentication", () => {
  it("sign up user 1", done => {
    request(app)
      .post("/auth/signup")
      .send(user1)
      .expect("Content-type", /json/)
      .expect(res => {
        res.body.status.should.equal(201);
        res.body.logged.should.equal(true);
        res.body.message.should.be.a("string");
        global.token = res.body.token;
      })
      .end(done);
  });

  it("sign up user 1 with existing email", done => {
    request(app)
      .post("/auth/signup")
      .send(user1)
      .expect("Content-type", /json/)
      .expect(res => {
        res.body.status.should.equal(400);
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
        global.token2 = res.body.token;
      })
      .end(done);
  });

  it("login to app", done => {
    request(app)
      .post("/auth/login")
      .send(user1)
      .expect("Content-type", /json/)
      .expect(res => {
        res.body.status.should.equal(200);
        res.body.logged.should.equal(true);
        res.body.message.should.be.a("string");
        global.token = res.body.token;
      })
      .end(done);
  });
});

describe("User", () => {
  it("create user 1", done => {
    const newUser = {
      email: "new.user1@gmail.com",
      name: "John Doe"
    };

    request(app)
      .post("/v1/users")
      .send(newUser)
      .set("x-access-token", global.token)
      .expect(res => {
        res.status.should.equal(201);
        res.body.should.have.property("email");
        userid1 = res.body._id;
      })
      .end(done);
  });

  it("create user 2", done => {
    const newUser = {
      email: "new.user2@gmail.com",
      name: "John Dope"
    };

    request(app)
      .post("/v1/users")
      .send(newUser)
      .set("x-access-token", global.token2)
      .expect(res => {
        res.status.should.equal(201);
        res.body.should.have.property("email");
        userid2 = res.body._id;
      })
      .end(done);
  });

  it("user 1 sends friend req to user 2", done => {
    const friendReq = {
      id: userid1,
      friendid: userid2
    };
    request(app)
      .post("/v1/users/addFriend")
      .send(friendReq)
      .set("x-access-token", global.token)
      .expect(res => {
        res.status.should.equal(200);
        res.body.should.have.property("email");
      })
      .end(done);
  });

  it("user 2 accepts user 1's friend request", done => {
    const handleReq = {
      id: userid1,
      friendid: userid2,
      accept: true
    };
    request(app)
      .post("/v1/users/handleFriend")
      .send(handleReq)
      .set("x-access-token", global.token)
      .expect(res => {
        res.status.should.equal(200);
        res.body.should.have.property("email");
      })
      .end(done);
  });

  it("user 1 removes user 2 from friends list", done => {
    const handleReq = {
      id: userid1,
      friendid: userid2
    };
    request(app)
      .post("/v1/users/removeFriend")
      .send(handleReq)
      .set("x-access-token", global.token)
      .expect(res => {
        res.status.should.equal(200);
        res.body.should.have.property("email");
      })
      .end(done);
  });
});

describe("chats", () => {
  let chatId = undefined;
  it("user1 creates a new chat", done => {
    const handleReq = {
      id: userid1
    };
    request(app)
      .post("/v1/chat")
      .send(handleReq)
      .set("x-access-token", global.token)
      .expect(res => {
        res.status.should.equal(201);
        chatId = res.body._id;
      })
      .end(done);
  });

  it("get chat by id", done => {
    request(app)
      .get(`/v1/chat/${chatId}`)
      .set("x-access-token", global.token)
      .expect(res => {
        res.status.should.equal(200);
        res.body.should.have.property("messages");
      })
      .end(done);
  });

  it("invite user2 to chat created by user1", done => {
    const chatInfo = {
      userid: userid2,
      chatid: chatId
    };
    request(app)
      .post(`/v1/chat/invite`)
      .send(chatInfo)
      .set("x-access-token", global.token)
      .expect(res => {
        res.status.should.equal(200);
      })
      .end(done);
  });
});

after(async () => {
  try {
    await UserModel.collection.drop();
  } catch (error) {
    console.log("Clearing Chats Failed", error);
  }
});
