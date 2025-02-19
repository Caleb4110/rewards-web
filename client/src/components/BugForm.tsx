import { useState } from "react";
import Button from "./Button";
import {
  osName,
  osVersion,
  browserName,
  browserVersion,
  isDesktop,
  isMobile,
} from "react-device-detect";

export default function FilterList() {
  const mobileOrDesktop = isDesktop ? "Desktop" : isMobile ? "Mobile" : "Other";
  const [desc, setDesc] = useState<string>("");

  const handleChange = (e: any) => {
    e.preventDefault();
    setDesc(e.target.value); // set name to e.target.value (event)
  };

  return (
    <form className="flex w-full h-full space-y-3 flex-col justify-between  text-raisin_black ">
      <div className="flex flex-col">
        <label>Bug Description</label>
        <textarea
          className="h-full rounded-md p-1"
          value={desc}
          onChange={handleChange}
        />
      </div>
      <div className="flex space-x-1 items-center">
        <label>OS:</label>
        <input readOnly={true} className="p-1 rounded-md" value={osName} />
      </div>
      <div className="flex space-x-1 items-center">
        <label>OS version:</label>
        <input readOnly={true} className="p-1 rounded-md" value={osVersion} />
      </div>
      <div className="flex space-x-1 items-center">
        <label>Browser:</label>
        <input readOnly={true} className="p-1 rounded-md" value={browserName} />
      </div>
      <div className="flex space-x-1 items-center">
        <label>Browser version:</label>
        <input
          readOnly={true}
          className="p-1 rounded-md"
          value={browserVersion}
        />
      </div>
      <div className="flex space-x-1 items-center">
        <label>Device type:</label>
        <input
          readOnly={true}
          className="p-1 rounded-md"
          value={mobileOrDesktop}
        />
      </div>
      <Button label="SUBMIT" variant="primary" />
    </form>
  );
}
