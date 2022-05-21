// Found here: https://github.com/thoughtbot/tailwindcss-aria-attributes
// but it was unpublished on npm

/**
 * Copyright (c) 2021 Sean Doyle and thoughtbot, inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 */

const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addVariant, e }) => {
  [
    'atomic',
    'busy',
    'checked',
    'current',
    'disabled',
    'expanded',
    'grabbed',
    'haspopup',
    'hidden',
    'invalid',
    'live',
    'modal',
    'multiline',
    'multiselectable',
    'pressed',
    'readonly',
    'required',
    'selected',
  ].forEach((boolean) => {
    const selector = `aria-${boolean}`;
    addVariant(selector, ({ modifySelectors, separator }) =>
      modifySelectors(
        ({ className }) =>
          `[${selector}="true"].${e(`${selector}${separator}${className}`)}`
      )
    );

    const groupSelector = `group-aria-${boolean}`;
    addVariant(groupSelector, ({ modifySelectors, separator }) =>
      modifySelectors(
        ({ className }) =>
          `.group[aria-${boolean}="true"] .${e(
            `${groupSelector}${separator}${className}`
          )}`
      )
    );

    const peerSelector = `peer-aria-${boolean}`;
    addVariant(peerSelector, ({ modifySelectors, separator }) =>
      modifySelectors(
        ({ className }) =>
          `.peer[aria-${boolean}="true"] ~ .${e(
            `${peerSelector}${separator}${className}`
          )}`
      )
    );
  });

  const enumerables = {
    autocomplete: ['both', 'inline', 'list', 'none'],
    current: ['date', 'location', 'page', 'step', 'time'],
    dropeffect: ['copy', 'execute', 'link', 'move', 'none', 'popup'],
    haspopup: ['dialog', 'grid', 'listbox', 'menu', 'tree'],
    orientation: ['horizontal', 'undefined', 'vertial'],
    relevant: ['additions', 'all', 'removals', 'text'],
    sort: ['ascending', 'descending', 'none', 'other'],
  };

  for (const [attribute, values] of Object.entries(enumerables)) {
    for (const value of values) {
      const selector = `aria-${attribute}-${value}`;
      addVariant(selector, ({ modifySelectors, separator }) =>
        modifySelectors(
          ({ className }) =>
            `[aria-${attribute}="${value}"].${e(
              `${selector}${separator}${className}`
            )}`
        )
      );

      const groupSelector = `group-aria-${attribute}-${value}`;
      addVariant(groupSelector, ({ modifySelectors, separator }) =>
        modifySelectors(
          ({ className }) =>
            `.group[aria-${attribute}="${value}"] .${e(
              `${groupSelector}${separator}${className}`
            )}`
        )
      );

      const peerSelector = `peer-aria-${attribute}-${value}`;
      addVariant(peerSelector, ({ modifySelectors, separator }) =>
        modifySelectors(
          ({ className }) =>
            `.peer[aria-${attribute}="${value}"] ~ .${e(
              `${peerSelector}${separator}${className}`
            )}`
        )
      );
    }
  }
});
