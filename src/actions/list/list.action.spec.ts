import {dbConnector} from "../../db";
import {Tasks} from "../../db/connector";
import {add} from "../add/add.action";
import {clearTasks} from "../clear/clear.action";

describe("List specs", () => {
  it("list action", async () => {
    const testTaskTitle = "First action";
    const testSecondTaskTitle = "Second action";
    await clearTasks();
    await add(testTaskTitle);
    await add(testSecondTaskTitle);
    const tasks: Tasks = await dbConnector.getTasksList();
    expect(tasks).toEqual([
      {id: 0, title: testTaskTitle},
      {id: 1, title: testSecondTaskTitle},
    ]);
  });
});
