# babel-plugin-restyled-components

## Installation

```
yarn add babel-plugin-restyled-components
```

## Usage

**Variables**

```tsx
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
```

**Functions**

```tsx
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
```
