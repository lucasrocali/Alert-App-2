import reduxTypesCreator from "./ReduxTypesCreator";
const actionTypes = reduxTypesCreator('INCREMENT_COUNTER', 'DECREMENT_COUNTER'); // types

export const { INCREMENT_COUNTER, DECREMENT_COUNTER } = actionTypes;

export const increment = () => ({
  type: INCREMENT_COUNTER.SELF
});

export const decrement = () => ({
  type: DECREMENT_COUNTER.SELF
});