import React from "react";

import ctl from "@netlify/classnames-template-literals";

// import Loader from "src/assets/images/svgs/loader.svg"
import { NLink } from "../nlink";

type Href =
  | String
  | {
      url?: String;
    };
interface ButtonProps {
  text: string;
  variant?: "primary" | "secondary" | "alternative" | "outline";
  isLoading?: true | false;
  href?: Href;
  to?: String;
  isInline?: Boolean;
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
}
const Button = ({
  text,
  variant: buttonVariant = "primary",
  size: buttonSize = "xsmall",
  isLoading,
  onClick,
  disabled: buttonDisabled,
  href,
  to,
  children,
  className,
  isInline,
}: ButtonProps & React.ComponentPropsWithoutRef<"button">) => {
  const buttonStyle = ctl(`
  ${baseStyle}
  ${sizes[buttonSize]}
  ${variants[buttonVariant]}
  ${buttonDisabled && !isInline && `opacity-25`}
  ${className}
  `);

  let ButtonElement: any = "button";
  let linkProps: {
    to?: String;
    href?: Href;
  } = {};

  if (href || to) {
    ButtonElement = NLink;
    if (to) {
      linkProps.to = to;
    }

    if (href) {
      linkProps.href = href;
    }
  }

  return (
    <ButtonElement
      className={buttonStyle}
      onClick={onClick}
      disabled={buttonDisabled || isLoading}
      {...linkProps}
    >
      {isLoading ? (
        <p>Loading</p>
      ) : (
        // <Loader />
        <span className={textStyle + " " + textVariants[buttonVariant]}>
          {text || children}
        </span>
      )}
    </ButtonElement>
  );
};

const textStyle = ctl(`
  block
  font-secondary
`);

const textVariants = {
  primary: ``,
  alternative: `
    bg-black
    bg-clip-content
    w-full
    h-full
    flex
    items-center
    justify-center
    rounded-full
  `,
  secondary: `
    bg-white
    bg-clip-content
    w-full
    h-full
    flex
    items-center
    justify-center
    rounded-full
    text-grey
  `,
};

const baseStyle = ctl(`
  rounded-full
  text-center
  font-semibold
  transition
  duration-400
  inline-flex
  items-center
  justify-center
  disabled:cursor-not-allowed
  p-[2px]
`);

const sizes = {
  xsmall: `
    min-w-[166px]
    h-[45px]
  `,
  small: `
    md:min-w-[200px]
    h-[58px]
    px-4
  `,
  medium: `
    md:min-w-[275px]
    py-[29px]
    h-[58px]
  `,
  large: `
    md:min-w-[200px]
    w-[200px]
    h-[58px]
  `,
  xlarge: `
    md:min-w-[420px]
    h-[58px]
  `,
  full: `
    w-full
    h-[58px]
  `,
};

const variants = {
  primary: `
    primary
    disabled:bg-secondary
    text-primary-100
    gradient-blue-to-red
  `,
  alternative: `
    alternative
    gradient-blue-to-red
  `,
  secondary: `
    secondary
    gradient-blue-to-red
  `,
  outline: `
    border
    border-white
  `,
};

Button.defaultProps = {
  variant: "primary",
  size: "xsmall",
};

export { Button };
