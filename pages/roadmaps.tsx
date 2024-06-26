import React from "react";
import { GetStaticProps } from "next";
import { Button, Container, Input, Layout, Newsletter } from "components";
import ctl from "@netlify/classnames-template-literals";
import { useForm } from "react-hook-form";

import { RoadmapsHeader } from "@/templates/roadmaps";
import { toast } from "react-toastify";
import { getAllCategory } from "lib/api";

const RoadmapPage = ({ categoryQuery }) => {
  const categories = categoryQuery.categories.nodes;

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const handleSubmission = async (data, e) => {
    e.preventDefault();
    const { roadmap } = data;

    const formData = { ...data, tags: `Roadmap,${roadmap}` };

    try {
      await fetch(`/api/waitlist`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("You are now on the mailing list.", {
            className: "!rounded-full !font-secondary ",
          });
          resetForm();
        })
        .catch((error) => {
          console.log(error);
          const { message } = error;

          if (message.includes("Exists")) {
            toast.success("You are now on the mailing list.", {
              className: "!rounded-full !font-secondary ",
            });
            resetForm();
          } else {
            toast.error("Something went wrong, kindly try again", {
              className: "!font-secondary",
            });
          }
        });
    } catch (e) {
      toast.error("Something went wrong, kindly try again", {
        className: " !font-secondary ",
      });
    }
  };
  return (
    <Layout
      title="Roadmaps"
      description="A clear roadmap for you.
    Gain clarity on the right steps to kickstart or level up your career in tech."
    >
      <RoadmapsHeader />

      <Container className={formContainerStyle}>
        <form onSubmit={handleSubmit(handleSubmission)}>
          <Input
            placeholder="Firstname"
            register={register("first_name")}
            error={errors?.fullname && `${errors?.fullname?.message}`}
          />
          <Input
            placeholder="E-mail Address"
            register={register("email_address")}
            error={errors?.email && `${errors?.email?.message}`}
            type="email"
          />

          <Input
            name="roadmap"
            id="roadmap"
            register={register("roadmap")}
            type="select"
            className="cursor-pointer"
          >
            {categories.map((category, index) => {
              return <option key={`roadmap-${index}`}>{category.name}</option>;
            })}
          </Input>

          <Button
            text="Submit"
            isLoading={isSubmitting}
            className="w-full mt-6"
          />
        </form>
      </Container>
      <section>
        <Newsletter />
      </section>
    </Layout>
  );
};

export default RoadmapPage;

export const getStaticProps: GetStaticProps = async () => {
  const allCategory = await getAllCategory();

  return {
    props: { categoryQuery: allCategory },
    revalidate: 10,
  };
};
const formContainerStyle = ctl(`
!max-w-[650px]
mt-[20px]
mb-[160px]
`);
