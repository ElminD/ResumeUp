import nodemailer from "nodemailer"

export async function POST(req: Request) {    
    const {name, email, subject, message} = await req.json()
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: `${process.env.NODE_MAILER_USER}`,
          pass: `${process.env.NODE_MAILER_PASS}`,
        },
      });

      try {
        const mail = await transporter.sendMail({
            from: "resumeupinc@gmail.com",
            to: "sdmay24-05@iastate.edu",
            replyTo: email,
            subject: subject,
            html: `
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <P>Subject: ${subject}</p>
                <p>Message: ${message}</p>
            `
        })

        console.log("Message sent:", mail.messageId)
        return new Response(JSON.stringify({
            message: "SUCCESS",
            status: 200
        }))
      } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "FAILED",
            status: 500
        }))
      }
}