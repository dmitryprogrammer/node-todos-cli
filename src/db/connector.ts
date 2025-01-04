import {readFile, truncate, writeFile} from "fs/promises";
import {join} from "path";
import {errorLog} from "../utils/log.util";

export type Task = {
  id: number;
  title: string;
};

export type Tasks = Task[];

export type TaskTitle = Task["title"];

export class Connector {
  private readonly dbPath = join(__dirname, "./tasks.db.json");
  private readonly encoding = "utf-8";
  private tsksList: Tasks = [];

  async getTasksList(): Promise<Tasks> {
    try {
      const tasksJson = await readFile(this.dbPath, this.encoding);
      if (tasksJson) {
        const tasks = JSON.parse(tasksJson);
        this.updateTasksList(tasks);

        return tasks;
      }

      return null;
    } catch (error) {
      errorLog(error);
    }
  }

  async getTask(title: TaskTitle): Promise<Task> {
    try {
      const tasks = await this.getTasksList();
      const task = this.findTaskInTasksList(title, tasks);

      return task;
    } catch (error) {
      errorLog(error);
    }
  }

  async writeTaskToDb(taskTitle: TaskTitle): Promise<void> {
    try {
      let tasks: Tasks = await this.getTasksList();
      let taskId = 0;
      if (!tasks || !Array.isArray(tasks)) {
        tasks = [];
      }
      if (tasks) {
        const lastTaskId = tasks.at(-1)?.id ?? 0;
        taskId = lastTaskId + 1;
      }
      if (!this.findTaskInTasksList(taskTitle, tasks)) {
        tasks.push({title: taskTitle, id: taskId});
      }

      await writeFile(this.dbPath, JSON.stringify(tasks), this.encoding);
    } catch (error) {
      errorLog(error);
    }
  }

  async clearTasks(): Promise<void> {
    try {
      await truncate(this.dbPath);
    } catch (error) {
      errorLog(error);
    }
  }

  async updateTask(taskTitle: TaskTitle, newTitle: TaskTitle): Promise<void> {
    const tasks = await this.getTasksList();
    if (tasks) {
      const updatingTask = this.findTaskInTasksList(taskTitle, tasks);
      if (updatingTask) {
        updatingTask.title = newTitle;
        await writeFile(this.dbPath, JSON.stringify(tasks), this.encoding);
      }

      this.tsksList = tasks;
    }
  }

  updateTasksList(tasks: Tasks): void {
    if (tasks?.length) {
      this.tsksList = tasks;
    }
  }

  async deleteTaskFromDb(taskTitle: TaskTitle): Promise<void> {
    const tasks = await this.getTasksList();
    if (tasks) {
      const deletingTask = this.findIndexTaskInTasksList(taskTitle, tasks);
      if (deletingTask !== -1) {
        tasks.splice(deletingTask, 1);
        await writeFile(this.dbPath, JSON.stringify(tasks), this.encoding);
      }
    }
  }

  private findTaskInTasksList(
    taskTitle: TaskTitle,
    customTasksList?: Tasks,
  ): Task {
    const tasksList = customTasksList ?? this.tsksList;
    return tasksList.find((task: Task) =>
      this.findTaskCallback(task, taskTitle),
    );
  }

  private findIndexTaskInTasksList(
    taskTitle: TaskTitle,
    customTasksList?: Tasks,
  ): number {
    const tasksList = customTasksList ?? this.tsksList;
    return tasksList.findIndex((task: Task) =>
      this.findTaskCallback(task, taskTitle),
    );
  }

  private findTaskCallback({title}: Task, taskTitle: TaskTitle) {
    return title === taskTitle;
  }
}
