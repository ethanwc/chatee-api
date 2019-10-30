const chai = require("chai");
const request = require("supertest");
const app = require("../src/config/server/server").default;
const user = require("./fixtures/user.json");
const ChatModel = require("../src/components/Chat/model").default;
const UserModel = require("../src/components/User/model").default;
const MessageModel = require("../src/components/Message/model").default;

chai.should();

/**
 * storing globals to access them in API requests
 */
global.token = "";
let userId = undefined;
/**
 * Authentication tests
 */
describe("Authentication", () => {
  it("sign up", done => {
    request(app)
      .post("/auth/signup")
      .send(user)
      .expect("Content-type", /json/)
      .expect(res => {
        res.body.status.should.equal(201);
        res.body.logged.should.equal(true);
        res.body.message.should.be.a("string");
        global.token = res.body.token;
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
        global.token = res.body.token;
      })
      .end(done);
  });
});

describe("User", () => {
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

  it("get user by id", done => {
    request(app)
      .get(`/v1/users/${userId}`)
      .set("x-access-token", global.token)
      .expect(res => {
        res.status.should.equal(200);
        res.body.should.have.property("email");
      })
      .end(done);
  });

  let newChatid = undefined;

  it("create a new chat", done => {
    const fakeChat = {
      userid: userId
    };
    request(app)
      .post("/v1/chat")
      .send(fakeChat)
      .set("x-access-token", global.token)
      .expect(res => {
        res.status.should.equal(201);
        res.body.should.have.property("members");
        newChatid = res.body._id;
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
        newChatid = res.body._id;
      })
      .end(done);
  });
  let messageId = undefined;
  it("create message", done => {
    const messageData = {
      id: newChatid,
      type: "text",
      message: "test1234",
      author: userId
    };
    request(app)
      .post("/v1/message")
      .send(messageData)
      .set("x-access-token", global.token)
      .expect(res => {
        res.status.should.equal(201);
        messageId = res.body._id;
      })
      .end(done);
  });

  it("edit message", done => {
    const messageData = {
      id: messageId,
      type: "text",
      message: "test12345678",
      author: userId
    };

    request(app)
      .patch("/v1/message")
      .send(messageData)
      .set("x-access-token", global.token)
      .expect(res => {
        res.status.should.equal(200);
      })
      .end(done);
  });

  it("delete message", done => {
    request(app)
      .delete(`/v1/message/${messageId}`)
      .set("x-access-token", global.token)
      .expect(res => {
        res.status.should.equal(200);
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

  it("delete user", done => {
    request(app)
      .delete(`/v1/users/${userId}`)
      .set("x-access-token", global.token)
      .expect(res => {
        res.status.should.equal(200);
      })
      .end(done);
  });
});

describe("Chat", () => {
  it("create new chat", done => {
    const newChat = {
      members: ["steve@apple.com"]
    };

    request(app)
      .post("/v1/chat")
      .send(newChat)
      .set("x-access-token", global.token)
      .expect(res => {
        res.status.should.equal(201);
        res.body.members.should.be.an("array");
        chatId = res.body._id;
      })
      .end(done);
  });

  it("find a chat", done => {
    request(app)
      .get(`/v1/chat/${chatId}`)
      .set("x-access-token", global.token)
      .expect(res => {
        res.status.should.equal(200);
        res.body.members.should.be.an("array");
      })
      .end(done);
  });

  it("delete a chat", done => {
    request(app)
      .delete(`/v1/chat/${chatId}`)
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
    console.log("Clearing Users Failed", error);
  }
});

after(async () => {
  try {
    await ChatModel.collection.drop();
  } catch (error) {
    console.log("Clearing Chats Failed", error);
  }
});

// after(async () => {
//   try {
//     await MessageModel.collection.drop();
//   } catch (error) {
//     console.log("Clearing Messages Failed", error);
//   }
// });
