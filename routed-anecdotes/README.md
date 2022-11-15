# Full Stack Open - Anecdotes App using React Router

Learning how to use React Router to perform client-side routing.

## Client-side Routing for Single-Page Apps
The browser uses JS to intercept and process navigation actions. It asynchronously `fetch`es HTML or JSON from the server and uses that to render the UI. It only replaces elements that change.

## React Router
When the address bar URL changes, React Router prevents the default navigation behavior and instead uses it for "JS-enabled routing". In this context, "routing" means conditional rendering of components, not the traditional definition of requesting a new page from the server. `BrowserRouter` uses the built-in HTML5 history API to sync the UI with the URL, so bookmarks and Back/Forward navigtion work like normal.
- Wrap `App` in a `BrowserRouter`
- Place `Route`s inside `Routes`, each referencing a path and React component to render
- Replace anchor tags with `Link`s

## React Router Hooks
- `useNavigate` is used to navigate to another path.
- `useMatch` is used to extract paramters from a parameterized URL.

## Custom Hook
- `useField` facilitates creation of controlled `input` fields for a form.
- Use spread syntax (`...`) for a more concise way to gather and pass props.

## Misc
- Use `useRef` to maintain a reference to a `setTimeout` id, which persists across renders.