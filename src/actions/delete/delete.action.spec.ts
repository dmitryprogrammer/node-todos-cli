import {dbConnector} from "../../db";
import {add} from "../add/add.action";
import {deleteTask} from "./delete.action";

describe("delete action specs", () => {
  //  write specs here for delete action here
  it("should do something", async () => {
    const testTaskTitle = "First action";
    await add(testTaskTitle);
    await deleteTask(testTaskTitle);
    const deletedTask = await dbConnector.getTask(testTaskTitle);
    expect(deletedTask).toBeUndefined();
  });
});
