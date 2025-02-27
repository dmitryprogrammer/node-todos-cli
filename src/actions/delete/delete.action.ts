import {dbConnector} from "../../db";
import {Task} from "../../db/connector";
import {successLog} from "../../utils/log.util";

export function deleteTask(title: Task["title"]): Promise<void> {
  if (!title) {
    throw new Error("Need title for task");
    return;
  }

  return dbConnector.deleteTaskFromDb(title).then(() => {
    successLog(`Task ${title} was deleted successfully`);
  });
}
