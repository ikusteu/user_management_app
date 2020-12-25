## User Managment App

### About

This app was made as a coding test. The core concept is an app with login page which, after successful login redirects to page displaying users fetched from server and provides user data management such as adding / removal.

The server used for API calls is http://reqres.in, all the data is dummy data (users, auth token) and post / delete requests, send back successful response but dont actually save any data, and all modifications are actually saved locally and wont be there on refresh. Only the user token will remain in browsers localstorage if "keep me logged" in option is checked.

App preview is live on: https://test.ikust.eu

### Tech Stack

The state management was done by redux, and async operations (API calls) were managed by Redux Thunk, with API calls handled by axios.

Layout is made with Material-UI due to simple, opinionated design, for speed and efficiency, in order to be able to put more focus on aplication layer and logic.

Forms were made with Formik for speed, efficiency and scalability.

Animations were made in framer-motion, but production would need slight tweaks and optimizations.

Image handling was done with client-compress and cropperjs for resizing and cropping respectively.

Type checking was done by TypeScript. However, deliverables required type checking to be done with prop-types, hence a 'compile' script which runs compilation of .tsx files using "@babel/preset-typescript" and "babel-plugin-typescript-to-proptypes" to strip TypeScript types and generate propTypes based on prop interfaces. This, in turn resulted in some tradeoffs souch as limiting TypeScripts features ie. (inference and type imports) and sometimes violating DRY principle to ensure conversion friendly interfaces.

### Scripts

`npm start`

runs webpack dev server on localhost:3000, using /src/ts/ folder tree as source and directly transcompiling TypeScript

`npm run compile`

runs /src/ts/ folder through babel to compile TypeScript and generate PropTypes, resulting in identical folder tree with all .tsx files compiled to .js at /src/js_compiled

Running this script s prerequisite for the following scripts since /src/js_compiled folder is in .gitignore and needs to be created locally using this script

`npm run review`

runs webpack dev server at localhost:3000, using /src/js_compile folder tree as source, to ensure that transcompiled folder tree is identical in functionality to the initial source.

`npm run build`

makes "final" buid in /dist/ folder, containing index.html, main.css and index_bundle.js. This "production" build is by no means production ready, as the bundle size is too big, but code spliting and isomorphing scopes beyond this task.

### Folder Tree

/src/ts is used as core source and is hands on dev dolder

/src/js_compiled doesnt exist in repo but needs to be created using 'npm run compile'

/public/ contains public assets: index.html temp and avatar image placeholder

/webpack/ contains webpack config files for different scripts/modes

/compile_config contains babel.config.json to be while compiling instead of root /babel.config.json which is used for dev servers and build

--folder structure of /src/ts/folder is split in:

/ root folder containing index.tsx, entry point in charge of rendering app and App.tsx in charge of routing and providing store context

/app/ containing main redux store

/components/ containing al reusable components, not tightly connected to features,

/features/ containing /login and /users features such as slices an thunks based aroud respective features

/lib/ with functions.tsx file, containing all hoistable functions as exports, and typeDeclarations.tsx containing all custom type declarations used across the app, excluding prop interfaces which are declared locally

### Notes

The preview of the site is available ad https://test.ikust.eu

While using preview, log in with janet.weaver@reqres.in and any string as password

The preview should always be accessed through root https://test.ikust.eu because dynamic routing is not adjusted to apache server, from which the preview is being run

Image uploading feature acts funny with .png, I assume the reason is that image is being "uploaded" and saved as dataURL instead of being uploaded as Blob and recieving src URL. Therefore, using .jpg .jpeg files as uploads is strongly recomended, and probably the only way.

When reviewing code logic, /src/ts folder tree is recomended for best readebility, since comments act funny after being transpiled to .js
