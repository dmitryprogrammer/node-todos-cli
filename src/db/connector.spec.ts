import {Connector, Tasks} from "./connector";

describe("Connector specs", () => {
  const connector = new Connector();

  it("should be cleared", async () => {
    await connector.clearTasks();
    const tasks: Tasks = await connector.getTasksList();
    expect(tasks).toEqual(null);
  });
});
