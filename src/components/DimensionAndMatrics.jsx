import React, { useState ,useEffect } from 'react'
import Titles from '../titles.json'
import Button from './Button';

function DimensionAndMatrics({handleClick , handleApply,setSortObj}) {
  const [dragStratIndex, setdragStratIndex] = useState(null);
  
  // drag start
  function handleDragStart(e) {
    console.log("Dragging start...");
    let startIdx = +e.target.getAttribute("data-index");
    setdragStratIndex(startIdx);
  }

  // drag over
  function handleDragOver(e) {
    e.preventDefault();
  }

  // drop 
  function handleDrop(e) {
    let endIdx = +e.target.parentNode.getAttribute("data-index");
    swapItem(dragStratIndex , endIdx);

  }

  function swapItem(startIdx, endIdx) {
    const draggableButtons = document.querySelectorAll('.draggable-button');
    let itemOne = draggableButtons[startIdx].querySelector('.dimension-buttons');
    let itemTwo = draggableButtons[endIdx].querySelector('.dimension-buttons');

    // setSortObj
    setSortObj({
      startIdx,
      endIdx,
      from_col_name : itemOne.getAttribute('id'),
      to_col_name : itemTwo.getAttribute('id')
    });

    draggableButtons[startIdx].appendChild(itemTwo);
    draggableButtons[endIdx].appendChild(itemOne);
  }


  return (
    <div className="dimension-container">
      <h5 className="heading">Dimensions and Matrics</h5>
      <div className="buttons">
         {
          Titles.map(({title , id} , idx) => {
                return <div className="draggable-button" onDragStart={handleDragStart} data-index={idx} key={id} draggable>
                  <Button 
                  title={title}
                  handleClick={handleClick}
                  id={id} 
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  />
                </div>
            })
         }
      </div> 
      <div className="footer">
        <button className="btn-close">close</button> 
        <button className="btn-apply" onClick={handleApply}>Apply Changes</button> 
      </div>          
    </div>
  )
}

export default DimensionAndMatrics;