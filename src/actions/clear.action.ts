import { dbConnector } from "../db";

export function clearTasks(): Promise<void> {
    return dbConnector.clearTasks();
  }