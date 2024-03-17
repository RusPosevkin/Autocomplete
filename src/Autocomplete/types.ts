export type OptionType = {
  value: string;
  label: string;
};

export type OptionsListType = OptionType[];

export type AutocompleteType = {
  options?: OptionsListType;
  placeholder?: string;
  loading?: boolean;
  id?: string;
  getOptions?: () => Promise<OptionsListType>;
  onChange?: (value: OptionType) => void;
};
