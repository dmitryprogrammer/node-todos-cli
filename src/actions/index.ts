import {add} from "./add/add.action";
import {clearTasks} from "./clear/clear.action";
import {deleteTask} from "./delete/delete.action";
import {list} from "./list/list.action";
import {update} from "./update/update.action";

export type ACTION_NAMES = "add" | "get" | "delete" | "list";

export const actions = {
  add,
  delete: deleteTask,
  list,
  update,
  clearTasks,
};
