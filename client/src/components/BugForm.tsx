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
  const [result, setResult] = useState<string>("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    console.log(formData);
    formData.append("access_key", "33ac4c1c-1897-424e-b26c-ad9303a568bf");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="flex w-full h-full space-y-3 flex-col justify-between  text-raisin_black ">
      <form
        onSubmit={onSubmit}
        className="flex flex-col w-full h-full space-y-3"
      >
        <div className="flex flex-col">
          <label htmlFor="Bug Description">Bug Description</label>
          <textarea
            name="Bug Description"
            className="h-full rounded-md p-1 border border-raisin_black"
            placeholder="Describe the bug..."
            required
          />
        </div>
        <div className="flex space-x-1 items-center">
          <label htmlFor="OS">OS:</label>
          <input
            name="OS"
            readOnly={true}
            className="p-1 rounded-md border border-raisin_black"
            value={osName}
            required
          />
        </div>
        <div className="flex space-x-1 items-center">
          <label htmlFor="OS Version">OS Version:</label>
          <input
            name="OS Version"
            readOnly={true}
            className="p-1 rounded-md border border-raisin_black"
            value={osVersion}
            required
          />
        </div>
        <div className="flex space-x-1 items-center">
          <label htmlFor="Browser">Browser:</label>
          <input
            name="Browser"
            readOnly={true}
            className="p-1 rounded-md border border-raisin_black"
            value={browserName}
            required
          />
        </div>
        <div className="flex space-x-1 items-center">
          <label htmlFor="Browser Version">Browser Version:</label>
          <input
            name="Browser Version"
            readOnly={true}
            className="p-1 rounded-md border border-raisin_black"
            value={browserVersion}
            required
          />
        </div>
        <div className="flex space-x-1 items-center">
          <label htmlFor="Device Type">Device Type:</label>
          <input
            name="Device Type"
            readOnly={true}
            className="p-1 rounded-md border border-raisin_black"
            value={mobileOrDesktop}
            required
          />
        </div>
        <Button type="submit" variant="primary" label="SUBMIT" />
      </form>
      <span>{result}</span>
    </div>
  );
}
