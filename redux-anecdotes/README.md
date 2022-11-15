# Full Stack Open - Anecdotes App using Redux

Learning how to implement Redux Toolkit in a basic anecdotes app.

## Flux Architecture
- Moving state out of individual components and into a central location
- Using action creators to create action objects which specify the type of state change, and any associated data
- Writing reducers that accept an action and the current state, and return the new state
- Wrapping the `App` component in a `Provider` so that it and its descendants have access to the "global" data `store`
- Using RTK's `configureStore()` to combine reducers and subscribe to any state changes

## Hooks
- `useDispatch` yields a function used to `dispatch` actions to the reducers
- `useSelector` gives access to the data store

## Reducers
- Pattern of a reducer function taking the current state and an action object, and returning the new state
- Using RTK's `createSlice()` to initialize state and create reducer functions with minimal boilerplate (compared to pre-RTK Redux)
  - No longer needing `switch` statements to check action `type`.
  - No longer needing to manually create action creator functions that return action objects with `type` and `payload`; these are automatically made available in a slice's `actions` property

## Thunks
- Thunk action creators which return functions, not objects