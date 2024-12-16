"use client";

import { CURRENCIES, CURRENCIES_OBJ } from "@/lib/currencies";
import Image from "next/image";
import { useState } from "react";
import Select, { components } from "react-select";
import reactStringReplace from "react-string-replace";

const CustomOption = (props) => {
  const searchText = props.selectProps.inputValue; // Get the current search text
  const formattedLabel = reactStringReplace(props.data.label, searchText, (match, i) => (
    <span key={i} style={{ color: "blue" }}>
      {match}
    </span>
  ));

  return (
    <components.Option {...props}>
      <div className="flex items-center gap-2">
        <Image src={`/flags/${props.data.value}.png`} alt={`${props.data.value}.png`} width={24} height={24} />
        <p>{formattedLabel}</p>
      </div>
    </components.Option>
  );
};

function CurrencySelect({ onChange = () => {}, inputRef }) {
  const options = CURRENCIES.map((currency) => ({
    value: currency.code,
    label: currency.code + " - " + currency.name,
  }));
  const [inputValue, setInputValue] = useState("");

  const customFilter = (inputValue) => {
    return options
      .filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()) || option.value.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(0, 10); // Limit to top 10 matches
  };

  return (
    <div className="[&_*]:no-outline">
      <Select
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
            overflow: "hidden", // Ensure shadow respects the rounded corners
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
            padding: "4px 10px", // Match padding with input control
            fontSize: "0.875rem",
            backgroundColor: state.isFocused ? "#E2E8F0" : "white", // Hover color
            color: state.isSelected ? "#1E293B" : "#1E293B", // Selected text color
            borderRadius: "0.5rem", // Rounded corners for options
            cursor: "pointer",
            ":active": {
              backgroundColor: "#CBD5E1",
            },
          }),
        }}
        components={{ Option: CustomOption }}
        // options={customFilter(inputValue)}
        options={options}
        className="mt-2 shadow"
        ref={inputRef}
        onChange={onChange}
        onInputChange={(value) => {
          setInputValue(value);
        }}
        // filterOption={() => true}
      />
    </div>
  );
}

export default CurrencySelect;
