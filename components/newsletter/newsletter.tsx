import React from "react";

import { Hr } from "@/components/hr";
import { Button, Container, Input, Text } from "components";
import NewsletterPattern from "../../svgs/newsletter-pattern.svg";
import ArrowIcon from "../../svgs/arrow-right.svg";
import ctl from "@netlify/classnames-template-literals";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSubscribersContext } from "@/context/SubscribersContext";
import { newsletterSchema } from "@/utils/validations";
import { toast } from "react-toastify";

/*eslint no-useless-escape: "off"*/
export const Newsletter = () => {
  const { noOfSubscribers } = useSubscribersContext() ?? {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(newsletterSchema),
  });

  const subscribeToNewsletter = async (data, e) => {
    e.preventDefault();

    try {
      await fetch("/api/newsletter", {
        method: "POST",

        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("You are now on the mailing list.", {
            className: "!rounded-full !font-secondary ",
          });

          reset();
        })
        .catch((e) => {
          toast.error("Something went wrong, kindly try again");
        });
    } catch (error) {
      toast.error("Something went wrong, kindly try again");
    }
  };
  return (
    <React.Fragment>
      <Hr />
      <section className="relative overflow-x-hidden md:py-[120px] py-[0px]">
        <NewsletterPattern className="md:absolute block top-0 md:left-[65%] md:h-full md:w-[95%] sm:w-[1000px] w-[700px] h-[250px]" />
        <Container className="md:mt-0 -mt-[80px]">
          <section className="grid grid-cols-12 my-[100px]">
            <div className=" md:col-span-6  col-span-12">
              <Text variant="p18" color="yellow" value="Subscribe to" />
              <Text variant="h2">Join Our Newsletter</Text>
              <Text variant="p18" className="max-w-[400px]">
                Be part of {noOfSubscribers}+ subscribers who gets notified when
                we publish new stories and roadmaps.
              </Text>

              <form
                className="mt-[45px] flex w-full items-center"
                onSubmit={handleSubmit(subscribeToNewsletter)}
              >
                <Input
                  register={register("email_address")}
                  placeholder="Enter your email"
                  className={inputStyle}
                  error={errors?.email_address?.message}
                />
                <Button
                  isInline
                  variant="outline"
                  className={`${buttonStyle} ${
                    errors.email_address && "border-action-error "
                  }`}
                  isLoading={isSubmitting}
                  text=""
                  disabled={!isValid}
                >
                  <ArrowIcon className="w-6" />
                </Button>
              </form>
            </div>
          </section>
        </Container>
      </section>
      <Hr />
    </React.Fragment>
  );
};

const inputStyle = ctl(`
  flex-shrink
  border-r-0
  rounded-r-none
`);

const buttonStyle = ctl(`
  flex-shrink-0
  h-[53px]
  mb-4
  min-w-[60px]
  !border-2
  !rounded-l-none
  !border-l-0
`);
