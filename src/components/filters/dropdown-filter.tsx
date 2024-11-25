import { ChangeEvent, useState } from "react";

export const DropdownFilter = () => {
  const [filter, setFilter] = useState<string>("");

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <select name="filter" value={filter} onChange={handleFilterChange}>
        <option value="" defaultChecked={true}></option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </div>
  );
};
