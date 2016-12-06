[ ![Codeship Status for buzzn/module-consumer-form](https://app.codeship.com/projects/867cccd0-99df-0134-8de6-3e4c54ed65a2/status?branch=master)](https://app.codeship.com/projects/187835)
# module-powertaker-form

To run local dev server:
- clone this repository
- install node.js 6.xx
- run `sudo npm i -g yarn webpack`
- run `yarn`
- run `yarn run dev-server`
- open in browser `http://localhost:2999`

To run tests:
- run `sudo npm i -g mocha`
- run `yarn run test`

How to build automatically on codeship:
- setup commands:
```
nvm install 6.7.0
npm cache clean
npm i -g yarn cross-env rimraf
yarn
npm rebuild node-sass
```
- test pipeline commands:
```
yarn run test
yarn run build
```

To use linter:
- install eslint globally `sudo npm i -g eslint`
- add eslint plugin to your favorite editor

How to use this module in app:
-
