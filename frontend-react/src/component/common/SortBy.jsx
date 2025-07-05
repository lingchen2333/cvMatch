import React from "react";
import { Dropdown, DropdownItem, Label, Select } from "flowbite-react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router";

const SortBy = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const options = [
    { sortBy: "dateApplied", sortOrder: "desc", label: "Latest" },
    { sortBy: "dateApplied", sortOrder: "asc", label: "Oldest" },
    { sortBy: "companyName", sortOrder: "desc", label: "Z-A" },
    { sortBy: "companyName", sortOrder: "asc", label: "A-Z" },
  ];

  function handleSortChange(e) {
    const selectedValue = e.target.value;
    console.log("selected value:", selectedValue);

    // Find the selected option to get both sortBy and sortOrder
    const selectedOption = options.find(
      (option) => `${option.sortBy}-${option.sortOrder}` === selectedValue,
    );

    if (selectedOption) {
      searchParams.set("sortBy", selectedOption.sortBy);
      searchParams.set("sortOrder", selectedOption.sortOrder);
      setSearchParams(searchParams);
    }
  }

  return (
    <>
      <div>
        <span className="text-sm text-gray-500">sort by </span>
        <select
          className="border-none bg-gray-100 py-0 font-medium capitalize focus:ring-0 focus:outline-none"
          onChange={handleSortChange}
        >
          {options.map((option, index) => (
            <option key={index} value={`${option.sortBy}-${option.sortOrder}`}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SortBy;
