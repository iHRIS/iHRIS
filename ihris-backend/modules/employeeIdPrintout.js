const pify = require("pify");
const imageSizeOf = require("image-size");

const {
    createCanvas,
    loadImage,
    Image,
    registerFont,
} = require("canvas");
const fs = require("fs");
const path = require("path");

const imageSizeOfP = pify(imageSizeOf);

module.exports = create = async (userData) => {
    let fileName = `${userData.id}_id.png`;

    let templatePath = path.join(__dirname, "../", "file/Id_template.png");

    let fontPath = path.join(__dirname, "../", "fonts/Roboto-Regular.ttf");

    const { width, height } = await imageSizeOfP(templatePath);
    registerFont(fontPath, { family: "Roboto" });
    const canvas = createCanvas(width, height);

    const ctx = canvas.getContext("2d");

    const image = await loadImage(templatePath);
    ctx.drawImage(image, 0, 0);

    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = `${22}px `;

    if (userData.logo && userData.logo.data && userData.logo.contentType) {
        let dataURL =
            "data:" + userData.logo.contentType + ";base64," + userData.logo.data;
        const logoImage = await new Image();
        logoImage.src = dataURL;
        logoImage.onload = function () {};
        ctx.drawImage(logoImage, 10, 380, 100, 80);

        if (userData.logo.contentType === "image/png") {
            let base64Data = dataURL.replace(/^data:image\/png;base64,/, "");
            logoImage.src = base64Data;
            image.onload = () => {
                ctx.drawImage(image, 20, 380, 70, 50);
            };
        } else if (userData.logo.contentType === "image/jpeg") {
            let base64Data = dataURL.replace(/^data:image\/jpeg;base64,/, "");
            const logo = await pdfDoc.embedJpg(base64Data);
            ctx.drawImage(logo, 20, 380, 70, 50);
        }
    }

    ctx.font = `${28}px `;

    ctx.fillText(userData.fullName, 360, 160);
    ctx.font = `${16}px `;
    ctx.fillText(userData.position, 390, 200);
    ctx.font = `${18}px `;
    ctx.fillText(userData.email, 332, 295);
    ctx.fillText(userData.phone, 290, 340);
    ctx.font = `${16}px `;
    ctx.fillText(userData.employeeId, 580, 412);
    ctx.font = `${18}px `;
    ctx.fillText(userData.nationality, 500, 295);

    ctx.fillText(userData.residence, 490, 340);

    ctx.fillText(new Date().toLocaleDateString("en-US"), 525, 800);

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
        const profileImage = await new Image();
        profileImage.src = dataURL;
        profileImage.onload = function () {};
        ctx.drawImage(profileImage, 40, 100, 150, 150);
    }

    if (userData.stamp && userData.stamp.data && userData.stamp.contentType) {
        let dataURL =
            "data:" + userData.stamp.contentType + ";base64," + userData.stamp.data;
        const stampImage = await new Image();
        stampImage.src = dataURL;
        stampImage.onload = function () {};
        ctx.drawImage(stampImage, 420, 650, 140, 140);
    }

    if (
        userData.signature &&
        userData.signature.data &&
        userData.signature.contentType
    ) {
        let dataURL =
            "data:" +
            userData.signature.contentType +
            ";base64," +
            userData.signature.data;
        const signatureImage = await new Image();
        signatureImage.src = dataURL;
        signatureImage.onload = function () {};
        ctx.drawImage(signatureImage, 80, 810, 90, 50);
    }

    let buffer = canvas.toBuffer();
    fs.writeFileSync(`employee_ids_generated/${fileName}`, buffer);
    setTimeout(() => {
        fs.unlinkSync(`employee_ids_generated/${fileName}`);
    }, 240000);
};
