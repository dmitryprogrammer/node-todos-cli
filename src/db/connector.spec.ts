import {Connector, Tasks} from "./connector";

describe("Connector specs", () => {
  const connector = new Connector();
  const taskTitle = "Spec task title";
  const secondTaskTitle = "Second spec task title";

  it("should be cleared", async () => {
    await connector.clearTasks();
    const tasks: Tasks = await connector.getTasksList();
    expect(tasks).toEqual(null);
  });

  it("should write task to db", async () => {
    await connector.writeTaskToDb(taskTitle);
    await connector.writeTaskToDb(secondTaskTitle);
    const tasks: Tasks = await connector.getTasksList();
    expect(tasks).toEqual([
      {title: taskTitle, id: 1},
      {title: secondTaskTitle, id: 2},
    ]);
  });

  it("should get tasks list", async () => {
    const tasks: Tasks = await connector.getTasksList();
    expect(tasks).toEqual([
      {title: taskTitle, id: 1},
      {title: secondTaskTitle, id: 2},
    ]);
  });
});
