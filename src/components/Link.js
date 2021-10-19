import React from "react";
const Link = ({ href, children }) => {
  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    window.history.pushState({}, "", href);
    //tell Route component that url has changed
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };
  return (
    <a onClick={handleClick} className="item" href={href}>
      {children}
    </a>
  );
};
export default Link;
