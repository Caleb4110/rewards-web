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
    <form
      onSubmit={onSubmit}
      className="flex flex-col w-full h-full space-y-3 text-raisin_black"
    >
      <div className="flex flex-col h-5/6">
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
      <div className="h-full content-end">
        <span>{result}</span>
        <Button type="submit" variant="primary" label="SUBMIT" />
      </div>
    </form>
  );
}
