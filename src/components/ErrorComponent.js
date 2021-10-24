import React from "react";

export let ErrorComponent = (props) => {
  if (typeof props.errors[props.name] !== "undefined") {
    return (
      <div className="show-error invalid-feedback">
        {props.errors[props.name].msg}
      </div>
    );
  } else {
    return "";
  }
};
