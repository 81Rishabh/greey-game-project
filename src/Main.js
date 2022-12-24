import React, { useState } from "react";
import AnalticTable from "./components/AnalticTable";
import DimensionAndMatrics from "./components/DimensionAndMatrics";
import "./styles/main.css";

function Main() {
    const [showSetting, setshowSetting] = useState(true);
  const [addObj, setaddObj] = useState({ id: null });
  const [sortObj, setSortObj] = useState({
    startIdx: null,
    endIdx: null,
    col_name: null,
  });

  console.log(sortObj);

  function handleClick(e) {
    let element_id = e.target.getAttribute("id");
    setaddObj({
      id: element_id,
    });

    // apply style on clicking
    let condi = element_id.split("-")[1];
    if (condi === "true") {
      e.target.style.background = "white";
      e.target.style.borderLeft = "4px solid transparent";
      e.target.style.borderLeft = "1px solid lightgrey";
    } else {
      e.target.style.background = "transparent";
      e.target.style.borderLeft = "4px solid blue";
    }

    // set id false
    let attArr = element_id.split("-");
    if (condi === "true") {
      attArr[1] = false;
    } else {
      attArr[1] = true;
    }
    let newAtt = attArr.join("-");
    e.target.setAttribute("id", newAtt);

    // set new attribute of table heading
    let tableHeading = document.querySelector(`#${element_id}`);
    if (tableHeading.hasAttribute("table-heading")) {
      tableHeading.removeAttribute("id");
      tableHeading.setAttribute("id", newAtt);
    }
  }

  function handleApply() {
    let getColums = document.querySelectorAll(`#${addObj.id}`);
    let condi = addObj.id.split("-");

    if (condi[1] == "false") {
      getColums.forEach((col) => {
        col.style.visibility = "visible";
        col.removeAttribute("id");
        col.setAttribute("id", `${condi[0]}-true`);
      });
    } else {
      getColums.forEach((col) => {
        col.style.visibility = "hidden";
        col.removeAttribute("id");
        col.setAttribute("id", `${condi[0]}-false`);
      });
    }
  }

  return (
    <React.Fragment>
      <h3>Analytics</h3>
      <div className="main-container">
        <div className="date-container">
          <div className="date-group">
            <p className="start-date">Start Date</p>
            <input type="date" name="start" />
          </div>
          <div className="date-group">
            <p className="end-date">End Date</p>
            <input type="date" name="start" />
          </div>
        </div>
        <button
          type="button"
          className="setting-button"
          style={{ width: "auto", display: "flex", alignItems: "center" }}
        >
          <svg
            width={20}
            height={20}
            fill="blue"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M13.788 3.804c-.456-1.872-3.12-1.872-3.576 0a1.839 1.839 0 0 1-2.743 1.138c-1.647-1.004-3.53.88-2.527 2.527a1.84 1.84 0 0 1-1.137 2.744c-1.873.455-1.873 3.12 0 3.574a1.838 1.838 0 0 1 1.137 2.744c-1.004 1.647.88 3.53 2.527 2.527a1.839 1.839 0 0 1 2.744 1.137c.455 1.873 3.12 1.873 3.574 0a1.84 1.84 0 0 1 2.744-1.137c1.647 1.004 3.53-.88 2.527-2.527a1.839 1.839 0 0 1 1.137-2.744c1.873-.455 1.873-3.12 0-3.574a1.838 1.838 0 0 1-1.137-2.744c1.004-1.647-.88-3.53-2.527-2.527a1.838 1.838 0 0 1-2.744-1.137l.001-.001ZM12 15.6a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2Z"
              clipRule="evenodd"
            />
          </svg>
          <span onClick={(e) => setshowSetting(!showSetting)}>Setting</span>
        </button>
      </div>
      <div className="dimension-metrix" style={{display: showSetting ? 'block' : 'none'}}>
        <DimensionAndMatrics
          handleClick={handleClick}
          handleApply={handleApply}
          setSortObj={setSortObj}
        />
      </div>
      <div className="analtics-table">
        <AnalticTable addObj={addObj} sortObj={sortObj} />
      </div>
    </React.Fragment>
  );
}

export default Main;
