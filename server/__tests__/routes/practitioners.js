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

  test("Getting existing record", () => {
    let testData = {
      firstName: "Stephen",
      surname: "Strange",
      otherNames: "Doctor Strange",
      nationality: "American",
      residence: "Sanctum Santorum"
    };

    return models.Practitioner.create(testData).then(practitioner => {
      return request(app).get("/practitioner/view/" + practitioner.id).send().then(response => {
        expect(response.statusCode).toBe(201);

        // because of encoding datetime stuff, I have to convert / revert the database record
        // so that it matches up with the response object
        expect(JSON.parse(response.text)).toEqual(JSON.parse(JSON.stringify(practitioner)));
      });
    });
  });

  test("Getting record that does not exist", () => {
    return request(app).get("/practitioner/view/does-not-exist").send().then(response => {
      expect(response.statusCode).toBe(400);
    });
  });
});
