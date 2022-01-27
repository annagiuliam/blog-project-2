import '@testing-library/jest-dom'
import { prettyDOM } from '@testing-library/dom'

function getDomNode (containerOrWrapper) {
  if (containerOrWrapper instanceof Node) {
    return containerOrWrapper
  }

  if (containerOrWrapper.constructor?.name === 'VueWrapper' || containerOrWrapper.constructor?.name === 'Wrapper') {
    return containerOrWrapper.element
  }

  return null
}

/* eslint-disable no-console */
function silenceConsole (name, pattern) {
  if (jest.isMockFunction(console[name])) {
    throw new Error(`console.${name} already mocked`)
  }
  const orig = console[name]
  console[name] = jest.fn((msg) => {
    if (pattern && !msg.match(pattern)) {
      orig(msg)
    }
  })
  return () => {
    console[name] = orig
  }
}

global.utils = {
  debugDom (containerOrWrapper, ...args) {
    if (Array.isArray(containerOrWrapper)) {
      // eslint-disable-next-line no-console
      containerOrWrapper.forEach((cow) => console.log(prettyDOM(getDomNode(cow), ...args)))
    } else {
      // eslint-disable-next-line no-console
      console.log(prettyDOM(getDomNode(containerOrWrapper), ...args))
    }
  },
  mocks: {
    translate: jest.fn((s) => `**${s}**`),
    gettext: jest.fn((s) => `**${s}**`)
  },
  silenceConsoleWarn (pattern) {
    return silenceConsole('warn', pattern)
  },
  silenceConsoleError (pattern) {
    return silenceConsole('error', pattern)
  },
  silenceConsoleInfo (pattern) {
    return silenceConsole('info', pattern)
  }

}
