import React, { Component } from "react";
import "../css/loader.css";

export default class Loader extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="spinnerBox">
        <div className="slices">
          <div className="slice slice-1"></div>
          <div className="slice slice-2"></div>
          <div className="slice slice-3"></div>
          <div className="slice slice-4"></div>
          <div className="slice slice-5"></div>
          <div className="slice slice-6"></div>
          <div className="slice slice-7"></div>
          <div className="slice slice-8"></div>
          <div className="slice slice-9"></div>
          <div className="slice slice-10"></div>
          <div className="slice slice-11"></div>
          <div className="slice slice-12"></div>
        </div>
        <div className="bar bar-1"></div>
        <div className="bar bar-2"></div>
        <div className="bar bar-3"></div>
        <div className="bar bar-4"></div>
        <div className="bar bar-5"></div>
        <div className="bar bar-6"></div>
        <div className="bar bar-7"></div>
        <div className="bar bar-8"></div>
        <div className="bar bar-9"></div>
        <div className="bar bar-10"></div>
        <div className="bar bar-11"></div>
        <div className="bar bar-12"></div>
        <span className="text">
          <i className="fas fa-mail-bulk"></i>
        </span>
      </div>
    );
  }
}
