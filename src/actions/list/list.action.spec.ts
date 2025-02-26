import {add} from "../add/add.action";
import {clearTasks} from "../clear/clear.action";

describe("List specs", () => {
  it("list action", async () => {
    const testTaskTitle = "First action";
    const testSecondTaskTitle = "Second action";
    await clearTasks();
    await add(testTaskTitle);
    await add(testSecondTaskTitle);
  });
});
