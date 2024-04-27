import ctl from "@netlify/classnames-template-literals";
import { Text } from "components";
import React from "react";
import { ResourceItem } from "./item";

interface ResourceCategoryProps {
  title: string;
  list: [];
}
export const ResourceCategory = ({
  title,
  list = [],
}: ResourceCategoryProps) => {
  const categoryId = title && title.replace(/\s/g, "-").toLowerCase();

  return (
    <section id={categoryId}>
      {title && (
        <header className="flex items-center">
          <Text variant="h4" className=" mr-9 ">
            {title}
          </Text>
          <hr className="gradient-yellow-to-blue h-[1px] border-0 md:flex hidden flex-1" />
        </header>
      )}

      <div className={contentResourceListStyle}>
        {list.map((resource, index) => {
          return (
            <ResourceItem key={categoryId + "-" + index} resource={resource} />
          );
        })}
      </div>
    </section>
  );
};

const contentResourceListStyle = ctl(`
grid
md:grid-cols-3
grid-cols-2
md:gap-6
gap-2
md:my-[74px]
my-8
`);
