import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, InputGroup, FormControl } from "react-bootstrap";
let limits = {
  100000: 2,
  50000: 4,
  20000: 6,
  10000: 7,
  5000: 9,
  2000: 9,
  1000: 11,
  500: 23,
};

export default function Change() {
  const [change2, setChange2] = useState({});

  console.log(Object.getOwnPropertyNames(change2));

  const [change, setChange] = useState("");

  let mr = { marginLeft: "25%" };
  let handleResolve = (amountRequired, limits) => {
    function collect(amount, nominals) {
      if (amount === 0) return {};

      if (!nominals.length) return;

      let currentNominals = nominals[0];
      let availableNotes = limits[currentNominals];
      let notesNeeded = Math.floor(amount / currentNominals);
      let numberOfNotes = Math.min(availableNotes, notesNeeded);
      for (let i = numberOfNotes; i >= 0; i--) {
        let result = collect(amount - i * currentNominals, nominals.slice(1));
        if (result) {
          return numberOfNotes ? { [currentNominals]: i, ...result } : result;
        }
      }
    }
    let nominals = Object.keys(limits)
      .map(Number)
      .sort((a, b) => b - a);
    return collect(amountRequired, nominals);
  };

  let handleChang = (value) => {
    setChange(value);
  };
  let handleChang2 = () => {
    let a = handleResolve(change, limits);

    setChange2({
      ...a,
    });
    setChange("");
  };

  ////////////////////////////////////////////////

  return (
    <div style={{ width: "47%", marginLeft: "25%" }}>
      <h1 style={mr}> Change sum </h1>
      <h5 style={mr}> Max sum: 100000 </h5>
      <h5 style={mr}> Min sum: 500 </h5>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Change sum"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={change}
          onChange={(event) => handleChang(event.target.value)}
        />
        <InputGroup.Append>
          <Button variant="success" onClick={handleChang2}>
            Change
          </Button>
        </InputGroup.Append>
      </InputGroup>
      Sum: {change2.sum} <br />
      <br />
      Mount: {change2.mount}
    </div>
  );
}
