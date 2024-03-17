import { useState } from 'react';

import { localFailedFetchData, localFetchData } from '../utils/localFetchData';
import Autocomplete from '../Autocomplete';
import type { OptionType } from '../Autocomplete';

import './App.css';
import { optionsList } from '../utils/optionsList';


function App() {
  const [selectedSyncValue, setSelectedSyncValue] = useState('');
  const [selectedAsyncValue, setSelectedAsyncValue] = useState('');

  return (
    <div className="App">
      <h1>
        Autocomplete component
      </h1>
      <section>
        <h2>
          Local Data - synchronous
        </h2>
        <div>
          Selected option: {selectedSyncValue}
        </div>

        <Autocomplete
          placeholder='Country'
          id='country-autcomplete'
          options={optionsList}
          onChange={(newValue: OptionType) => setSelectedSyncValue(newValue.label || '')}
        />
      </section>

      <section>
        <h2>
          Local Data - asynchronous
        </h2>
        <div>
          Selected option: {selectedAsyncValue}
        </div>

        <Autocomplete
          placeholder='Country'
          id='country-autcomplete'
          getOptions={localFetchData}
          onChange={(newValue: OptionType) => setSelectedAsyncValue(newValue.label || '')}
        />
      </section>

      <section>
        <h2>
          Local Data - asynchronous – error state
        </h2>

        <Autocomplete
          placeholder='Country'
          id='country-autcomplete'
          getOptions={localFailedFetchData}
        />
      </section>
    </div>
  );
}

export default App;
