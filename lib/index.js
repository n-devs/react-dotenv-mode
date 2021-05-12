'use strict';

const REACT_APP_ENV = process.env.REACT_APP_ENV || "development";

// const window = require(`${process.cwd()}/env.${REACT_APP_ENV}.js`)

const window = require('./cli')

// if (!window) {
//   require("./cli")
// }

function isBrowser() {
  return !!(typeof window !== "undefined" && window._env)
}

function getFiltered() {
  return Object.keys(process.env)
    .filter(key => /^/i.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      { REACT_APP_ENV }
    );
}

function env(key = "") {
  const safeKey = `${key}`;
  if (isBrowser() && key === "REACT_APP_ENV") {
    return window._env.REACT_APP_ENV;
  }
  if (isBrowser()) {
    return key.length ? window._env[safeKey] : window._env;
  }
  if (key === 'REACT_APP_ENV') {
    return process.env.REACT_APP_ENV;
  }
  return key.length ? process.env[safeKey] : getFiltered();
}

module.exports = env;