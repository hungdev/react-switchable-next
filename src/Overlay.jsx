import React from "react";
import PropTypes from "prop-types";
import "./Overlay.scss";

const Overlay = ({ selectedIndex, totalItems, className = "", ...rest }) => {
  const classes = [className, "abg-switch__overlay"].filter(Boolean).join(" ");

  return (
    <span
      className={classes}
      style={{
        width: `${100 / totalItems}%`,
        transform: `translateX(${100 * selectedIndex}%)`,
      }}
      {...rest}
    />
  );
};

Overlay.propTypes = {
  selectedIndex: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default Overlay;
