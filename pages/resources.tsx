import ctl from "@netlify/classnames-template-literals";
import { GetStaticProps } from "next";
import React from "react";
import {
  Container,
  Input,
  Newsletter,
  NLink,
  Text,
  Layout,
  Button,
} from "components";
import { getAllCategory, getAllResources } from "lib/api";
import {
  ResourceFilterModal,
  ResourceItem,
  ResourcesHeader,
  useResources,
} from "templates/resources";
import ArrowIcon from "svgs/arrow.svg";
import RightArrowIcon from "svgs/arrow-right.svg";
import FilterIcon from "svgs/filter.svg";
import SearchIcon from "svgs/search.svg";
import SearchInfoIcon from "svgs/search-info.svg";
import CloseIcon from "svgs/x.svg";

const ResourcePage = ({ categories, resources }) => {
  const {
    filter,
    setFilter,
    activeFilters,
    removeFilterItem,
    categoriesList,
    isFilterModalOpen,
    setIsFilterModalOpen,
    setNoOfResourcesToShow,
    register,
    resourcesToShow,
    filteredSearchedResources,
  } = useResources({ categories, resources });

  return (
    <Layout
      title="Resources"
      description="Carefully selected books, schools, courses to kickstart and supercharge your non-coding career in tech "
    >
      <div className="overflow-x-hidden">
        <ResourcesHeader totalCount={resources?.nodes?.length} />
        <div className={arrowsContainerStyle}>
          <ArrowIcon className={arrowLeftStyle} />
          <ArrowIcon className={arrowRightStyle} />
        </div>

        {activeFilters.length > 0 ? (
          <div className="max-w-[700px] md:mx-auto mx-5">
            <div className={searchWrapperStyle}>
              <SearchIcon className="md:w-7 w-[24px]" />
              <Input
                placeholder="Search Resources"
                className={searchInputStyle}
                register={register("search")}
              />
              <button onClick={() => setIsFilterModalOpen(true)} type="button">
                <FilterIcon />
              </button>
            </div>
            <div className="flex flex-wrap items-center mt-3 mb-12">
              {activeFilters.map(([key, value]) => (
                <div className={filterItemStyle}>
                  <span>{value}</span>
                  <button type="button" onClick={() => removeFilterItem(key)}>
                    <CloseIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={centerContentWrapperStyle}>
            <Button
              text="Get started"
              size="small"
              onClick={() => setIsFilterModalOpen(true)}
              className="px-8 mb-8 md:mb-0"
            />
          </div>
        )}
        <Container className={formContainerStyle}>
          {resourcesToShow?.length > 0 ? (
            <>
              <div className={resourcesGridStyle}>
                {resourcesToShow?.map((resource, index) => (
                  <ResourceItem key={index} resource={resource} />
                ))}
              </div>
              {resourcesToShow?.length < filteredSearchedResources?.length && (
                <div className="flex h-full flex-col justify-center md:px-[24px] px-2">
                  <button
                    className="flex md:text-inherit md:text-xl font-medium items-center group mx-auto cursor-pointer"
                    onClick={() => setNoOfResourcesToShow((prev) => prev + 9)}
                  >
                    See More
                    <RightArrowIcon className=" transition md:w-[22px] w-4 transform ml-2 group-hover:translate-y-1 rotate-90" />
                  </button>
                </div>
              )}
              <div className="gradient-blue-to-red md:pt-10 pr-1 md:pr-20 pb-2 md:pb-12 pl-4 md:pl-16 mt-14 md:mt-44 rounded-3xl flex flex-col md:flex-row items-end justify-between space-y-8 md:space-y-0 md:space-x-8">
                <Text
                  value="Couldn't find the resources you are looking for? Kindly give a suggestion."
                  variant="h3"
                  className="mt-8 md:leading-10 md:w-[500px]"
                />
                <div>
                  <NLink
                    href={{
                      url: "https://forms.gle/yfr3QURUQcZQh3xd6",
                    }}
                    className="flex md:text-inherit md:text-2xl font-medium items-center group mx-auto bg-black p-4 pr-5 rounded-md md:-mb-4"
                  >
                    Give suggestion
                    <RightArrowIcon className=" transition md:w-[22px] w-4 transform ml-2 group-hover:translate-x-2" />
                  </NLink>
                </div>
              </div>
            </>
          ) : (
            <div className={emptyStateContainer}>
              <SearchInfoIcon />
              <Text variant="p16" className="mt-8 leading-10">
                <>
                  We couldn't find anything matching to your search. <br />
                  Try again with different terms
                </>
              </Text>
            </div>
          )}
        </Container>
        <section>
          <Newsletter />
        </section>

        {isFilterModalOpen && (
          <ResourceFilterModal
            categories={categoriesList}
            closeModal={() => {
              setIsFilterModalOpen(false);
            }}
            formData={filter}
            onComplete={(data) => {
              setFilter(data);
              setIsFilterModalOpen(false);
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default ResourcePage;

export const getStaticProps: GetStaticProps = async () => {
  const { categories } = await getAllCategory();
  const { resources } = await getAllResources();

  return {
    props: { categories, resources },
    revalidate: 10,
  };
};

const formContainerStyle = ctl(`
  mb-[160px]
`);

const resourcesGridStyle = ctl(`
  grid
  md:grid-cols-3
  grid-cols-2
  md:gap-6
  gap-2
  md:my-36
  md:mb-10
  my-8
`);

const searchWrapperStyle = ctl(`
    flex
    items-center
    !border-[1.5px]
    !md:border-2
    rounded-full
    px-4
    md:px-5
`);

const searchInputStyle = ctl(`
    placeholder:text-[#4B4B4B]
    border-none
    pb-0
    rounded-none
`);

const emptyStateContainer = ctl(`
  mx-auto
  flex
  flex-col
  items-center
  justify-center
  text-center
`);

const arrowsContainerStyle = ctl(`
  mt-6
  relative
  invisible
  lg:visible
  hidden
  lg:block
`);

const arrowLeftStyle = ctl(`
  absolute
  -top-20
  left-[-100px]
  lg:w-auto
  lg:w-[200px]
`);

const arrowRightStyle = ctl(`
  absolute
  transform
  rotate-180
  right-[-100px]
  lg:w-auto
  lg:w-[200px]
`);

const centerContentWrapperStyle = ctl(`
  flex
  items-center
  justify-center
`);

const filterItemStyle = ctl(`
  px-4
  py-2
  rounded-full
  text-primary-800
  bg-grey-100
  border
  border-grey-200
  flex
  items-center
  space-x-6
  mr-8
  mt-4
  text-sm
`);
