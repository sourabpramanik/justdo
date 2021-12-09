// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { TodoItem, User } = initSchema(schema);

export {
  TodoItem,
  User
};