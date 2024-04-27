import { yupResolver } from "@hookform/resolvers/yup";
import ctl from "@netlify/classnames-template-literals";
import { useForm } from "react-hook-form";
import { Button, Input, Text } from "components";
import CloseIcon from "svgs/x-pattern.svg";
import { resourcesFilterSchema } from "utils/validations";

interface ResourceFilterModalProps {
  categories: any[];
  closeModal: () => void;
  onComplete: (data) => void;
}

const ResourceFilterModal = ({
  categories,
  closeModal,
  onComplete,
}: ResourceFilterModalProps) => {
  const { handleSubmit, register, reset } = useForm({
    defaultValues: { category: "", type: "", plan: "" },
    mode: "onChange",
    resolver: yupResolver(resourcesFilterSchema),
  });

  return (
    <div role="dialog" className={wrapperStyle}>
      <div className="bg-white p-9 rounded-3xl">
        <div className="flex items-center justify-between mb-10">
          <Text className="!text-black" value="FILTER" variant="h6" />
          <button onClick={closeModal}>
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit(onComplete)}>
          <div className="grid grid-cols-2 gap-y-4 gap-x-52">
            <Input
              label="Category"
              className={searchInputStyle}
              register={register("category")}
              type="select"
            >
              <option value="">Select resource category</option>
              {categories.map((category, index) => {
                return (
                  <option key={`category-${index}`}>{category.name}</option>
                );
              })}
            </Input>
            <Input
              label="Type"
              className={searchInputStyle}
              register={register("type")}
              type="select"
            >
              <option value="">Select resource type</option>
              {resourceTypes.map((type, index) => {
                return <option key={`type-${index}`}>{type}</option>;
              })}
            </Input>
            <Input
              label="Plan"
              className={searchInputStyle}
              register={register("plan")}
              type="select"
            >
              <option value="">Select resource plan</option>
              {planTypes.map((plan, index) => {
                return <option key={`plan-${index}`}>{plan}</option>;
              })}
            </Input>
          </div>
          <div className="flex items-center justify-end space-x-3 mt-10">
            <Button
              type="reset"
              text="Reset"
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                reset();
              }}
            />
            <Button type="submit" text="Apply" />
          </div>
        </form>
      </div>
    </div>
  );
};

const resourceTypes = [
  "Blog",
  "Book",
  "Community",
  "Course",
  "Podcast",
  "School",
  "Tool",
  "Website",
  "Youtube",
];
const planTypes = ["Free", "Paid"];

const wrapperStyle = ctl(`
    w-full
    h-screen
    bg-black/30
    backdrop-blur-md
    fixed
    left-0
    right-0
    bottom-0
    top-0
    z-10
    px-[16px]
    flex
    items-center
    justify-center
    text-grey
`);

const searchInputStyle = ctl(`
    cursor-pointer
`);

export { ResourceFilterModal };
