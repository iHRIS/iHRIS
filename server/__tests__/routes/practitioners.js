const app = require("../../app");
const models = require("../../models");
const request = require("supertest");

beforeAll(done => {
  models.sequelize.sync().then(() => {
    done();
  });
});

describe("Test adding practitioners", () => {
  let requiredFields = ["firstName", "surname", "nationality", "residence"];

  for (i in requiredFields) {
    test("Missing " + requiredFields[i], () => {
      let data = {};

      for (j in requiredFields) {
        if (i != j) {
          data[requiredFields[j]] = "something";
        }
      }

      return request(app).post("/practitioner/add").send(data).then(response => {
        expect(response.statusCode).toBe(400);
      });
    });
  }

  test("Successful add", () => {
    let data = {
      firstName: "Stephen",
      surname: "Strange",
      nationality: "American",
      residence: "New York"
    };

    return request(app).post("/practitioner/add").send(data).then(response => {
      expect(response.statusCode).toBe(201);
    });
  });
});
