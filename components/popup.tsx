import { useState } from 'react';
import ctl from "@netlify/classnames-template-literals";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className={container}>
          <div className="popup-content">
            <p className={p1}>
                This Privacy Notice applies to our website, www.otherfaces.tech,
                and its associated domains, collectively referred to as our "Service." 
                By accessing or utilizing our Service, you acknowledge that you have, 
                read, reviewed, comprehended, and consented to our data collection 
                procedures as delineated in our Privacy Policy. 
                This notice is essential for compliance with 
                the NDPR and other pertinent regulations. {" "}
            </p>

            <p className={p2}>
                By clicking "OK," you hereby grant consent to Otherfaces of Tech 
                for the collection of data for website functionality 
                and the preservation of service excellence.
            </p>
            <button className={button} onClick={handleClose}>OK</button>
          </div>
        </div>
      )}
    </>
  );
};

const container = ctl(`
    md:w-[520px]
    md:w-[90%]
    mx-auto
    bg-[#202021]
    p-4
`)

const button = ctl(`
    justify-self-end
    bg-[#2685FD]
    px-6
    py-1
    mt-4
    md:text-base
    text-[12px]
`)

const p1 = ctl(`
    md:text-[16px]
    text-[12px]
    leading-[25px]
`)

const p2 = ctl(`
    md:text-[16px]
    text-[12px]
    leading-[25px]
    mt-8
`)


export default Popup;
