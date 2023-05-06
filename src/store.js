import { create } from "zustand";

const store = (set) => ({
	tasks: [
		{
			title: "TestTask",
			state: "ONGOING",
		},
	],
	draggedtask: null,
	addTasks: (title, state) =>
		set((store) => ({ tasks: [...store.tasks, { title, state }] })),
	deleteTasks: (title) =>
		set((store) => ({
			tasks: store.tasks.filter((task) => task.title !== title),
		})),
	setDraggedTask: (title) => set({ draggedtask: title }),
	moveTask: (title, state) =>
		set((store) => ({
			tasks: store.tasks.map((task) =>
				task.title === title ? { title, state } : task
			),
		})),
});

export const useStore = create(store);
