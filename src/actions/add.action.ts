import {dbConnector} from "../db";
import {Task} from "../db/connector";

export function add(title: Task["title"]): void {
  if (!title) {
    throw new Error("Need title for task");
    return;
  }

  dbConnector.writeTaskToDb({title, id: 1});
}
