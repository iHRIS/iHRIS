const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

const createCV = async (userData) => {
  const templatePath = path.join(__dirname, "../", "file/ResumeTemplate.pdf");
  const templateCv = fs.readFileSync(templatePath);
  const pdfDoc = await PDFDocument.load(templateCv);
  const page = pdfDoc.getPage(0);

  if (
    userData.photo &&
    userData.photo.length > 0 &&
    userData.photo[0].data &&
    userData.photo[0].contentType
  ) {
    let dataURL =
      "data:" +
      userData.photo[0].contentType +
      ";base64," +
      userData.photo[0].data;
    if (userData.photo[0].contentType === "image/png") {
      let base64Data = dataURL.replace(/^data:image\/png;base64,/, "");
      const profilePicture = await pdfDoc.embedPng(base64Data);
      page.drawImage(profilePicture, {
        x: 40,
        y: 710,
        width: 80,
        height: 80,
      });
    } else if (userData.photo[0].contentType === "image/jpeg") {
      let base64Data = dataURL.replace(/^data:image\/jpeg;base64,/, "");
      const profilePicture = await pdfDoc.embedJpg(base64Data);
      page.drawImage(profilePicture, {
        x: 40,
        y: 710,
        width: 80,
        height: 80,
      });
    }
  }

  page.drawText(userData.fullName.toUpperCase(), {
    x: 130,
    y: 760,
    size: 16,
  });
  // if (userData.position) {
  //   let position =
  //     userData.position.length > 30
  //       ? userData.position.substring(0, 30) + "..."
  //       : userData.position;
  //   page.drawText(position, {
  //     x: 130,
  //     y: 740,
  //     size: 12,
  //   });
  // }
  if (userData.phone) {
    // console.log(userData.email);
    page.drawText(userData.phone, {
      x: 395,
      y: 728,
      size: 12,
    });
  }
  if (userData.email) {
    page.drawText(userData.email, {
      x: 395,
      y: 750,
      size: 12,
    });
  }
  if (userData.qualification && userData.qualification.length > 0) {
    userData.qualification.map((education, index) => {
      // page.drawText("Education Institute", {
      //   x: 60,
      //   y: 605 - index * 180,
      //   size: 16,
      // });
      // if (education.institution) {
      //   let institution =
      //     education.institution.length > 30
      //       ? education.institution.substring(0, 30) + "..."
      //       : education.institution;
      //   page.drawText(institution, {
      //     x: 60,
      //     y: 585 - index * 180,
      //     size: 16,
      //   });
      // }
      page.drawText(`Education Level`, {
        x: 60,
        y: 565 - index * 180,
        size: 16,
      });
      if (education) {
        page.drawText(education, {
          x: 60,
          y: 540 - index * 180,
          size: 16,
        });
      }
      // page.drawText(`Major`, {
      //   x: 60,
      //   y: 525 - index * 180,
      //   size: 16,
      // });
      // if (education.educationalMajor) {
      //   page.drawText(education.educationalMajor, {
      //     x: 60,
      //     y: 505 - index * 180,
      //     size: 16,
      //   });
      // }
      // if (education.year) {
      //   page.drawText("Completion Year", {
      //     x: 60,
      //     y: 485 - index * 180,
      //     size: 16,
      //   });
      //   page.drawText(education.year, {
      //     x: 60,
      //     y: 465 - index * 180,
      //     size: 16,
      //   });
      // }
    });
  }
  // if (userData.workExperiences && userData.workExperiences.length > 0) {
  //   userData.workExperiences.map((expriance, index) => {
  //     page.drawText(`Organization`, {
  //       x: 345,
  //       y: 605 - index * 180,
  //       size: 16,
  //     });
  //     if (expriance.organization) {
  //       page.drawText(expriance.organization, {
  //         x: 345,
  //         y: 585 - index * 180,
  //         size: 16,
  //       });
  //     }
  //     page.drawText(`Address`, {
  //       x: 345,
  //       y: 565 - index * 180,
  //       size: 16,
  //     });
  //     if (expriance.address) {
  //       page.drawText(expriance.address, {
  //         x: 345,
  //         y: 545 - index * 180,
  //         size: 16,
  //       });
  //     }
  //     page.drawText(`Position`, {
  //       x: 345,
  //       y: 525 - index * 180,
  //       size: 16,
  //     });
  //     if (expriance.startingPosition) {
  //       page.drawText(expriance.startingPosition, {
  //         x: 345,
  //         y: 505 - index * 180,
  //         size: 16,
  //       });
  //     }
  //     page.drawText(`Period`, {
  //       x: 345,
  //       y: 485 - index * 180,
  //       size: 16,
  //     });
  //     if (expriance.period) {
  //       page.drawText(`${expriance.period.start} - ${expriance.period.end}`, {
  //         x: 345,
  //         y: 465 - index * 180,
  //         size: 16,
  //       });
  //     }
  //   });
  // }

  if (userData.languages && userData.languages.length > 0) {
    userData.languages.map((lang, index) => {
      page.drawText(`${lang}`, {
        x: 50 + index * 100,
        y: 90,
        size: 16,
      });
    });
  }
  const pdfBytes = await pdfDoc.save();
  let fileName = `${userData.id}_cv.pdf`;
  fs.writeFileSync(`employee_cvs_generated/${fileName}`, pdfBytes);
  setTimeout(() => {
    fs.unlinkSync(`employee_cvs_generated/${fileName}`);
  }, 240000);
  //   return fs.readFileSync(`./${fileName}`);
};

module.exports = createCV;