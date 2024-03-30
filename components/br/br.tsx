import React from "react";
import PropTypes from "prop-types";
import ctl from "@netlify/classnames-template-literals";

interface BrProps {
  on: keyof typeof variants;
}

const Br = ({ on }: BrProps) => {
  const brStyle = ctl(`${variants[on]}`);

  return <br role="line-break" className={brStyle} />;
};

const variants = {
  desktop: `
  md:block
  hidden
  `,
  all: `
  block
  `,
  mobile: `
  block
  md:hidden
  `,
};
const validVariants = ["all", "desktop", "mobile"];

Br.propTypes = {
  on: PropTypes.oneOf([...validVariants]),
};

export { Br };
