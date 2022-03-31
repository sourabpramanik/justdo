import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type TaskItemMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class TaskItem {
  readonly id: string;
  readonly subject: string;
  readonly userID?: string | null;
  readonly done?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<TaskItem, TaskItemMetaData>);
  static copyOf(source: TaskItem, mutator: (draft: MutableModel<TaskItem, TaskItemMetaData>) => MutableModel<TaskItem, TaskItemMetaData> | void): TaskItem;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly TaskItems?: (TaskItem | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}