const app = require("../app.js");
const supertest = require("supertest");
const request = supertest(app);

describe("Get Car IDs", () => {
  it("tests the GET endpoint for All matched Cars", (done) => {
    let 
    const response = request.get("/match:");
    const statusCode = response.statusCode;

    if (statusCode === 200 && response.body.message === 'Match Not Found') {
      expect(response.body.length).toBe(0);
    }
    else if(statusCode === 200 && response.body.message === 'Match Found') {
      expect(response.body.length).toBeGreaterThan(0);
    }
      else if (statusCode === 400) {
        let statusMessage = response.body.message;
        expect(statusMessage.message).toBe(
          "Invalid Query Parameters"
        );
      }
    else if (statusCode === 404) {
      let statusMessage = response.body.message;
      expect(statusMessage.message).toBe(
        "Cannot read property 'substring' of undefined"
      );
    }
    done();
  });

});
