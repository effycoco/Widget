import React, { useEffect, useState, useRef } from "react";

const Dropdown = (props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) return;
      setOpen(false);
      //console.log(event.target);
    };
    document.body.addEventListener("click", onBodyClick, { capture: true });
    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, []);
  const renderedOptions = props.options.map((option) => {
    if (option.value === props.selected.value) return null;
    return (
      <div
        key={option.value}
        className="item"
        onClick={() => {
          props.onSelectChange(option);
          // console.log("item clicked");
          //console.log("event bubble");
        }}
      >
        {option.label}
      </div>
    );
  });

  //console.log(ref.current);
  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{props.title}</label>
        <div
          onClick={() => {
            setOpen(!open);
            //console.log("dropdown clicked");
          }}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="icon dropdown"></i>
          <div className="text">{props.selected.label}</div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
    /* <div style={{ color: props.selected.value }}>
        text is {props.selected.value}{" "}
      </div> */
  );
};

export default Dropdown;
