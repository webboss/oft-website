import { yupResolver } from "@hookform/resolvers/yup";
import ctl from "@netlify/classnames-template-literals";
import { useForm } from "react-hook-form";
import { Button, Input, Modal2, Text } from "components";
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
    <Modal2 closeModal={closeModal}>
      <form onSubmit={handleSubmit(onComplete)}>
        <div className="grid md:grid-cols-2 md:gap-y-2 md:gap-x-40">
          <Input
            label="Category"
            className={searchInputStyle}
            register={register("category")}
            type="select"
          >
            <option value="">Select resource category</option>
            {categories.map((category, index) => {
              return <option key={`category-${index}`}>{category.name}</option>;
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
        <div className="flex items-center justify-end space-x-3 mt-6 md:mt-10">
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
    </Modal2>
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

const searchInputStyle = ctl(`
    cursor-pointer
`);

export { ResourceFilterModal };
