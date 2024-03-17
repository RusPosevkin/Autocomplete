export type OptionType = {
  value: string;
  label: string;
};

export type OptionsListType = OptionType[];

export type AutocompleteType = {
  options: OptionsListType
  placeholder?: string;
  id?: string;
  onChange?: (value: OptionType) => void
};
