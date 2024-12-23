import {readFile, writeFile} from "fs/promises";
import {join} from "path";

export type Task = {
  id: number;
  title: string;
};

export class Connector {
  private readonly dbPath = join(__dirname, "./tasks.db.json");

  async getTasksList(): Promise<Task | string> {
    try {
      const tasks = await readFile(this.dbPath, "utf-8");

      return JSON.parse(tasks);
    } catch (error) {
      console.error(error);
    }
  }

  async writeTaskToDb(task: Task) {
    try {
      const result = await writeFile(
        this.dbPath,
        JSON.stringify(task),
        "utf-8",
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}
