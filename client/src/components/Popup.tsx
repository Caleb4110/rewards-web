import { ReactInstance, ReactNode } from "react";

interface Props {
  isOpen: boolean;
  closePopup: () => void;
  element: ReactNode;
}

export default function Popup({ isOpen, closePopup, element }: Props) {
  const handlelosePopUp = (e: any) => {
    if (e.target.id === "ModelContainer") {
      closePopup();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="ModelContainer"
      onClick={handlelosePopUp}
      className="fixed inset-0 bg-raisin_black flex justify-center items-center bg-opacity-20  backdrop-blur-sm"
    >
      <div className=" bg-snow h-5/6 w-10/12 md:w-1/2 lg:1/3 shadow-inner rounded-lg">
        <div className="w-full h-full p-3 justify-center items-center">
          {element}
        </div>
      </div>
    </div>
  );
}
