import {dbConnector} from "../db";
import {TaskTitle} from "../db/connector";
import {successLog} from "../utils/log.util";

export function update(title: TaskTitle, newTitle: TaskTitle): void {
  if (!title) {
    throw new Error("Need title for task");
    return;
  }

  dbConnector.updateTask(title, newTitle).then(() => {
    successLog(`Task ${title} was updated successfully`);
  });
}
