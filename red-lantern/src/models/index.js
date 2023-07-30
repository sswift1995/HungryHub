// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Meal, Restaurant } = initSchema(schema);

export {
  Meal,
  Restaurant
};