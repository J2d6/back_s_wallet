const { Resend } = require("resend");
const { API_KEY_RESEND } = require("../config.app");
// import express, { Request, Response } from "express";
const resend = new Resend(API_KEY_RESEND);

const sendConfirmationCodeMail = async function (to , code) {

  try {
    const data = await resend.emails.send({
      from: "Jordany <j2d6.pro@gmail.com>",
      to: [to],
      subject: "Code d'activation",
      html: `<p>
                <pre>
                    Votre code d'activation :
                    <strong> ${code}</strong>
                </pre>
            </p>`,
    });
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}


module.exports = {
    sendConfirmationCodeMail
}