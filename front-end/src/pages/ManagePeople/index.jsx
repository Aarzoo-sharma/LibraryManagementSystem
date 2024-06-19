import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import AddPeople from "./AddPeople";
import RemovePeople from "./RemovePeople";

function ManagePeople() {
  const [enabled, setEnabled] = useState(true);
  return (
    <div className="m-3">
      <div className="border-2 py-3 mb-4 rounded-xl  bg-white">
        <h2 className=" flex items-center gap-3 justify-center text-base py-1 font-semibold leading-7 px-5 border-b text-gray-900">
          <h2>Delete People</h2>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${enabled ? "bg-blue-500" : "bg-red-700"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${enabled ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
          <h2>Add People</h2>
        </h2>
        <div className="px-5 py-2">
          {enabled ? <AddPeople /> : <RemovePeople />}
        </div>
      </div>
    </div>
  );
}

export default ManagePeople;
