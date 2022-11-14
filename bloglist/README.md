# Full Stack Open - Blog List Frontend

Learning features of React and testing.

## Structuring a Frontend Project
- Configuring `.eslintrc` and `.prettierrc` for linting and formatting.
- Storing application code in `/src`
  - React components in `/components`
  - CRUD API calls with axios, in `/services`
  - Authentication API calls with axios, in `/services`
  - Jest tests in `/tests`
  - Cypress tests in `/cypress`
  
## React
- Creating controlled components to synchronize component state with `input` elements
- "Pushing down" or "lifting up" state so that only components that require it have access to it, which reduces the number of props that need to be passed down
- Using `PropTypes` to specify which props are required
- Passing components as `children` to the "wrapper" component `Togglable`, to reuse its show/hide functionality
- Providing a unique value for `key` when creating lists of elements
- Making sure to create new objects when setting state
- Using the component show/hide pattern with `&&`, i.e. `{visible && props.children}`

## React Hooks
- `useState`
  - To store an array of blog objects
  - Whether there is a notification message to display
  - Whether user is logged in or not
  - Control visibility of the `Togglable` component
- `useEffect`
  - Asynchronously fetch blogs data using the API
  - Check localStorage if a user is logged in
- `useRef` with `forwardRef` and `useImperativeHandle`
  - Create reference to `Togglable` component so we can access its `toggleVisibility` function from a parent component

## Authentication
- Storing user data in localStorage
- Creating a request `Authorization` header containing the token
- Using a closure to make `token` available to API call functions in `blogService`

## Testing
- Using `@testing-library/react` and `@testing-library/user-event` with `vitest`
  - General pattern of grouping `test` or `it` tests inside `describe` blocks.
  - `render`ing React components and making assertions regarding whether they have certain text content
  - Mocking user events such as clicking and typing
  - Creating mock functions with `vi.fn()` and making assertions regarding how many times they were called
- End-to-end testing with Cypress
  - Running Chrome in headless mode and simulating user interactions
  - Learning how Cypress functions similarly to jQuery, where functions return objects upon which additional functions can be chained
  - Making API calls within Cypress