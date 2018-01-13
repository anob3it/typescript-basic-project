import { greet } from './module';

process.argv
    .slice(2) /* Skip node executable and script file */
    .map(greet)
    .forEach(greeting => console.log(greeting));
