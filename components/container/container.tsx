import React from "react";
import PropTypes from "prop-types";
import ctl from "@netlify/classnames-template-literals";

interface ContainerProps {
  className?: String;
  children: React.ReactNode;
}
const Container = ({ className, children }: ContainerProps) => {
  return (
    <section className={containerStyle + " " + className} role="main">
      {children}
    </section>
  );
};

const containerStyle = ctl(`
  max-w-[1380px]
  mx-auto
  md:px-[24px]
  px-4`);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Container };
