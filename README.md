# Web with React.

## Get started

Install [yarn](https://github.com/yarnpkg/yarn) if you don't have it already:
```
npm install -g yarn
```

Then copy environment variables and edit them if necessary:
```
cp .env.example .env
```

Then:
```
yarn install
yarn start
```

Direct your browser to `http://localhost:3000`.

For production builds:

```
yarn run prod:start
```

Note: pm2 must be installed to run production builds.

## Directory Structure
```
├── client                         # Client-side code
├── common                         # Shared code between client and server
│   ├── css                        # CSS/Sass Resources
│   ├── fonts
│   ├── images
│   ├── js
│   │   ├── atoms                 # ATOMIC design atoms
│   │   ├── pages                 # ATOMIC design pages/containers
│   │   ├── components            # ATOMIC design Molecules/Components
│   │   ├── sections              # ATOMIC design Sections
│   │   ├── lib                   # Misc. libraries like helpers, etc.
│   │   ├── middleware            # Middleware for redux
│   │   ├── ducks                 # Ducks based Reducers & Actions
│   │   ├── routes                # Routes each have an index.js which exports a react-router Route.
│   │   └── store                 # Store configuration for production and dev.
│   └── layouts                   # Layout files to be rendered by the server.
├── server                        # Server-side code
├── webpack                       # Webpack configuration files
```

## CSS Modules
This project uses [CSS Modules](https://github.com/css-modules/css-modules).
Class names should be in `camelCase`. Place the css file as a sibling to the
component with the same name, for example:
```
├── components
│   ├── Header.js
│   ├── Header.scss
```

## Redux Devtools
[Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension). Install the
Chrome or Firefox extension and it should just work.

## Server Side Rendering (SSR) and Asynchronous Data Fetching
When rendering components on the server, you'll find that you may need to fetch
some data before it can be rendered. The [server code](server/server.js) looks
for a `fetchData` method on the container component and its child components,
then executes all of them and only renders after the promises have all been
resolved.

## Async / Await
This project uses `async/await`, available by default in Node.js v8.x.x or
higher. If you experience errors, please upgrade your version of Node.js.

## Running ESLint

```
npm run lint
```

Check the `.eslintignore` file for directories excluded from linting.

## Changing the Asset Host

In production scenarios, you may want your assets to be hosted elsewhere besides
on your server. Just set an environment variable to point the asset host to
where ever you want, as defaults to `localhost:3001`. Just set it to the CDN of
your choice.
