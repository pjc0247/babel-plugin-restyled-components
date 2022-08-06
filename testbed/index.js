const babel = require("@babel/core");
const staticGlob = require("../index").default;

const before = `
import styled from 'styled-components';


const B = styled.view\`
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
  plugins: [staticGlob()],
}).code;

console.log(after);
