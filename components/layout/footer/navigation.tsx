import React from "react";
import ctl from "@netlify/classnames-template-literals";

import { NLink } from "components/nlink";

import footerMenu from "config/menu.json";
import { Text } from "components";

const FooterNavigation = () => {
  return (
    <nav className={footerNavigationStyle}>
      <ul>
        {footerMenu.map((listItem, index) => {
          return (
            <li key={`footer_list_item_${index}`} className="mt-2">
              <NLink {...listItem}>
                <Text variant="p16" color="primary-900">
                  {listItem.title}
                </Text>
              </NLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const footerNavigationStyle = ctl(`
grid
md:grid-cols-4
grid-cols-2
gap-8
`);

export { FooterNavigation };
