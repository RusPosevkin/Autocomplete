import { MouseEventHandler } from 'react';

export type SuggestionType = {
  isSelected: boolean;
  onClick: MouseEventHandler<HTMLLIElement>;
  label: string;
  searchText: string;
};
