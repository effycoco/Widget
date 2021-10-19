import React, { useState } from "react";
import Accordion from "./components/Accordion";
import Search from "./components/Search";
import Dropdown from "./components/Dropdown";
import Translate from "./components/Translate";
import Route from "./components/Route";
import Header from "./components/Header";
const items = [
  {
    title: "title1",
    content: "content1",
  },
  {
    title: "title2",
    content: "content2",
  },
  {
    title: "title3",
    content: "content3",
  },
];
const options = [
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
];

const App = () => {
  const [selected, setSelected] = useState(options[0]);
  const [showDropdown, setShowDropdown] = useState(true);

  return (
    <div>
      <Header />
      <Route path="/">
        <Accordion items={items} />
      </Route>
      <Route path="/list">
        <Search />
      </Route>
      <Route path="/dropdown">
        {/* <button
          onClick={() => {
            setShowDropdown(!showDropdown);
          }}
        >
          Toggle Dropdown
        </button>
        {showDropdown ? ( */}
        <Dropdown
          title="Select a Color"
          onSelectChange={setSelected}
          selected={selected}
          options={options}
        />
        {/* ) : null} */}
      </Route>
      <Route path="/translate">
        <Translate />
      </Route>
    </div>
  );
};

export default App;
