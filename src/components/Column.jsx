import React from "react";
import "./Column.css";
import Task from "./Task";

function Column({ state }) {
	return (
		<div className="column">
			{state}
			<Task title="todo" />
		</div>
	);
}

export default Column;
