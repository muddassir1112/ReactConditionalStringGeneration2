import React, { useState } from "react";

const FormComponent = ({ current, setCurrent, type, uid }) => {
  const [selectField, setSelectField] = useState("");
  const [condition, setCondition] = useState("");
  const [val, setVal] = useState("");
  const fields = ["Title", "Quantity", "Price", "Brand"];

  // To get the conditions
  const conditionsString = {
    Equals: "==",
    "Not Equals": "!=",
    Contain: ".contains",
    "Not Contain": "!contains",
  };

  const conditionsInteger = {
    Equals: "==",
    "Not Equals": "!=",
    "Less Than Equals": "<=",
    "Greater Than Equals": ">=",
  };

  // This will create the current string
  const currentString = () => {
    let conditionType = "";
    if (type === "all") {
      conditionType = "&&";
    } else if (type === "any") {
      conditionType = "||";
    }
    if (condition !== "") {
      let obj = {
        id: uid,
        data: ` ${uid === 0 ? "" : `${conditionType}`} (${selectField} ${
          selectField === "Title" || selectField === "Brand"
            ? conditionsString[condition]
            : conditionsInteger[condition]
        } ${val})`,
      };
      setCurrent([...current, obj]);
    }
  };

  return (
    <>
      <div className="d-flex mb-4">
        <span style={{ marginRight: "22px" }}>
          <select
            style={{ width: "250px" }}
            className="form-select"
            onChange={(e) => setSelectField(e.target.value)}
          >
            <option defaultValue={""} disabled selected>
              Fields
            </option>
            {fields.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </span>
        <span style={{ margin: "0% 22px 0% 30px" }}>
          <select
            className="form-select"
            style={{ width: "250px" }}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option defaultValue={""} selected disabled>
              Conditions
            </option>
            {selectField !== "" ? (
              <>
                {selectField === "Title" || selectField === "Brand"
                  ? Object.keys(conditionsString).map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))
                  : Object.keys(conditionsInteger).map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
              </>
            ) : (
              <option value="null" disabled>
                Please Select Field First
              </option>
            )}
          </select>
        </span>
        <span style={{ margin: "0% 22px 0% 30px" }}>
          <input
            type="text"
            style={{ width: "250px" }}
            className="form-control"
            onChange={(e) => setVal(e.target.value)}
          />
        </span>
        <span className="ms-4">
          <button
            className="btn btn-outline-primary"
            onClick={() => currentString()}
          >
            Create
          </button>
        </span>
      </div>
    </>
  );
};

export default FormComponent;
