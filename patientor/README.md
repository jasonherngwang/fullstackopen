# Full Stack Open - Patientor Frontend with TypeScript

Learning to add features to a React TypeScript application.

## Approaching an Existing TypeScript Codebase
- Read the README.
- Examine file/folder structure to get a high-level overview of features.
- Check `types.ts` to see what data structures are being passed around.
- Read tests, if any.
- `Cmd`-click in VSC function names to see where else they are being used.
- Draw out the major data flows.

## TypeScript
- For regular JS objects, declaring a type for the values doesn't account for `undefined`. Use JS Maps instead.
- When specifying a type for the setter function returned by the `useState` hook, enclose it in `<>`. This is a use of **generics** in TypeScript.
  - `const [modalOpen, setModalOpen] = React.useState<boolean>(false);`
  - Axios: `const { data: patientListFromApi } = await axios.get<Patient[]>( ...  );`

## State Management
- `useReducer` takes a reducer function and initial state. It returns a reference to a global state data store, and a `dispatch` function used to send action objects to the reducer function.
- `StateContext.Provider` is used to wrap `<App />`, so it and its descendants can access the global state and `dispatch`, by calling `useContext()` (indirectly through `useStateValue()`). Now we can initiate state change from anywhere in the app.
- Write action creator functions that return action objects.

## React Router
- Retrieving URL params using `useParams`

## Misc JS
- Using [computed property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer) for patient `id`s
