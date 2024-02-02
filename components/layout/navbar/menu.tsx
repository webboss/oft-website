import React, { Key } from "react";
import ctl from "@netlify/classnames-template-literals";

import CloseIcon from "../../../svgs/close.svg";
import menulist from "../../../config/menu.json";
import Image from "next/image";
import { Container, NLink, Text } from "components";

const Menu = ({ onToggle }) => {
  return (
    <div className={navWrapperStyle}>
      <Container>
        <header className={headerStyle}>
          <button className={closeButtonStyle} onClick={onToggle}>
            <CloseIcon width={32} className="md:w-[32px] w-[20px]" />
          </button>

          <NLink to="/">
            <Image
              alt="Otherfaces of Tech"
              src="/assets/images/otherfaces.tech.png"
              width={160}
              height={120}
              className="md:w-auto w-[120px]"
            />
          </NLink>
          <div></div>
        </header>
        <nav>
          <ul className={listWrapper}>
            {menulist.map((menuItem) => {
              const { title, to, href } = menuItem;
              const componentKey = to || (href?.url as Key);
              return (
                <Text
                  variant="h3"
                  as="li"
                  color="primary-100"
                  className="md:mb-[36px] mb-[32px]"
                >
                  <NLink
                    {...menuItem}
                    key={componentKey}
                    activeClassName={activePageLink}
                  >
                    {title}
                  </NLink>
                </Text>
              );
            })}
          </ul>
        </nav>
      </Container>
    </div>
  );
};

const closeButtonStyle = ctl(`
p-0
m-0
`);

const navWrapperStyle = ctl(`
w-full
h-full
bg-black
fixed
left-0
right-0
top-0
z-[999]
`);

const listWrapper = ctl(`
text-right
lg:pr-[80px]
md:mt-[40px]
mt-[100px]
`);

const activePageLink = ctl(`
gradient-blue-to-red
bg-clip-text
text-transparent
`);

const headerStyle = ctl(`
flex
justify-between
items-center
py-[24px]
`);

export { Menu };
