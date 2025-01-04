import {add, clearTasks, getTasksList} from "./add.action";

export type ACTION_NAMES = "add" | "get" | "delete" | "list";

export const actions = {
  add,
  delete,
  getTasksList,
  clearTasks,
};
