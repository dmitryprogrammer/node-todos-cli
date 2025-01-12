import {dbConnector} from "../../db";
import {clearTasks} from "./clear.action";

describe("clear tasks action spec", () => {
  it("should clear tasks", async () => {
    clearTasks();
    setTimeout(() => {
      const tasksList = dbConnector.getTasksList();

      expect(tasksList).toEqual({});
    }, 100);
  });
});
