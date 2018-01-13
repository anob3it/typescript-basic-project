# TypeScript - setting up a project

This is a guide to setting up a TypeScript development environment and project from scratch.

It is not geared towards any framework or for running code in in a browser. It is also not an introduction to the language itself.

Excellent language documentation is provided at https://www.typescriptlang.org/docs/handbook/basic-types.html

Somewhat similar guides are available here
https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
and here https://www.typescriptlang.org/docs/handbook/gulp.html

A browser based interactive TypeScript playground is available at https://www.typescriptlang.org/play/index.html

Remember, there is no "correct" way to set up your project using the tools introduced here. These are just examples to get started.

## Install Node.js®

https://nodejs.org/en/download/

## Create project directory structure

    <root>/
        ├─ src/
        └─ dist/

## Create package.json

[package.json](package.json) is the npm package configuration, containing among other things dependencies and package information.

    $ npm init

Enter `dist/main.js` for entry point

## Install TypeScript

Install typescript globally to be able to invoke the compiler directly from the command line:

    $ npm install -g typescript

Add typescript dependency to project

    $ npm install typescript --save-dev

`--save-dev` tells npm to add packages to `devDependencies` in [package.json](package.json).


## Create tsconfig.json

This creates a complete typescript compiler configuration in [tsconfig.json](tsconfig.json).

    $ tsc --init

You may delete unused options.

A basic configuration will look like:

```javascript
{
  "compilerOptions": {
    "target": "es5",         /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'. */
    "module": "commonjs",    /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    "strict": true           /* Enable all strict type-checking options. */
  }
}
```

## Create a Hello World program

Create [src/main.ts](src/main.ts) with the following content

```typescript
console.log('Hello, world');
```

Compile the file

    $ tsc --outDir dist src/main.ts

Run the project

    $ node dist/main.js

## Setup project building

Edit [tsconfig.json](tsconfig.json)

```javascript
  "compilerOptions": {
    /* ... existing content ... */
    "outDir": "dist"
  },
  "include": [
    "src/**/*.ts"
  ]
```

To build the project you can now simply type

    $ tsc

To compile incrementally as files are changed type

    $ tsc -w

Add to [package.json](package.json)

```javascript
  "scripts": {
    "compile": "tsc  --listEmittedFiles --pretty",
    "compile:incremental": "tsc -w --listEmittedFiles --pretty",
    /* ... existing content ... */
```

To build you can now type

    $ npm run compile

To build incrementally

    $ npm run compile:incremental

## Build with gulp

Gulp is not necessary to compile typescript, but using gulp is handy if there are other build steps or resources that should be processed as part of the build.

Install gulp

    $ npm install -g gulp-cli
    $ npm install --save-dev typescript gulp gulp-typescript

Create [gulpfile.js](gulpfile.js)

```javascript
var gulp = require('gulp');
var ts = require('gulp-typescript');

// Load the typescript configuration
var tsProject = ts.createProject('tsconfig.json');

// Define a task that compiles the sources and outputs into dist
gulp.task('build', function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist'));
});

// Define a task that watches for changes in
// source files and invokes the build task
gulp.task('watch', ['build'], () => {
    gulp.watch('src/**/*.ts', ['build']);
});

// The default is to run the watch task if no task
// is given on the command line
gulp.task('default', ['watch']);
```

To perform a one-time build

    $ gulp build

To perform incremental builds

    $ gulp

## Create a new module and use it

From now on keep an incremental build running in the background.

Create [src/module.ts](src/module.ts)

```typescript
export function greet(who: string) {
    return `Hello, ${who}!`;
}
```

Change [src/main.ts](src/main.ts) to

```typescript
import { greet } from './module';

process.argv
    .slice(2) /* Skip node executable and script file */
    .map(greet)
    .forEach(greeting => console.log(greeting));
```

Now, you should receive a compilation error relating to `process`.
So where does `process` come from, it is not part of standard TypeScript or JavaScript?

`process` is part of Node.js, so to use it we must add the necessary dependency:

    $ npm install typescript @types/node --save-dev

Now it should compile and you can run it

    $ node dist/main.js Joe Mary Desiré

