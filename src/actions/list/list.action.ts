import {dbConnector} from "../../db";
import {Tasks} from "../../db/connector";
import {errorLog, successLog} from "../../utils/log.util";

export function list(): void {
  dbConnector
    .getTasksList()
    .then((tasks: Tasks) => {
      for (const task of tasks) {
        successLog(`Task id: ${task.id}.\nTask title: ${task.title}\n`);
      }
    })
    .catch(() => {
      errorLog("List tasks error");
    });
}
