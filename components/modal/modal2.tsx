import ctl from "@netlify/classnames-template-literals";
import { Text } from "components";
import CloseIcon from "svgs/x-pattern.svg";

interface Modal2Props {
  children: React.ReactNode;
  closeModal: () => void;
}

const Modal2 = ({
  children,
  closeModal,
}: Modal2Props) => {
  return (
    <div role="dialog" className={wrapperStyle}>
      <div className="bg-white px-4 py-9 py md:p-9 rounded-3xl">
        <div className="flex items-center justify-between mb-10 w-[90%] md:w-full">
          <Text className="!text-black" value="FILTER" variant="h6" />
          <button onClick={closeModal}>
            <CloseIcon />
          </button>
        </div>
       {children}
      </div>
    </div>
  );
};

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

export { Modal2 };
