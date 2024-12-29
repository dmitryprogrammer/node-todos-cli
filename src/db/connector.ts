import {readFile, truncate, writeFile} from "fs/promises";
import {join} from "path";
import { errorLog } from "../utils/log.util";

export type Task = {
  id: number;
  title: string;
};

export type Tasks = Task[];

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

  async getTask(title: Task["title"]): Promise<Task> {
    try {
      const tasks = await this.getTasksList();
      const task = tasks.find((task) => task.title === title);

      return task;
    } catch (error) {
      errorLog(error);
    }
  }

  async writeTaskToDb(taskTitle: Task["title"]): Promise<void> {
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
      if (!tasks.find(({title}: Task) => title === taskTitle)) {
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

  private updateTasksList(tasks: Tasks): void {
    if (tasks) {
      this.tsksList = tasks;
    }
  }
}
