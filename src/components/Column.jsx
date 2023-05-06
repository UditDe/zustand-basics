import React, { useMemo, useState } from "react";
import "./Column.css";
import Task from "./Task";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";
import classNames from "classnames";

function Column({ state }) {
	const [text, setText] = useState("");
	const [open, setOpen] = useState(false);
	const [drop, setDrop] = useState(false);
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

	const addTask = useStore((store) => store.addTasks);
	const setDraggedTask = useStore((store) => store.setDraggedTask);
	const draggedTask = useStore((store) => store.draggedtask);
	const moveTask = useStore((store) => store.moveTask);

	return (
		<div
			className={classNames("column", { drop: drop })}
			onDragOver={(e) => {
				setDrop(true);
				e.preventDefault();
			}}
			onDragLeave={(e) => {
				setDrop(false);
				e.preventDefault();
			}}
			onDrop={() => {
				setDrop(false);
				moveTask(draggedTask, state);
				setDraggedTask(null);
			}}>
			<div className="titleWrapper">
				<p>{state}</p>
				<button
					onClick={() => {
						setOpen(true);
					}}>
					Add
				</button>
			</div>
			<div>
				{tasks.map((task) => (
					<Task title={task.title} key={task.title} />
				))}
				{open && (
					<div className="Modal">
						<div className="ModalContent">
							<input onChange={(e) => setText(e.target.value)} value={text} />
							<button
								type="submit"
								onClick={() => {
									addTask(text, state);
									setText("");
									setOpen(false);
								}}>
								Submit
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Column;
