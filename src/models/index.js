// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { TaskItem, User } = initSchema(schema);

export {
  TaskItem,
  User
};