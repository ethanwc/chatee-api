const chai = require("chai");
const request = require("supertest");
const app = require("../src/config/server/server").default;
const ChatModel = require("../src/components/Chat/model").default;
chai.should();
/**
 * Id of created chat
 */
let chatId;
/**
 * Chat tests
 */
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
