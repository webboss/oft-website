import { GetStaticProps } from "next";
import ctl from "@netlify/classnames-template-literals";
import React from "react";
import { Newsletter, Partners, Layout } from "components";

import ArrowIcon from "../svgs/arrow.svg";
import { AboutUsHeader, Team } from "templates/about-us";
import { getAllTeamMembers } from "lib/api";

const AboutPage = ({ allTeamMembers }) => {
  return (
    <Layout
      title="About us"
      description="Like you, our path to tech wasn’t straight but yours doesn’t have to be like that."
    >
      <>
        <AboutUsHeader />
        <div className={arrowsContainerStyle}>
          <ArrowIcon className={arrowLeftStyle} />
          <ArrowIcon className={arrowRightStyle} />
        </div>
        <Team teamData={allTeamMembers.teamMembers.nodes} />
        <Newsletter />
        <div className="md:my-[122px] my-[90px]">
          <Partners />
        </div>
      </>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allTeamMembers = await getAllTeamMembers();

  return {
    props: { allTeamMembers },
    revalidate: 10,
  };
};

const arrowsContainerStyle = ctl(`
md:h-[300px]
h-[200px]
md:mt-0
mt-[-100px]
mb-20
overflow-hidden
invisible
lg:visible
relative
`);

const arrowLeftStyle = ctl(`
absolute
left-[-100px]
md:bottom-[180px]
bottom-[100px]
md:w-auto
w-[200px]
`);

const arrowRightStyle = ctl(`transform
rotate-180
absolute
right-[-100px]
md:w-auto
w-[200px]
md:bottom-0
bottom-[50px]

`);
export default AboutPage;
