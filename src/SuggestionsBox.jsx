import React from 'react';
import {classNames} from '../../p8/src/components/helper';

export default function SuggestionsBox({
   autocompleter,
   dispatchForAutocompleter,
   suggestionsBox,
   dispatchForSuggestionsBox
})
{
   const {data, value} = autocompleter;
   const {
      suggestions,
      entrySelected,
      isShown,
      noMatchText,
      getSuggestionValue
   } = suggestionsBox;


   function onMouseDown(e) { e.preventDefault(); }

   function onSuggestionClick(i, suggestion)
   {
      dispatchForAutocompleter({
         type: 'entryClick',
         entryClicked: i,
         suggestion
      });
      dispatchForSuggestionsBox({
         type: 'entryClick'
      });
   }
   
   return isShown && (
      <div className="autocomplete_suggestions-box" onMouseDown={onMouseDown}>
         {
         data instanceof Promise
         ? <div className="autocomplete_text">Loading...</div>
         :
            suggestions.length
            ? suggestions.map((suggestion, i) => (
               <div key={i} onClick={() => onSuggestionClick(i, suggestion)} className={classNames({
                  'autocomplete_suggestion': true,
                  'autocomplete_suggestion--sel': i === entrySelected,
               })}>{getSuggestionValue(suggestion)}</div>
            ))
            : (
               <div className="autocomplete_text">
                  {typeof noMatchText === 'function' ? noMatchText(value) : noMatchText}
               </div>
            )
         }
      </div>
   );
}