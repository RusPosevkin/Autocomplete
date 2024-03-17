import { useEffect, useState } from 'react';

import useAutoComplete from './hooks/use-autocomplete';
import Suggestion from './components/Suggestion';

import type { AutocompleteType, OptionsListType } from './types';

import './Autocomplete.css';

function Autocomplete({
  options,
  placeholder = 'Start typing to search',
  id = 'autocomplete',
  onChange = () => { },
  getOptions,
  loading,
}: AutocompleteType) {
  const [optionsData, setOptionsData] = useState<OptionsListType | null>(null);
  const [isError, setIsError] = useState(false);
  const [isOptionsLoading, setIsOptionsLoading] = useState(loading || false);

  const {
    inputData,
    optionsListData,
    optionData,
    isLoading,
    suggestions,
    selectedIndex,
  } = useAutoComplete({
    onChange,
    getFilteredOptions: (search: string) => {
      if (!optionData) return null;

      return optionsData?.filter(option => new RegExp(`${search}`, 'i').test(option.label)) || null;
    }
  })

  useEffect(() => {
    // We expect `options` prop or `getOptions` function that loads options
    if (options) {
      setOptionsData(options);
      return;
    }

    if (!getOptions) {
      setIsError(true);
      return;
    };

    setIsOptionsLoading(true);

    getOptions()
      .then(data => {
        setOptionsData(data);
        setIsOptionsLoading(false);
      })
      .catch(e => setIsError(true))

  }, [options, getOptions])


  console.log(suggestions)

  if (isError) {
    return (
      <div>
        Something went wrong. Please try again later.
      </div>
    )
  }

  return (
    <div className='autocomplete' id={id}>
      {isOptionsLoading ? (
        <div className='loader'></div>
      ) : (
        <>
          <div>
            <input
              className='autocomplete-input'
              placeholder={placeholder}
              {...inputData}
            />
          </div>
          <div className='suggestions-list-wrapper'>
            {isLoading ? (
              <div className='loader'></div>
            ) : (
              <ul
                className='suggestions-list'
                {...optionsListData}
              >
                {
                  suggestions.map((_, index) => (
                    <Suggestion
                      key={index}
                      isSelected={index === selectedIndex}
                      onClick={optionData.onClick}
                      label={suggestions[index].label}
                      searchText={inputData.value}
                    />
                  ))
                }
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Autocomplete;
