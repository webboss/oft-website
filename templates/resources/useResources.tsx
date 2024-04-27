import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const useResources = ({ categories, resources }) => {
    const categoriesList = categories.nodes;
    const resourcesList = resources?.nodes?.reduce(
      (acc: any, resource: any) => {
        acc = [...acc, resource];
        return acc;
      },
      []
    );
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [noOfResourcesToShow, setNoOfResourcesToShow] = useState(9);
    const [filteredResources, setFilteredResources] = useState(resourcesList);
    const [filteredSearchedResources, setFilteredSearchedResources] =
      useState(filteredResources);
    const resourcesToShow = filteredSearchedResources?.slice(
      0,
      noOfResourcesToShow
    );

    const { register, watch } = useForm({
      mode: "onChange",
      defaultValues: { search: "" },
    });
    const search = watch("search");
    const [filter, setFilter] = useState({
      category: "",
      type: "",
      plan: "",
    });
    const activeFilters = Object.entries(filter).filter(
      ([key, value]) => value !== ""
    );

    const removeFilterItem = (key: string) => {
      setFilter((prevData) => ({ ...prevData, [key]: "" }));
    };

    const handleFilter = () => {
      const resourcesFiltered = resourcesList.filter((resource) => {
        const categoryMatch =
          filter.category === "" ||
          resource.categories.nodes?.some(
            (cat) => cat.name?.toLowerCase() === filter.category?.toLowerCase()
          );

        const typeMatch =
          filter.type === "" ||
          resource.resourceTypes.nodes.some(
            (type) => type.name?.toLowerCase() === filter.type?.toLowerCase()
          );

        const paymentPlanMatch =
          filter.plan === "" ||
          resource.resourcePayments.nodes.some(
            (payment) =>
              payment.name?.toLowerCase() === filter.plan?.toLowerCase()
          );

        return categoryMatch && typeMatch && paymentPlanMatch;
      });

      setFilteredResources(resourcesFiltered);
      setFilteredSearchedResources(resourcesFiltered);
    };

    const handleSearch = () => {
      const lowercaseSearchQuery = search.toLowerCase().trim();

      const searchResult = filteredResources.filter((resource) =>
        resource.title.toLowerCase().includes(lowercaseSearchQuery)
      );

      setFilteredSearchedResources(searchResult);
    };

    useEffect(() => {
      handleFilter();
    }, [filter]);

    useEffect(() => {
      handleSearch();
    }, [search]);

    return {
        categoriesList,
        isFilterModalOpen,
        setIsFilterModalOpen,
        setNoOfResourcesToShow,
        register,
        resourcesToShow,
        activeFilters,
        removeFilterItem,
        filteredSearchedResources,
        setFilter
    }

}

export { useResources };
