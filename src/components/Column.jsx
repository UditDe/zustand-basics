import React, { useMemo } from "react";
import "./Column.css";
import Task from "./Task";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";

function Column({ state }) {
	const tasks = useStore(
		(store) => store.tasks.filter((task) => task.state === state),
		shallow
	); //import useStore hook from your own store

	/* using the filter function is not actually
	correct as whenever it filters the array it 
	changes the values within useStore so that it 
	generates re-render againg and again. One way to 
	solve this is ===>>>>
	*/

	// Solution 1 >>>>>>>
	// const filtered = useMemo(
	// 	() => tasks.filter((task) => task.state === state),
	// 	[task, state]
	// );

	// Solution 2 >>>>>>>
	// use shallow function. It is basically a comparision function

	// Solution 3 >>>>>>>
	// use the following fuction in the place of shallow function
	/**
	 * (prev, next) => {
	 * 	const longest = (prev.length > next.length) ? prev.length : next.lenght;
	 * 	for (let i = 0; i < longest; i++) {
	 * 		if(!prev[i] || !next[i])
	 * 			return false;
	 *   	if(prev[i] !== next[i])
	 * 			return false;
	 * 	}
	 * 	return true;
	 * }
	 */
	return (
		<div className="column">
			<p>{state}</p>
			{tasks.map((task, index) => (
				<Task title={task.title} key={index} />
			))}
		</div>
	);
}

export default Column;
