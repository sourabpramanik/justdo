import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type TaskItemMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class TaskItem {
  readonly id: string;
  readonly content: string;
  readonly userID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TaskItem, TaskItemMetaData>);
  static copyOf(source: TaskItem, mutator: (draft: MutableModel<TaskItem, TaskItemMetaData>) => MutableModel<TaskItem, TaskItemMetaData> | void): TaskItem;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly TaskItems?: (TaskItem | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}