import { useState } from "react";
import axios from "@/config/axios";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import reactStringReplace from "react-string-replace";

const CustomOption = (props) => {
  const searchText = props.selectProps.inputValue;
  const formattedLabel = reactStringReplace(props.data.label, searchText, (match, i) => (
    <span key={i} style={{ color: "blue" }}>
      {match}
    </span>
  ));

  return <components.Option {...props}>{formattedLabel}</components.Option>;
};

function UserSelect({ onChange = () => {}, inputRef }) {
  const [cache, setCache] = useState({}); // State to store cached results

  async function fetchUsers(search) {
    // Check cache first
    if (cache[search]) {
      return cache[search];
    }

    // Fetch data from API if not cached
    const res = await axios.get("/api/users", {
      params: {
        search: search,
      },
    });

    const options = res.data.map((obj) => ({
      value: obj.id,
      label: obj.username + " - " + obj.email,
      username: obj.username,
    }));

    // Update cache
    setCache((prevCache) => ({
      ...prevCache,
      [search]: options,
    }));

    return options;
  }

  return (
    <div className="[&_*:is(input,button,a,textarea)]:no-outline">
      <AsyncSelect
        styles={{
          container: (provided) => ({
            ...provided,
            width: "100%",
            borderRadius: "0.5rem",
          }),
          control: (provided, state) => ({
            ...provided,
            padding: "4px 10px",
            minHeight: "0",
            borderColor: state.isFocused ? "#CBD5E1" : "#CBD5E1",
            borderRadius: "0.5rem",
            boxShadow: state.isFocused ? "0 0 0 1px #94a3b8" : "none",
            fontSize: "0.875rem",
            transition: "box-shadow 0.2s",
            overflow: "hidden",
            ":hover": {
              borderColor: "#CBD5E1",
            },
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: "0",
          }),
          input: (provided) => ({
            ...provided,
            padding: "0",
            margin: "0",
          }),
          multiValue: (provided) => ({
            ...provided,
            backgroundColor: "#F1F5F9",
            borderRadius: "0.25rem",
            padding: "0.25rem",
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            fontSize: "0.875rem",
          }),
          placeholder: (provided) => ({
            ...provided,
            color: "#9CA3AF",
          }),
          indicatorSeparator: (provided) => ({
            ...provided,
            display: "none",
          }),
          indicatorsContainer: (provided) => ({
            ...provided,
            "> div": {
              padding: "0",
            },
          }),
          option: (provided, state) => ({
            ...provided,
            padding: "4px 10px",
            fontSize: "0.875rem",
            backgroundColor: state.isFocused ? "#E2E8F0" : "white",
            color: state.isSelected ? "#1E293B" : "#1E293B",
            borderRadius: "0.5rem",
            cursor: "pointer",
            ":active": {
              backgroundColor: "#CBD5E1",
            },
          }),
          menu: (provided) => ({
            ...provided,
            paddingInline: "2px",
            borderRadius: "8px",
          }),
        }}
        components={{ Option: CustomOption }}
        defaultOptions
        loadOptions={fetchUsers}
        ref={inputRef}
        onChange={onChange}
      />
    </div>
  );
}

export default UserSelect;
