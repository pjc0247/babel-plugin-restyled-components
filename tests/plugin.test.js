const { transform } = require("./common/transform");

test("should work even if `variables` is not specified.", () => {
  transform(
    `
const B = styled.div\`
  font-size: 14px;
\`;
`,
    {
      variables: undefined,
    }
  );
});

test("should work even if `functions` is not specified.", () => {
  transform(
    `
const B = styled.div\`
  font-size: 14px;
\`;
`,
    {
      functions: undefined,
    }
  );
});
