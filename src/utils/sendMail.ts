import AWS from "aws-sdk";
import { SendEmailRequest } from "aws-sdk/clients/ses";

const SES_CONFIG = {
  accessKeyId: "AKIATB7WQZVGCD6TNOI6",
  secretAccessKey: "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",
  region: "me-south-1",
};

const AWS_SES = new AWS.SES(SES_CONFIG);

export const sendEmail = (recipientEmail: string, name: string) => {
  let params: SendEmailRequest = {
    Source: "agboolaisholaidreez@gmail.com",
    Destination: {
      ToAddresses: [recipientEmail],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "This is the body of my email!",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `Hello, ${name}!`,
      },
    },
  };
  return AWS_SES.sendEmail(params).promise();
};
