import {dbConnector} from "../../db";
import {Task} from "../../db/connector";
import {successLog} from "../../utils/log.util";

export function add(title: Task["title"]): void {
  if (!title) {
    throw new Error("Need title for task");
    return;
  }

  dbConnector.writeTaskToDb(title).then(() => {
    successLog(`Task ${title} was added successfully`);
  });
}
