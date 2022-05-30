import React from "react";
import "../css/node.css";

export default function Node({
  col,
  row,
  isFinish,
  isStart,
  isWall,
  isRouter,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  drageStart,
  drageStart2,
  drageEnter,
  drageEnd,
  drageEnd2,
}) {
  const sOrf = isFinish || isStart;
  const startOrFinish = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : isRouter
    ? "node-router"
    : " ";
  const className = `node ${startOrFinish}`;
  const nodeId = `node-${row}-${col}`;

  return (
    <div
      id={nodeId}
      className={className}
      onMouseDown={() => onMouseDown(row, col, isRouter)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp(row, col, isRouter)}
      onDragStart={(e) => {
        if (sOrf) {
          drageStart(e, { row, col, isStart, isFinish });
        } else if (isRouter) {
          drageStart2(e, { row, col, isStart, isFinish, isRouter });
        } else {
          e.preventDefault();
        }
      }}
      onDragEnter={(e) => {
        drageEnter(e, { row, col, isStart, isFinish, isRouter });
      }}
      onDragEnd={(e) => {
        if (sOrf || isRouter) {
          drageEnd(e, { row, col, isRouter, sOrf });
        } else {
          e.preventDefault();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      draggable
    ></div>
  );
}

/* <div
      id={nodeId}
      className={className}
      onMouseDown={() => {
        if (isFinish === false && isStart === false) onMouseDown(row, col);
      }}
      onMouseEnter={() => {
        if (isFinish === false && isStart === false) onMouseEnter(row, col);
      }}
      onMouseUp={() => {
        if (isFinish === false && isStart === false) onMouseUp(row, col);
      }}
    ></div> */
