import { useState } from 'react';

import Autocomplete from './Autocomplete';
import type { OptionType, OptionsListType } from './Autocomplete';

import './App.css';

const optionsList: OptionsListType = [
  { value: '1', label: 'United Kingdom' },
  { value: '2', label: 'United States' },
  { value: '3', label: 'United Arab Emirates' },
  { value: '4', label: 'Spain' },
  { value: '5', label: 'Kingdom of Saudi Arabia' },
]

function App() {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <div className="App">
      <div>
        Selected option: {selectedValue}
      </div>

      <Autocomplete
        placeholder='Country'
        id='country-autcomplete'
        options={optionsList}
        onChange={(newValue: OptionType) => setSelectedValue(newValue.label || '')}
      />
    </div>
  );
}

export default App;
