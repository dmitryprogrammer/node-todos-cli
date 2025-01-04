import {add} from "./add.action";
import {clearTasks} from "./clear.action";
import {deleteTask} from "./delete.action";
import { list } from "./list.action";
import {update} from "./update.action";

export type ACTION_NAMES = "add" | "get" | "delete" | "list";

export const actions = {
  add,
  delete: deleteTask,
  list,
  update,
  clearTasks,
};
