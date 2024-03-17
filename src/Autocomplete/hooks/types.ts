import { OptionType, OptionsListType } from '../types';

export type useAutoCompleteType = {
  delay?: number;
  getFilteredOptions: (search: string) => OptionsListType | null
  onChange: (value: OptionType) => void
};
