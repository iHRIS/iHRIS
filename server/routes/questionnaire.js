var express = require("express");
var router = express.Router();
var axios = require("axios");
var elasticsearch = require("elasticsearch");

const URI = require('urijs');
const fs = require('fs')
const mixin = require("../mixin");
const env = process.env.NODE_ENV || 'development';

var config = require(__dirname + '/../config/config.json')[env];

if (env === "production") {
  config = JSON.parse(fs.readFileSync(`/run/secrets/server_config`, 'utf8'))[env];
}

function answerQuestion(question, answer, response) {
  if (response.hasOwnProperty("linkId") && response["linkId"] === question) {
    response.answer = [formatAnswer(response.type, answer)];

    return response;
  } else if (response.hasOwnProperty("item")) {
    response["item"] = answerQuestion(question, answer, response["item"]);
  } else if (Array.isArray(response)) {
    for (const i in response) {
      response[i] = answerQuestion(question, answer, response[i]);
    }

    return response;
  }

  return response;
}

function formatAnswer(type, answer) {
  switch (type.toLowerCase()) {
    case "boolean" :
      return {
        valueBoolean: answer
      };

    case "decimal" :
      return {
        valueDecimal: answer
      };

    case "integer" :
      return {
        valueInteger: answer
      };

    case "date" :
      return {
        valueDate: answer
      };

    case "dateTime" :
      return {
        valueDateTime: answer
      };

    case "time" :
      return {
        valueTime: answer
      };

    case "open-choice" :
    case "string" :
    case "text" :
      return {
        valueString: answer
      }

    case "url" :
      return {
        valueUri: answer
      }

    case "choice" :
      return {
        valueCoding: {
          code: answer
        }
      };

    case "attachment" :
      return {
        valueAttachment: answer
      };

    case "reference" :
      return {
        valueReference: answer
      };

    case "quantity" :
      return {
        valueQuantity: answer
      };
  }

  return {};
}

function stripTemplate(items) {
  if (Array.isArray(items)) {
    for (const i in items) {
      items[i] = stripTemplate(items[i]);
    }
  } else {
    for (const key in items) {
      if (key !== "linkId" && key !== "item" && key !== "type") {
        delete items[key];
      } else if (key === "item") {
        items[key] = stripTemplate(items[key]);
      }
    }
  }

  return items;
}

/**
 * Answer a questionnaire
 */
router.post("/respond", async function (req, res, next) {
  let data = req.body;
  let counter = 0;
  let id = data["questionnaire"];
  let template = {};

  let url = URI(config.fhir.server).segment('fhir').segment('Questionnaire');
  url.addQuery('_id', id);
  url = url.toString();

  let credentials = {
    withCredentials: true,
    auth: {
      username: config.fhir.username,
      password: config.fhir.password
    }
  };

  // if no questionnaire, then stop
  if (!id) {
    res.status(400).json({message: "No questionnaire received."});
  }

  template.id = id;

  // get the questionnaire this answers
  let questionnaire = await axios.get(url, credentials);

  // get to the good parts of the questionnaire
  try {
    questionnaire = questionnaire.data.entry[0];
  } catch {
    res.status(400).json({message: "Unable to load questionnaire."});
  }

  template.item = questionnaire.resource.item;

  // strip out everything that is not a linkId
  template.item = stripTemplate(template.item);
  template.resourceType = "QuestionnaireResponse";

  url = URI(config.fhir.server).segment('fhir').segment('QuestionnaireResponse').toString();

  // now answer the questionnaire
  for (const k in data.responses) {
    // this make a copy, allowing us to edit the response without changing the template
    let response = JSON.parse(JSON.stringify(template));
    let answers = data.responses[k];

    // answer each question
    for (const question in answers) {
      // find the matching answer
      response['item'] = answerQuestion(question, answers[question], response['item']);
    }

    try {
      await axios.post(url, response, {
        withCredentials: true,
        auth: {
          username: config.fhir.username,
          password: config.fhir.password
        }
      });
    } catch(error) {
      return res.status(400).json(error);
    }

    counter++;
  }

  res.status(201).json({ success: true, count: counter });
});

module.exports = router;
