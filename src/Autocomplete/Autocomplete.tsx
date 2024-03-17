import useAutoComplete from './hooks/use-autocomplete';

import type { AutocompleteType, OptionType } from './types';

import './Autocomplete.css';

function Autocomplete({
  options,
  placeholder = 'Start typing to search',
  id = 'autocomplete',
  onChange = () => { },
}: AutocompleteType) {
  const {
    inputData,
    optionsListData,
    optionData,
    isLoading,
    suggestions,
    selectedIndex,
  } = useAutoComplete({
    // onChange: (value: OptionType) => console.log('value: ', value),
    onChange,
    getFilteredOptions: (search: string) => {
      return options.filter(option => new RegExp(`^${search}`, 'i').test(option.label));
    }
  })
  console.log(suggestions)

  return (
    <div className='autocomplete' id={id}>
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
                <li
                  className={'suggestion ' + (index === selectedIndex && 'selected-suggestion')}
                  key={index}
                  {...optionData}
                >
                  {suggestions[index].label}
                </li>
              ))
            }
          </ul>
        )}
      </div>
    </div>
  );
}

export default Autocomplete;
