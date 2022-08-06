const { get, isNil, set } = require("lodash");
const { dirname, join } = require("path");
const stylis = require("stylis");
const memoize = require("memoizee");
const babel = require("@babel/core");

const appDir = dirname(require.main.filename);
const { variables = {}, functions = {} } = require(join(
  appDir,
  "variables.js"
));

const t = babel.types;

const RestyledComponentsPlugin = () => {
  return {
    visitor: {
      TaggedTemplateExpression(path, { file }) {
        const objectName = get(path.node, "tag.object.name");
        const quasi = get(path.node, "quasi.quasis")
          .map((x, index) => {
            if (index === 0) {
              return x.value.cooked;
            }
            return `${x.value.cooked}`;
          })
          .join("__placeholder");

        if (objectName === "styled") {
          const restyledCSS = restyleCSS(quasi);
          const quasis = restyledCSS.split("__placeholder").map((x) =>
            t.templateElement({
              raw: x,
              cooked: x,
            })
          );

          path.node.quasi = t.templateLiteral(
            quasis,
            path.node.quasi.expressions
          );
        }
      },
    },
  };
};

const memoizedRestyleToken = memoize(
  (x) => {
    if (!isNil(variables[x])) {
      return variables[x];
    }

    const [_, ident] = /^([a-zA-Z0-9_]*)\(/.exec(x) ?? [];
    if (!isNil(ident) && !isNil(functions[ident])) {
      return functions[ident](x);
    }

    return x;
  },
  { primitive: true }
);

const restyleValue = (value) => {
  if (typeof value === "string") {
    return value.split(" ").map(memoizedRestyleToken).join(" ");
  }

  return value;
};

const restyleCSS = (css) => {
  const styles = stylis.compile(css);

  return stylis.serialize(
    styles,
    stylis.middleware([
      (element, index, children) => {
        if (element.type === "decl") {
          element.return = `${element.props}: ${restyleValue(
            element.children
          )};`;
        }
      },
      stylis.stringify,
    ])
  );
};

exports.default = RestyledComponentsPlugin;
