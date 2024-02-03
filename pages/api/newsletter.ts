import type { NextApiRequest, NextApiResponse } from "next";
import md5 from "md5";

export default async function noOfSubscribers(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const mailchimp = require("@mailchimp/mailchimp_marketing");
  const reqMethod = req.method;
  const IS_POST_REQUEST = reqMethod === "POST";

  const reqBody = req.body;
  const { email_address } = reqBody;

  if (IS_POST_REQUEST) {
    mailchimp.setConfig({
      apiKey: process.env.GATSBY_MAILCHIMP_API_KEY,
      server: "us16",
    });

    const subscriber_hash = md5(email_address);

    try {
      const response = await mailchimp.lists.setListMember(
        "a2eb241fd7",
        subscriber_hash,
        {
          email_address,
          status_if_new: "subscribed",
          tags: ["OFT Newsletter"],
        },
      );

      res.status(200).json({ message: "Subscription successful" });
    } catch (error) {
      res
        .status(error.response.status)
        .json({ message: error.response.message });
    }
  } else {
    res.send("Bro? Really?!");
  }
}
