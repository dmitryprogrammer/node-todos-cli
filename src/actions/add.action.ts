import exp = require("constants");
import {dbConnector} from "../db";
import {Task, Tasks} from "../db/connector";
import {successLog} from "../utils/log.util";

export function add(title: Task["title"]): void {
  if (!title) {
    throw new Error("Need title for task");
    return;
  }

  dbConnector.writeTaskToDb(title).then(() => {
    successLog(`Task ${title} was added successfully`);
  });
}

export deleteTask(title: Task["title"]): void {
  if (!title) {
    throw new Error("Need title for task");
    return;
  }

  dbConnector.deleteTaskFromDb(title).then(() => {
    successLog(`Task ${title} was deleted successfully`);
  });
}

export function getTasksList(): Promise<Tasks> {
  return dbConnector.getTasksList();
}

export function clearTasks(): Promise<void> {
  return dbConnector.clearTasks();
}
