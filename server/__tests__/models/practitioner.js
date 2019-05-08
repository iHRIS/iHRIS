const models = require("../../models");

beforeAll(done => {
  models.sequelize.sync().then(() => {
    done();
  });
});

let testData = [
  {
    firstName: "Stephen",
    surname: "Strange",
    otherNames: "Doctor Strange",
    nationality: "American",
    residence: "Sanctum Santorum"
  },
  {
    firstName: "Wade",
    surname: "Wilson",
    otherNames: "Deadpool",
    nationality: "Canadian",
    residence: "Wherever he wants"
  },
  {
    firstName: "Tony",
    surname: "Stark",
    otherNames: "Iron Man",
    nationality: "American",
    residence: "Stark Tower"
  }
];

test("Create data in database", done => {
  let promises = [];

  for (let i in testData) {
    promises.push(models.Practitioner.create(testData[i]).then(record => {
      for(let j in testData[i]) {
        expect(record[j]).toEqual(testData[i][j]);
      }

      done();
    }));
  }

  Promise.all(promises).then(promise => {
    done();
  });
});

test("Find correct number of rows in database", done => {
  return models.Practitioner.findAll().then(practitioners => {
    expect(practitioners.length).toBe(3);
    done();
  });
});

test("Find by first name", done => {
  return models.Practitioner.findAll({
    where: {
      firstName: "Stephen"
    }
  }).then(practitioners => {
    expect(practitioners.length).toBe(1);
    expect(practitioners[0].surname).toBe("Strange");
    done();
  });
});

test("Find by surname", done => {
  return models.Practitioner.findAll({
    where: {
      surname: "Wilson"
    }
  }).then(practitioners => {
    expect(practitioners.length).toBe(1);
    expect(practitioners[0].firstName).toBe("Wade");
    done();
  });
});

test("Find by other name(s)", done => {
  return models.Practitioner.findAll({
    where: {
      otherNames: "Iron Man"
    }
  }).then(practitioners => {
    expect(practitioners.length).toBe(1);
    expect(practitioners[0].firstName).toBe("Tony");
    done();
  });
});

test("Find by nationality", done => {
  return models.Practitioner.findAll({
    order: [
      ["firstName", "ASC"]
    ],
    where: {
      nationality: "American"
    }
  }).then(practitioners => {
    expect(practitioners.length).toBe(2);
    expect(practitioners[0].firstName).toBe("Stephen");
    expect(practitioners[1].firstName).toBe("Tony");
    done();
  });
});

test("Find by residence", done => {
  return models.Practitioner.findAll({
    where: {
      residence: "Sanctum Santorum"
    }
  }).then(practitioners => {
    expect(practitioners.length).toBe(1);
    expect(practitioners[0].firstName).toBe("Stephen");
    done();
  });
});

test("Delete data in database", done => {
  return models.Practitioner.findAll({
    where: {
      firstName: "Stephen"
    }
  }).then(() => {
    models.Practitioner.findAll({
      where: {
        firstName: "Stephen"
      }
    }).then(practitioners => {
      expect(practitioners.length).toBe(0);
      done();
    });

    done();
  });
});
