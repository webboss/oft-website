import * as yup from "yup";

export const newsletterSchema = yup.object().shape({
  email_address: yup
    .string()
    .required("Kindly enter your email address")
    .trim()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email address",
    ),
});

export const resourcesFilterSchema = yup.object().shape({
    category: yup.string().trim(),
    type: yup.string().trim(),
    plan: yup.string().trim(),
});
