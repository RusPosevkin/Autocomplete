## 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

`Component` re-render whenever their state or props change, regardless of the actual data change. `PureComponent`, on the other hand, does a shallow comparison of the props and state and re-renders only if there's a change.

Example where it might break my app: If the prop is an object or array and you mutate it directly instead of creating a new reference, `PureComponent` won't detect the change and won't trigger a re-render.

## 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

Using `ShouldComponentUpdate` with Context might lead to unexpected behavior. Context changes typically affect many components, and `ShouldComponentUpdate` may prevent those components from updating properly, causing inconsistencies in the UI.

## 3. Describe 3 ways to pass information from a component to its PARENT.

* Pass a callback function as a prop to the child component.
* Context API
* When both the parent and child components have a shared ancestor, we can create the state to that common ancestor. This shared ancestor takes charge of managing the state and forward it as props to the child components for updates.

## 4. Give 2 ways to prevent components from re-rendering.
* `useMemo` – for the memoization of the result of a function
* `useCallback` – for the memoization of functions

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

Fragments are syntax that allow us to add multiple elements to a React component without wrapping them in an extra DOM node

Example: If CSS selectors rely on specific parent-child relationships, using a fragment might break the styling.

## 6. Give 3 examples of the HOC pattern.

* Authentication HOC
* Logging HOC
* Performance Monitoring HOC

## 7. What's the difference in handling exceptions in promises, callbacks and async...await?

* Promises: `.catch()`
* Callbacks: `try...catch` blocks within the callback function
* `Async...await`: `try...catch` blocks around the await statement

## 8. How many arguments does setState take and why is it async.

* `setState` takes two arguments: an object or a function, and an optional callback.
* It's asynchronous to batch multiple `setState` calls for performance reasons. State  is not updated immediately. React schedules and updates and continues with its current execution.

## 9. List the steps needed to migrate a Class to Function Component.

1. Copy logic from methods to `useEffect` and other hooks as necessary.
2. Replace `this.state` with `useState` hook.
3. Convert lifecycle methods to appropriate hooks or remove them if not needed.
4. Replace class instance methods with regular functions.

## 10. List a few ways styles can be used with components.

* Inline styles using the `style` attribute
* External CSS files imported into components
* CSS Modules for scoped styling
* Styled-components

## 11. How to render an HTML string coming from the server.

Use `dangerouslySetInnerHTML` prop in React, but we need to use it cautiously as it can expose the app to XSS attacks. Solution – `DOMPurify` for sanitizing.
