const { transform } = require("./common/transform");
const { evalInContext } = require("./common/eval");
const stylis = require("stylis");

test("should transform variables", () => {
  const code = transform(
    `
const styled = require('./styled-components');
const B = styled.div\`
  color: foo;
  background: bar;
\`;
B;
`,
    {
      variables: {
        foo: "red",
        bar: "blue",
      },
    }
  );

  const restyled = stylis.compile(
    evalInContext(code, {
      styled: () => {},
    })
  );

  expect(restyled.find((x) => x.props === "color").children).toBe("red");
  expect(restyled.find((x) => x.props === "background").children).toBe("blue");
});

test("should transform functions", () => {
  const code = transform(
    `
const styled = require('./styled-components');
const B = styled.div\`
  color: my_rgb(255, 0, 0);
\`;
B;
`,
    {
      functions: {
        my_rgb: (input) => {
          return "rgb(255, 0, 0)";
        },
      },
    }
  );

  const restyled = stylis.compile(
    evalInContext(code, {
      styled: () => {},
    })
  );

  expect(restyled.find((x) => x.props === "color").children).toBe(
    "rgb(255, 0, 0)"
  );
});
