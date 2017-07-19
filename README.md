# Craft & Local

React and Redux app interacting with Google Maps API, including the geometry library and reverse lat / lng geocode lookup.

# Features

- React (ES6)
- Webpack 2.0 [https://webpack.js.org/](https://webpack.js.org/)
- Flow type checking [https://flow.org](https://flow.org)
- Redux and Redux dev tools [http://redux.js.org/](http://redux.js.org/)
- React router v4 [https://reacttraining.com/react-router/](https://reacttraining.com/react-router/) with `_redirects` for deployment to Netlify
- React hot reloader [https://github.com/gaearon/react-hot-loader](https://github.com/gaearon/react-hot-loader)
- SASS using CSS modules and ITCSS
- ES Lint (with AirBnB configuration) [http://eslint.org/](http://eslint.org/)
- JSON server for mock API [https://github.com/typicode/json-server](https://github.com/typicode/json-server)
- Testing with Jest and Enzyme [https://facebook.github.io/jest/](https://facebook.github.io/jest/), [https://github.com/airbnb/enzyme](https://github.com/airbnb/enzyme)
- Husky git hooks [https://github.com/typicode/husky](https://github.com/typicode/husky)
- React Helmet [https://github.com/nfl/react-helmet](https://github.com/nfl/react-helmet)

# Running the project

To start the project first install all dependencies with `yarn install`. Then make sure you have the JSON server running for the mock API with `yarn start:json`. Run the project using Webpack dev-server by running `yarn start`. To build the project for production run `yarn prod:build`. Linting and test the project with ES lint, Flow, Jest and Enzyme by running `yarn test`.
