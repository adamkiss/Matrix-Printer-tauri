#!/usr/bin/env sh


echo "const e = \`$(cat ./patches/prism-code-editor-theme.css)\`;
export {
  e as default
};" > ./node_modules/prism-code-editor/dist/prism.js

rm -rf ./node_modules/.vite