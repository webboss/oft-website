import React from "react";

import ctl from "@netlify/classnames-template-literals";
import tailwindconfig from "../../tailwind.config";

const {
  theme: {
    extend: { colors },
  },
} = tailwindconfig;

interface TextProps {
  value?: String | React.ReactElement;
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "h7"
    | "p18"
    | "p16"
    | "p14"
    | "p12";
  color?: String;
  weight?: String;
  className?: String;
  children?: React.ReactNode;
  isPrimary?: true | false;
  html?: String;
  as?: keyof HTMLElementTagNameMap;
}

const Text = ({
  value,
  variant: textVariant,
  weight,
  color = "primary-100",
  className,
  children,
  isPrimary,
  html,
  as,
}: TextProps) => {
  const primaryFontsList = ["h1", "h2", "h3", "h4"];
  const isInPrimaryFontList =
    primaryFontsList.includes(textVariant) || isPrimary;

  const firstCharacterInVariant = textVariant[0];

  let textTag = firstCharacterInVariant === "p" ? "p" : textVariant;
  // h7 is not a valid, we will use replace this with an h6 tag but the style for h7 will be retained according to the design system
  if (textVariant === "h7") {
    textTag = "h6";
  }

  const TextElement = textTag;

  const [_color, _shade] = color.split("-");

  const textColor = colors[_color][_shade ? _shade : "DEFAULT"];

  const textStyle = ctl(`
  ${variants[textVariant]}

  ${isInPrimaryFontList ? "font-primary" : "font-secondary"}
  ${className}
  `);

  const dynamicStyle = {
    color: textColor,
    fontWeight: weight,
  };

  const textElementProps: any = {
    style: dynamicStyle,
    className: textStyle,
  };

  return html ? (
    <TextElement
      {...textElementProps}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : (
    <TextElement {...textElementProps}>{value || children}</TextElement>
  );
};

const variants = {
  h1: `
    md:text-[76px]
    text-[37px]
    md:leading-[75px]
    leading-[44.4px]
    font-bold 
    `,
  h2: `
    md:text-[48px]
    text-[28px]
    md:leading-[59.04px]
    leading-[39.2px]
    font-[500] 
    `,

  h3: `
    md:text-[38px]
    text-[21px]
    md:leading-[46.87px]
    leading-[29.4px]
    font-semibold 
    `,
  h4: `
    md:text-[28px]
    text-[18px]
    md:leading-[39.2px]
    leading-[18px]
    font-semibold 
    `,
  h5: `
    md:text-[21px]
    text-[14px]
    md:leading-[30.5px]
    leading-[19.6px]
    md:normal-case
    uppercase
    font-semibold 
    `,
  h6: `
    md:text-[18px]
    text-[16px]
    md:leading-[21px]
    leading-[19.6px]
    font-semibold 
    `,
  h7: `
    text-[14px]
    leading-[19.6px]
    font-semibold 
    uppercase
    tracking-[3px]
    `,
  p18: `
    md:text-[18px]
    text-[16px]
    md:leading-[32.8px]
    leading-[28.8px]
    `,
  p16: `
    md:text-[16px]
    text-[14px]
    md:leading-[28.8px]
    leading-[25.2px]
    `,
  p14: `
    md:text-[14px]
    text-[12px]
    md:leading-[25.2px]
    leading-[21.6px]
    `,
  p12: `
    text-[12px]
    leading-[21.6px]
    `,
};
const validElements = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "h7",
  "p12",
  "p14",
  "p16",
  "p18",
];

Text.defaultProps = {};

export { Text };
