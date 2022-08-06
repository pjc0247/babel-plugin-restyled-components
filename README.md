# babel-plugin-restyled-components

## Installation

```
yarn add babel-plugin-restyled-components
```

## Usage

```js
// babel.config.js
{
  /* ... */
  plugins: [
    RestyledComponentsPlugin(require("./variables")),
    /*
    RestyledComponentsPlugin({
      variables: {
        dark: 'black',
      },
      function: {
        hello: () => 'red',
      }
    }),
    */
  ],
  /* ... */
}
```

**Variables**

```tsx
// variables.js
export const variables = {
  primary: "red",
  secondary: "blue",
};
```

```tsx
const Container = styled.View`
  color: primary;
  background: secondary;
`;

/* will be transpiled into:

color: red;
background: blue;
*/
```

**Functions**

```tsx
// variables.js
export const functions = {
  pow: (input) => {
    const n = input.split("px")[0];
    return `${Math.pow(n, 2)}px`;
  },
};
```

```tsx
const Container = styled.View`
  width: pow(2px);
`;

/* will be transpiled into:

width: 4px;
*/
```
