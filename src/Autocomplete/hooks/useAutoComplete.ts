import { useRef, useState, KeyboardEvent, MouseEvent } from 'react'

import type { OptionsListType } from '..'
import type { useAutoCompleteType } from './types'

const KEY_EVENTS = {
  'UP': 'ArrowUp',
  'PAGE_UP': 'PageUp',
  'DOWN': 'ArrowDown',
  'PAGE_DOWN': 'PageDown',
  'ESCAPE': 'Escape',
  'ENTER': 'Enter',
}

/**
* Hook for preparing data for Autocomplete component,
* handles keyboard actions
* @param delay - delay in miliceconds for debouncing of user input
* @param getFilteredOptions - function that filtered options based on search input value
* @param onChange - handler of selected option changing
*/

export default function useAutoComplete({ delay = 500, getFilteredOptions, onChange }: useAutoCompleteType) {
  const listRef = useRef<HTMLUListElement>(null);
  const [delayTimeout, setDelayTimeout] = useState(setTimeout(() => { }, 0));
  const [suggestions, setSuggestions] = useState<OptionsListType>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [textValue, setTextValue] = useState('');

  // improve performance – add debouncing
  function delayInvoke(cb: () => void) {
    if (delayTimeout) {
      clearTimeout(delayTimeout);
    }
    setDelayTimeout(setTimeout(cb, delay));
  }

  function selectOption(index: number) {
    if (index > -1) {
      onChange(suggestions[index]);
      setTextValue(suggestions[index].label);
    }

    clearSuggestions();
  }

  // async filtering of option
  async function getSuggestions(searchTerm: string) {
    if (searchTerm && getFilteredOptions) {
      const options = await getFilteredOptions(searchTerm);
      if (options) {
        setSuggestions(options);
      }
    }
  }

  function clearSuggestions() {
    setSuggestions([]);
    setSelectedIndex(-1);
  }

  function onTextChange(searchTerm: string) {
    setIsLoading(true);
    setTextValue(searchTerm);
    clearSuggestions();

    delayInvoke(() => {
      getSuggestions(searchTerm);
      setIsLoading(false);
    });
  }

  function scrollUp() {
    if (!listRef.current) return;

    const optionHeight = listRef?.current?.children[0]?.clientHeight;

    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }

    listRef.current.scrollTop -= optionHeight;
  }

  function pageUp() {
    if (!listRef.current) return;

    setSelectedIndex(0);
    listRef.current.scrollTop = 0;
  }

  function scrollDown() {
    if (!listRef.current) return;

    const optionHeight = listRef?.current?.children[0]?.clientHeight

    if (selectedIndex < suggestions.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
    listRef.current.scrollTop = selectedIndex * optionHeight;
  }

  function pageDown() {
    if (!listRef.current) return;

    const optionHeight = listRef?.current?.children[0]?.clientHeight

    setSelectedIndex(suggestions.length - 1);
    listRef.current.scrollTop = suggestions.length * optionHeight;
  }

  const handleEnter = () => selectOption(selectedIndex);

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    const keyOperation = {
      [KEY_EVENTS.UP]: scrollUp,
      [KEY_EVENTS.PAGE_UP]: pageUp,
      [KEY_EVENTS.DOWN]: scrollDown,
      [KEY_EVENTS.PAGE_DOWN]: pageDown,
      [KEY_EVENTS.ENTER]: handleEnter,
      [KEY_EVENTS.ESCAPE]: clearSuggestions
    };

    if (keyOperation[e.key]) {
      keyOperation[e.key]();
    } else {
      setSelectedIndex(-1);
    }
  }

  return {
    inputData: {
      value: textValue,
      onChange: (e: { target: HTMLInputElement }) => onTextChange(e.target.value),
      onKeyDown
    },
    optionsListData: {
      ref: listRef,
    },
    optionData: {
      onClick: (e: MouseEvent) => {
        if (!listRef.current) return;

        if (e.target instanceof HTMLElement) {
          let nodes = Array.from(listRef.current.children);
          const closestLI = e.target.closest('li');

          if (closestLI) {
            selectOption(nodes.indexOf(closestLI))
          }
        }
      }
    },
    isLoading,
    suggestions,
    selectedIndex
  }
}
