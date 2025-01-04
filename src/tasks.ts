/* import {ACTION_NAMES, actions} from "./actions";
import {Connector} from "./db/connector";

class Tasks<Connector, ActionNames> {
  private connection;
  constructor(connection: Connector, actions: ) {
    this.connection = connection;
  }

  runAction<Params>(actionName: ActionNames, args?: Params) {
    const actionMethod = (actions && actions[actionName]) ?? null;
    if (actionMethod) {
      actionMethod(args);
    }
  }
}

export const tasks = new Tasks<Connector, ACTION_NAMES>(new Connector(), actions);
 */
