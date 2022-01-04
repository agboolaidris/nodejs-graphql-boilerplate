"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SES_CONFIG = {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SES_SECRET_KEY,
    region: "me-south-1",
};
const AWS_SES = new aws_sdk_1.default.SES(SES_CONFIG);
const sendEmail = (recipientEmail, msg, subject) => {
    let params = {
        Source: "agboolaisholaidreez@gmail.com",
        Destination: {
            ToAddresses: [recipientEmail],
        },
        ReplyToAddresses: [],
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: msg,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject,
            },
        },
    };
    return AWS_SES.sendEmail(params).promise();
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendMail.js.map