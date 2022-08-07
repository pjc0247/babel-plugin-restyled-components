const babel = require("@babel/core");
const RestyledComponentsPlugin = require("../index").default;

const before = `
import styled from 'styled-components';


const B = css\`
  font-size: 12px;

  .v { 
    font-size: 12px;

    color: \${({ aa }) => \`red\`};

    \${({ bb }) => \`
      font-size: \${bb};
    \`}

    &.vv {
      font-size: 12px;

      width: vw(12px) vw(12px) vw(12px);
      height: 12px;
    }
  }
\`;
`;

const after = babel.transformSync(before, {
  filename: "index.js",
  presets: [],
  plugins: [RestyledComponentsPlugin(require("./variables"))],
}).code;

console.log(after);
