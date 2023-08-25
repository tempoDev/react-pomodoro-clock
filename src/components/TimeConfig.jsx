import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from "react";

export default function TimeConfig({ name, label, time, setTime}) {

  return (
    <div id={`${name}-label`}>
      <label>{label} Length</label>

      <div className={`${name}-input`}>
        <div
          className="icon-arrow"
          icon={faArrowDown}
          id={`${name}-decrement`}
          onClick={() => setTime("decrement")}
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </div>

        <div id={`${name}-length`}>{time}</div>

        <div
          className="icon-arrow"
          id={`${name}-increment`}
          onClick={() => setTime("increment")}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </div>
      </div>
    </div>
  );
}
