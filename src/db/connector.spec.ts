import {Connector, Tasks} from "./connector";

describe("Connector specs", () => {
  const connector = new Connector();

  it("should be cleared", async () => {
    await connector.clearTasks();
    const tasks: Tasks = await connector.getTasksList();
    expect(tasks).toEqual(null);
  });

  it("should write task to db", async () => {
    const taskTitle = "Spec task title";
    await connector.writeTaskToDb(taskTitle);
    const tasks: Tasks = await connector.getTasksList();
    expect(tasks).toEqual([{title: taskTitle, id: 1}]);
  });
});
