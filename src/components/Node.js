import React from "react";
import "../css/node.css";
// import { GiBrickWall } from "react-icons/gi";

import { FcLowPriority, FcCollect } from "react-icons/fc";

export default function Node({
  col,
  row,
  isFinish,
  isStart,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  drageStart,
  drageEnter,
  drageEnd,
}) {
  const sOrf = isFinish || isStart;
  const startOrFinish = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : " ";
  const className = `node ${startOrFinish}`;
  const nodeId = `node-${row}-${col}`;

  return isWall ? (
    <div
      id={nodeId}
      className={className}
      onMouseDown={(e) => onMouseDown(row, col, e)}
      onMouseEnter={(e) => onMouseEnter(row, col, e)}
      onMouseUp={(e) => onMouseUp(row, col, e)}
      onDragStart={(e) => {
        if (sOrf) {
          drageStart(e, { row, col, isStart, isFinish });
        } else {
          e.preventDefault();
        }
      }}
      onDragEnter={(e) => {
        drageEnter(e, { row, col, isStart, isFinish });
      }}
      onDragEnd={(e) => {
        if (sOrf) {
          drageEnd(e, { row, col, sOrf });
        } else {
          e.preventDefault();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      draggable
    />
  ) : (
    <div
      id={nodeId}
      className={className}
      onMouseDown={(e) => onMouseDown(row, col, e)}
      onMouseEnter={(e) => onMouseEnter(row, col, e)}
      onMouseUp={(e) => onMouseUp(row, col, e)}
      onDragStart={(e) => {
        if (sOrf) {
          drageStart(e, { row, col, isStart, isFinish });
        } else {
          e.preventDefault();
        }
      }}
      onDragEnter={(e) => {
        drageEnter(e, { row, col, isStart, isFinish });
      }}
      onDragEnd={(e) => {
        if (sOrf) {
          drageEnd(e, { row, col, sOrf });
        } else {
          e.preventDefault();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      draggable
    >
      {isStart ? (
        <FcLowPriority className="startIcon" />
      ) : isFinish ? (
        <FcCollect className="finishIcon" />
      ) : (
        ""
      )}
    </div>
  );
}
