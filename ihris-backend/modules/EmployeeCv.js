const {PDFDocument, rgb} = require('pdf-lib')
const fs = require("fs")

const createCV = async (userData) => {
    console.log(userData)
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage()
    page.drawText('Resume',{
        x : 270,
        y:  810,
        size: 16
    })
    page.drawText(userData.fullName.toUpperCase(),{
        x : 20,
        y: 780,
        size:12
    })
    page.drawText(userData.position,{
        x : 20,
        y: 765,
        size:12
    })
    page.drawText(userData.email,{
        x : 20,
        y: 750,
        size:12
    })
    page.drawText(userData.phone,{
        x : 20,
        y: 735,
        size:12
    })
    if(userData.education && userData.education.length > 0){
        page.drawText(`Education`,{
            x : 270,
            y: 720,
            size:16
        })

       userData.education.map((education,index) => {
           page.drawText(`Education Institute: ${education.institution}`,{
               x : 20,
               y: 660  - (index*80),
               size:16
           })
           page.drawText(`Education Level: ${education.level}`,{
               x : 20,
               y: 640  - (index*80),
               size:16
           })
           page.drawText(`Major: ${education.educationalMajor}`,{
               x : 20,
               y: 620  - (index*80),
               size:16
           })
           page.drawText(`Completion Year: ${education.year}`,{
               x : 20,
               y: 600  - (index*80),
               size:16
           })
       })
    }


    if(userData.workExperiences && userData.workExperiences.length > 0){
        page.drawText(`Experience`,{
            x : 270,
            y: 450,
            size:16
        })
        userData.workExperiences.map((expriance,index)=>{
            page.drawText(`Organization: ${expriance.organization}`,{
                x : 20,
                y: 430 -(index*80),
                size:16
            })
            page.drawText(`Address: ${expriance.address}`,{
                x : 20,
                y: 410 -(index*80),
                size:16
            })
            page.drawText(`Position: ${expriance.startingPosition}`,{
                x : 20,
                y: 390-(index*80),
                size:16
            })
            page.drawText(`Period: ${expriance.period}`,{
                x : 20,
                y: 370 -(index*80),
                size:16
            })
        })
    }

    if(userData.languages && userData.languages.length > 0){
        page.drawText(`Language`,{
            x : 270,
            y: 150,
            size:16
        })
        userData.languages.map((lang,index) => {
            page.drawText(`${lang}`,{
                x : 20 + (index * 100),
                y: 130,
                size:16
            })
        })
    }
    const pdfBytes = await pdfDoc.save()
    let fileName = `${userData.fullName.split(' ').join('_')}_cv.pdf`
    fs.writeFileSync(fileName , pdfBytes )
    return fs.readFileSync(`./${fileName}`)
}

module.exports = createCV

