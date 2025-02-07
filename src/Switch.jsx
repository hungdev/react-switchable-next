import React, { useState, useEffect, cloneElement } from "react";
import PropTypes from "prop-types";
import Overlay from "./Overlay";
import Item from "./Item";
import "./Switch.scss";

const proxy =
  (fn) =>
  (fnTarget) =>
  (...args) => {
    fn(...args);
    if (!fnTarget) return;
    fnTarget.apply(fnTarget, args);
  };

const Switch = ({
  children = [],
  onValueChange,
  onSelection,
  onItemChanged,
  onItemSelected,
  tabIndex = 0,
  disable = false,
  arrowSelection = true,
  className = "",
  name,
  customOverlay: CustomOverlay,
  onKeyDown,
  ...rest
}) => {
  const getDefaultActiveIndex = () => {
    const pos = children.findIndex(({ props }) => props.default);
    return pos > -1 ? pos : 0;
  };

  const [activeIndex, setActiveIndex] = useState(getDefaultActiveIndex());
  const [autoControlled, setAutoControlled] = useState(true);

  useEffect(() => {
    const childIndexActive = children.findIndex((e) => e.props.active);
    if (childIndexActive < 0) {
      setAutoControlled(true);
    } else if (childIndexActive !== activeIndex) {
      setActiveIndex(childIndexActive);
      setAutoControlled(false);
    }
  }, [children]);

  const onSelectionHandler = (position) => {
    if (disable || children[position].props.disable) return;
    if (onSelection) onSelection(position);
    if (onItemSelected) onItemSelected(position);
    if (!autoControlled) return;
    setChecked(position);
  };

  const setChecked = (newPosition) => {
    setActiveIndex(newPosition);
    const fn = onValueChange || onItemChanged;
    if (fn) {
      const child = children[newPosition];
      fn(child.props.value, newPosition, activeIndex, child);
    }
  };

  const getItemProps = (child, index) => ({
    onClick: proxy(() => onSelectionHandler(index))(child.props.onClick),
    onKeyDown: proxy(({ key }) =>
      key === "Enter" || key === " " ? onSelectionHandler(index) : null
    )(child.props.onKeyDown),
    tabIndex: disable ? -1 : child.props.tabIndex,
    active: activeIndex === index,
    name,
  });

  const FinalOverlay = CustomOverlay || Overlay;

  return (
    <div
      role="radiogroup"
      aria-disabled={disable}
      tabIndex={disable ? -1 : tabIndex}
      className={[
        "abg-switch abg-switch__container",
        className,
        disable ? "abg-switch--disable" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onKeyDown={
        arrowSelection
          ? proxy(({ key }) => {
              if (key === "ArrowLeft" && activeIndex > 0) onSelectionHandler(activeIndex - 1);
              else if (key === "ArrowRight" && activeIndex < children.length - 1)
                onSelectionHandler(activeIndex + 1);
            })(onKeyDown)
          : onKeyDown
      }
      {...rest}
    >
      {children.map((child, index) => cloneElement(child, getItemProps(child, index)))}
      <FinalOverlay selectedIndex={activeIndex} totalItems={children.length} />
    </div>
  );
};

Switch.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  onValueChange: PropTypes.func,
  onSelection: PropTypes.func,
  onItemChanged: PropTypes.func,
  onItemSelected: PropTypes.func,
  tabIndex: PropTypes.number,
  disable: PropTypes.bool,
  arrowSelection: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  customOverlay: PropTypes.func,
  onKeyDown: PropTypes.func,
};

export default Switch;
