import React, { useContext, useState } from "react";
import { ARRAY_CONTEXT } from "../App";
import FormComponent from "./FormComponent";

const ConditionGeneration = () => {
  const ARRAY = useContext(ARRAY_CONTEXT);
  const [conditionType, setCondtionType] = useState("");
  const [current, setCurrent] = useState([]);
  // This will add row
  const addRow = (id) => {
    if (conditionType === "") {
      alert("Please Select Condition First");
      return;
    } else if (ARRAY.array.length === 0 && current.length === 0) {
      alert("Firstly Create Condition then add !");
      return;
    } else if (ARRAY.array.length >= current.length) {
      alert("Firstly Create Condition then add !");
      return;
    }
    ARRAY.setArray([...ARRAY.array, id]);
  };
  // This will delete the row
  const dele = (uid) => {
    for (let i = 0; i < ARRAY.array.length; i++) {
      if (parseFloat(ARRAY.array[i]) === uid) {
        ARRAY.array.splice(i, 1);
        ARRAY.setArray([...ARRAY.array]);
      }
      for (let j = 0; j < current.length; j++) {
        if (current[j].id === uid) {
          current.splice(j, 1);
          setCurrent([...current]);
        }
      }
    }
  };
  return (
    <div className="main_container">
      <br />
      <h2>Rule Group</h2>
      <h5>Product(s) must match : </h5>
      <div>
        <input
          type="radio"
          id="any"
          onChange={(e) => setCondtionType(e.target.value)}
          name="check_conditions"
          value="any"
        />
          <label htmlFor="any">Any Conditions</label> {" "}
        <input
          type="radio"
          id="all"
          onChange={(e) => setCondtionType(e.target.value)}
          name="check_conditions"
          value="all"
        />
          <label htmlFor="all">All conditions</label>
        <br />
        <br />
      </div>
      <FormComponent
        current={current}
        setCurrent={setCurrent}
        type={conditionType}
        uid={0}
      />
      {ARRAY.array.length > 0 ? (
        <>
          {ARRAY.array.map((item, index) => (
            <div key={index} className="d-flex">
              {" "}
              <FormComponent
                current={current}
                setCurrent={setCurrent}
                type={conditionType}
                uid={item}
              />
              <div style={{ marginLeft: "10px" }}>
                <button className="btn btn-danger" onClick={() => dele(item)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      ) : null}
      <button
        className="btn btn-primary"
        onClick={() => addRow(Math.ceil(Math.random() * 12121212))}
      >
        Add More
      </button>
      <br />
      <br />
      {current.length > 0 ? (
        <div className="d-flex">
          <strong className="me-3">Current Condition : </strong>{" "}
          {current.map((item, index) => (
            <div className="d-flex" key={index}>
              <strong>{item.data}</strong>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ConditionGeneration;
