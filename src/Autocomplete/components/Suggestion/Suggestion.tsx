import type { SuggestionType } from './types';

import './Suggestion.css';

function Suggestion({
  isSelected,
  onClick,
  label,
  searchText
}: SuggestionType) {

  const searchRegexp = new RegExp(searchText, "gi")
  const htmlContent = label.replace(searchRegexp, (match) => (`<span class='highlight'>${match}</span>`));

  return (
    <li
      className={'suggestion ' + (isSelected && 'suggestion-selected')}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export default Suggestion;
