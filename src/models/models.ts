export interface Task {
	userName: string; // user that created the task
	name: string; // task name
	priority: string;
	dueDate: {
		month: number,
		week: number,
		day: number
	};
};