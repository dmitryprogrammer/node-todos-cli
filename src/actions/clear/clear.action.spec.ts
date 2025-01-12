import {dbConnector} from "../../db";
import {clearTasks} from "./clear.action";

describe("clear tasks action spec", () => {
  it("should clear tasks", async () => {
    await clearTasks();

    const tasksList = await dbConnector.getTasksList();

    expect(tasksList).toEqual(null);
  });
});
