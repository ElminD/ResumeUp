import { saveAs } from "file-saver"
import { PDFDocument, StandardFonts } from 'pdf-lib'

type WorkExperience = {
    id: number,
    company: string,
    position: string,
    startDate: string,
    endDate: string,
    description: string
}

type Project = {
    id: number,
    name: string,
    description: string
}

export async function Template1(data: any) {
    const pdfDoc = await PDFDocument.create()
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
    const timesRomanItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic)
    
    const page = pdfDoc.addPage()
    const { width, height } = page.getSize()
    page.drawText(data.personalInfo.name, {
        x: (width - timesRomanFont.widthOfTextAtSize(data.personalInfo.name, 28)) / 2,
        y: height - 50,
        size: 28,
        font: timesRomanFont,
    })
    const emailAndNum = data.personalInfo.email + " | " + data.personalInfo.phoneNum
    page.drawText(emailAndNum, {
        x: (width - timesRomanFont.widthOfTextAtSize(emailAndNum, 12)) / 2,
        y: height - 70,
        size: 12,
        font: timesRomanFont,
    })

    page.drawText("EDUCATION", {
        x: 30,
        y: height - 90,
        size: 13,
        font: timesRomanFont,
    })
    page.drawLine({
        start: {x: 30, y: height - 95},
        end: {x: width - 30, y: height - 95}
    })
    page.drawText(data.education.school, {
        x: 30,
        y: height - 112,
        size: 12,
        font: timesRomanBold
    })
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let startDate = data.education.startDate.split("-")
    let endDate = data.education.endDate.split("-")
    let duration = months[parseInt(startDate[1]) - 1] + " " + startDate[0] + " - " + months[parseInt(endDate[1]) - 1] + " " + endDate[0]
    page.drawText(duration, {
        x: width - 30 - timesRomanFont.widthOfTextAtSize(duration, 12),
        y: height - 112,
        size: 12,
        font: timesRomanFont
    })
    page.drawText(data.education.degreeType + " in " + data.education.major, {
        x: 30,
        y: height - 127,
        size: 12,
        font: timesRomanItalic
    })
    const maxWidth = width - 30 - 30
    let description = data.education.description.split("\n")
    let pos = 142
    description.forEach((line: string) => {
        page.drawText("- " + line, {
            x: 30,
            y: height - pos,
            size: 12,
            font: timesRomanFont,
            maxWidth,
            lineHeight: 14
        })
        pos += 15
        let lineLength = timesRomanFont.widthOfTextAtSize(line, 12)
        while(lineLength >= maxWidth) {
            lineLength -= maxWidth
            pos += 15
        }
    });
    pos += 15

    page.drawText("WORK EXPERIENCE", {
        x: 30,
        y: height - pos,
        size: 13,
        font: timesRomanFont
    })
    pos += 5
    page.drawLine({
        start: {x: 30, y: height - pos},
        end: {x: width - 30, y: height - pos}
    })
    pos += 17
    data.workExperiences.forEach((experience: WorkExperience) => {
        page.drawText(experience.position, {
            x: 30,
            y: height - pos,
            size: 12,
            font: timesRomanBold
        })
        let startDate = experience.startDate.split("-")
        let endDate = experience.endDate.split("-")
        let duration = months[parseInt(startDate[1]) - 1] + " " + startDate[0] + " - " + months[parseInt(endDate[1]) - 1] + " " + endDate[0]
        page.drawText(duration, {
            x: width - 30 - timesRomanFont.widthOfTextAtSize(duration, 12),
            y: height - pos,
            size: 12,
            font: timesRomanFont
        })
        pos += 15
        page.drawText(experience.company, {
            x: 30,
            y: height - pos,
            size: 12,
            font: timesRomanItalic
        })
        pos += 15
        description = experience.description.split("\n")
        description.forEach((line: string) => {
            page.drawText("- " + line, {
                x: 30,
                y: height - pos,
                size: 12,
                font: timesRomanFont,
                maxWidth,
                lineHeight: 14
            })
            pos += 15
            let lineLength = timesRomanFont.widthOfTextAtSize(line, 12)
            while(lineLength >= maxWidth) {
                lineLength -= maxWidth
                pos += 15
            }
        });
        pos += 8
    })
    pos += 7

    page.drawText("PROJECTS", {
        x: 30,
        y: height - pos,
        size: 13,
        font: timesRomanFont
    })
    pos += 5
    page.drawLine({
        start: {x: 30, y: height - pos},
        end: {x: width - 30, y: height - pos}
    })
    pos += 17
    data.projects.forEach((project: Project) => {
        page.drawText(project.name, {
            x: 30,
            y: height - pos,
            size: 12,
            font: timesRomanBold
        })
        pos += 15
        description = project.description.split("\n")
        description.forEach((line: string) => {
            page.drawText("- " + line, {
                x: 30,
                y: height - pos,
                size: 12,
                font: timesRomanFont,
                maxWidth,
                lineHeight: 14
            })
            pos += 15
            let lineLength = timesRomanFont.widthOfTextAtSize(line, 12)
            while(lineLength >= maxWidth) {
                lineLength -= maxWidth
                pos += 15
            }
        });
        pos += 8
    })
    pos += 7

    page.drawText("SKILLS", {
        x: 30,
        y: height - pos,
        size: 13,
        font: timesRomanFont
    })
    pos += 5
    page.drawLine({
        start: {x: 30, y: height - pos},
        end: {x: width - 30, y: height - pos}
    })
    pos += 17
    description = data.skills.split("\n")
    description.forEach((line: string) => {
        page.drawText(line, {
            x: 30,
            y: height - pos,
            size: 12,
            font: timesRomanFont,
            maxWidth,
            lineHeight: 14
        })
        pos += 15
        let lineLength = timesRomanFont.widthOfTextAtSize(line, 12)
        while(lineLength >= maxWidth) {
            lineLength -= maxWidth
            pos += 15
        }
    });

    const pdfBytes = await pdfDoc.save()
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(pdfBlob, data.personalInfo.name + " Resume.pdf")
}