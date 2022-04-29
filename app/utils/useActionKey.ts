import { useEffect, useState } from 'react';

const ACTION_KEY_DEFAULT: ActionKey = ['Ctrl ', 'Control'];
const ACTION_KEY_APPLE: ActionKey = ['⌘', 'Command'];

type ActionKey = [string, string] | [undefined, undefined];

export function useActionKey() {
  let [actionKey, setActionKey] = useState<ActionKey>([undefined, undefined]);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
        setActionKey(ACTION_KEY_APPLE);
      } else {
        setActionKey(ACTION_KEY_DEFAULT);
      }
    }
  }, []);

  return actionKey;
}
