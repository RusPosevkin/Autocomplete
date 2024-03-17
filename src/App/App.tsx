import { useState } from 'react';

import Autocomplete from '../Autocomplete';
import type { OptionType, OptionsListType } from '../Autocomplete';
import {
  localFailedFetchData,
  localFetchData,
  optionsList,
  useGetQuery,
  transformData
} from '../utils';

import './App.css';

function App() {
  const [selectedSyncValue, setSelectedSyncValue] = useState('');
  const [selectedAsyncValue, setSelectedAsyncValue] = useState('');
  const [selectedAPIValue, setSelectedAPIValue] = useState('');

  const apiOptions = useGetQuery<OptionsListType>('https://restcountries.com/v3.1/all?fields=name', transformData)

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
          getOptions={localFetchData}
          onChange={(newValue: OptionType) => setSelectedAsyncValue(newValue.label || '')}
        />
      </section>

      <section>
        <h2>
          Local Data - async – error state
        </h2>

        <Autocomplete
          placeholder='Country'
          getOptions={localFailedFetchData}
        />
      </section>

      <section>
        <h2>
          API Call
        </h2>

        <div>
          Selected option: {selectedAPIValue}
        </div>
        {
          apiOptions.data ? (
            <Autocomplete
              placeholder='Country'
              options={apiOptions.data}
              onChange={(newValue: OptionType) => setSelectedAPIValue(newValue.label || '')}
            />
          ) : null
        }
      </section>
    </div>
  );
}

export default App;
