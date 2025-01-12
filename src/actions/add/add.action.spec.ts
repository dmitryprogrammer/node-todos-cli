import {dbConnector} from "../../db";
import {clearTasks} from "../clear/clear.action";
import {add} from "./add.action";

describe("add actions spec", () => {
  it("add action test", async () => {
    const taskTitle = "spec task 1";
    await clearTasks();
    await add(taskTitle);
    const tasksList = await dbConnector.getTasksList();
    expect(tasksList).toEqual([{id: 1, title: taskTitle}]);
  });
});
