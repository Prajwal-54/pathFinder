import React from "react";
import "../css/dnode.css";
import { GiBrickWall } from "react-icons/gi";

import { FcLowPriority, FcCollect } from "react-icons/fc";
export default function DNode({
  isFinish,
  isStart,
  isWall,
  isVisited,
  isShortest,
  isUnvisited,
}) {
  const className = isStart
    ? "dnode-start"
    : isFinish
    ? "dnode-finish"
    : isWall
    ? "dnode-wall"
    : isVisited
    ? "dnode-visited"
    : isShortest
    ? "dnode-shortest-path"
    : " ";

  return (
    <div className="Dnode">
      {isStart ? (
        <FcLowPriority className={`dnode ${className}`} />
      ) : isFinish ? (
        <FcCollect className={`dnode ${className}`} />
      ) : isWall ? (
        <GiBrickWall className={`dnode ${className}`} />
      ) : (
        <div className={`dnode ${className}`}></div>
      )}

      <div className="legendName">
        {isStart
          ? "start node"
          : isFinish
          ? "finish node"
          : isWall
          ? "wall node"
          : isVisited
          ? "visited node"
          : isShortest
          ? "path node"
          : "unvisited node"}
      </div>
    </div>
  );
}
