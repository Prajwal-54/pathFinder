import React from "react";
import "../css/dnode.css";
import { GiBrickWall } from "react-icons/gi";
import { GrCircleQuestion } from "react-icons/gr";
import { FcLowPriority, FcCollect } from "react-icons/fc";
export default function DNode({
  isFinish,
  isStart,
  isWall,
  isVisited,
  isShortest,
  isUnvisited,
  isTutorial,
  onClick,
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
    : isTutorial
    ? "dnode-tutorial"
    : " ";

  return (
    <div className="Dnode">
      {isStart ? (
        <FcLowPriority className={`dnode ${className}`} />
      ) : isFinish ? (
        <FcCollect className={`dnode ${className}`} />
      ) : isWall ? (
        <GiBrickWall className={`dnode ${className}`} />
      ) : isTutorial ? (
        <p className="howTo" onClick={(e) => onClick()}>
          how to
        </p>
      ) : (
        <div className={`dnode ${className}`}></div>
      )}

      {isTutorial === false ? (
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
      ) : (
        <GrCircleQuestion
          className={`dnode ${className}`}
          onClick={(e) => onClick()}
        ></GrCircleQuestion>
      )}
    </div>
  );
}
