import { OptionType, OptionsListType } from '../types';

export type useAutoCompleteType = {
  delay?: number;
  getFilteredOptions: (search: string) => OptionsListType
  onChange: (value: OptionType) => void
};
