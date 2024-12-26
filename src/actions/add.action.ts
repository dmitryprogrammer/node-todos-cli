import {dbConnector} from "../db";
import {Task, Tasks} from "../db/connector";

export function add(title: Task["title"]): void {
  if (!title) {
    throw new Error("Need title for task");
    return;
  }
  console.log("1");

  dbConnector.writeTaskToDb({title, id: 1});
}

export function getTasksList(): Promise<Tasks> {
  return dbConnector.getTasksList();
}
