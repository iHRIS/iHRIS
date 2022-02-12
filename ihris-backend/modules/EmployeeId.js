const { PDFDocument, StandardFonts, rgb } = require('pdf-lib')
const fontkit = require('@pdf-lib/fontkit')
const JsBarcode = require('jsbarcode')
const toArray = require('stream-to-array')
const axios = require('axios')
const { createCanvas } = require('canvas')
const fs = require("fs");
const path = require("path");
const canvas = createCanvas()
canvas.toDataURL('image/jpeg')


module.exports = create = async (userData) => {
    let fileName = `${userData.fullName.split(' ').join('_')}_id.pdf`
    const pdfDoc = await PDFDocument.create()

    // const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    let fontPath = path.join(__dirname,'../', 'fonts/Abyssinica-SIL.ttf')
    const fontBytes = fs.readFileSync(fontPath)

    pdfDoc.registerFontkit(fontkit)
    const timesRomanFont = await pdfDoc.embedFont(fontBytes)

    const page = pdfDoc.addPage( [400, 500] )

    const fontSize = 20

    let p = path.join(__dirname,'../', 'images/background.jpg')
    const background = fs.readFileSync(p)

    const jpgImage = await pdfDoc.embedJpg(background)
    const jpgDims = jpgImage.scale(0.38)

    page.drawImage(jpgImage, {
        x: 5,
        y: 261.5,
        width: jpgDims.width,
        height: jpgDims.height
    } )

    // const backJpg = fs.readFileSync('../public/images/background.jpg')
    const backJpgImage = await pdfDoc.embedJpg(background)

    const backJpgDims = backJpgImage.scale(0.38)

    page.drawImage(backJpgImage, {
        x: 5,
        y: 10,
        width: backJpgDims.width,
        height: backJpgDims.height
    } )
    let logoPath = path.join(__dirname,'../', 'images/logo.png')
    const logo = fs.readFileSync(logoPath)
    const ministryLogo = await pdfDoc.embedPng(logo)
    page.drawImage( ministryLogo,
        {
            x: 10,
            y: 410,
            width:100,
            height:80
        }

    )

    page.drawText('ጤና ሚኒስቴር - ኢትዮጵያ',{
        x: 100,
        y: 465,
        size: 12,
        font: timesRomanFont,
        color: rgb( 0, 0, 0)
    })

    page.drawText('MINISTRY OF HEALTH',{
        x: 100,
        y: 440,
        size: 12,
        font: timesRomanFont,
        color: rgb( 0, 0, 0)
    })

    page.drawText( userData.fullName, {
        x: 15,
        y: 360,
        size:14,
        font: timesRomanFont,
        color: rgb( 0, 0, 0)
    } )

    page.drawText(userData.position,{
        x:245,
        y:360,
        size:14
    })



    page.drawText(
        `Tel: +251 (011) 551-7011   P.O.Box:12354 Addis Ababa, Ethiopia`,
        {
            x:15,
            y: 275,
            size: 12

        }
    )

    page.drawText('Residence Address',{x:15,y:245,size:16})

    page.drawText(`SubCity:______ Kebele:______ House No.:_______`,{x:15,y:200,size:14})

    page.drawText(` The person Whose photo appears on this ID is`,{x:70,y:160,size:14})
    page.drawText(` an employee of the FMOH`,{x:120,y:135,size:14})


    page.drawText(`Authorized Signature:`,{x:15,y:95,size:14})
    page.drawText(`________________`,{x:15,y:65,size:14})

    page.drawText(`Duty station:`,{x:250,y:95,size:14})
    page.drawText(`________________`,{x:250,y:65,size:14})

    JsBarcode(canvas, "1234567890123456789012345", { height: 20, width: 1, displayValue: false } )

    const stream = canvas.createPNGStream()

    toArray(stream, async (err,arr) => {
        if ( err ) {
            console.log(err)
            return
        }

        let buffers = []
        for( let i = 0; i < arr.length; ++i) {
            let part = arr[i]
            buffers.push( (part instanceof Buffer) ? part : Buffer.from(part) )
        }
        let buff = Buffer.concat(buffers)
        const barcodeImage = await pdfDoc.embedPng(buff)

        const barcodeDims = barcodeImage.scale(1.0)

        page.drawImage(barcodeImage, {
            x: 75,
            y: 20,
            width: barcodeDims.width,
            height: barcodeDims.height
        } )



    } )

    const pdfBytes = await pdfDoc.save()

    fs.writeFileSync(fileName , pdfBytes )

    fs.writeFileSync(fileName , pdfBytes )

    return fs.readFileSync(`./${fileName}`)
}

