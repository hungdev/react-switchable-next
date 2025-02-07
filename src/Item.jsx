import React from "react";
import PropTypes from "prop-types";
import "./Item.scss";

const Item = ({
  name,
  active = false,
  className = "",
  disable = false,
  value,
  children = "",
  ...rest
}) => {
  const classes = [
    "abg-switch__item",
    className,
    active ? "abg-switch__item--on" : "",
    disable ? "abg-switch__item--disable" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} tabIndex={disable ? -1 : 0} {...rest}>
      {children}
      <input
        tabIndex={disable ? -1 : 0}
        type="radio"
        value={value}
        name={name}
        defaultChecked={active}
      />
    </span>
  );
};

Item.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.node,
  disable: PropTypes.bool,
  active: PropTypes.bool,
  name: PropTypes.string,
  className: PropTypes.string,
};

export default Item;
