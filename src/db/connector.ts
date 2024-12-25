import {readFile, writeFile} from "fs/promises";
import {join} from "path";
import {json} from "stream/consumers";

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
      const tasks = JSON.parse(tasksJson);
      this.updateTasksList(tasks);

      return tasks;
    } catch (error) {
      console.error(error);
    }
  }

  async getTask(title: Task["title"]): Promise<Task> {
    try {
      const tasks = await this.getTasksList();
      const task = tasks.find((task) => task.title === title);

      return task;
    } catch (error) {
      console.error(error);
    }
  }

  async writeTaskToDb(task: Task): Promise<void> {
    try {
      let tasks: Tasks = await this.getTasksList();
      if (!tasks || !Array.isArray(tasks)) {
        tasks = [];
      }
      if (!tasks.find(({title}: Task) => title === task.title)) {
        tasks.push(task);
      }

      await writeFile(this.dbPath, JSON.stringify(tasks), this.encoding);
    } catch (error) {
      console.error(error);
    }
  }

  private updateTasksList(tasks: Tasks): void {
    if (tasks) {
      this.tsksList = tasks;
    }
  }
}
