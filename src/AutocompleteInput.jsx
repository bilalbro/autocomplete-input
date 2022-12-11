import React, {useReducer} from 'react';

import autocompleterReducer from './autocompleterReducer';
import suggestionsBoxReducer from './suggestionsBoxReducer';
import SuggestionsBox from './SuggestionsBox';

export default function AutocompleteInput({
   value = '',
   name,
   input: Input = 'input',
   data,
   allOnEmpty = false,
   hideOnEsc = true,
   noMatchText = 'Nothing found',
   getInputValue = s => s,
   getHiddenInputValue = s => s,
   getSuggestionValue = s => s,
   filterFunction = (value, s) => s.toLowerCase().indexOf(value.toLowerCase()) !== -1
})
{
   const [autocompleter, dispatchForAutocompleter] = useReducer(autocompleterReducer, {
      // The value of the input field
      value,
      hiddenValue: value,
      data,
      getInputValue,
      getHiddenInputValue
   });

   const [suggestionsBox, dispatchForSuggestionsBox] = useReducer(suggestionsBoxReducer, {
      // The index of the entry selected.
      entrySelected: -1,

      // Whether or not the suggestion box is shown.
      isShown: false,

      // The list of matching suggestions.
      suggestions: data,

      allOnEmpty,
      filterFunction,
      getSuggestionValue,
      noMatchText
   });

   function onChange(e)
   {
      dispatchForAutocompleter({
         type: 'input',
         value: e.target.value
      });
      dispatchForSuggestionsBox({
         type: 'input',
         value: e.target.value,
         data: autocompleter.data
      })
   }

   function onKeyDown(e)
   {
      switch (e.keyCode) {
         case 40:
            e.preventDefault();
            dispatchForSuggestionsBox({
               type: 'navigation',
               direction: 'down'
            });
            break;
         case 38:
            e.preventDefault();
            dispatchForSuggestionsBox({
               type: 'navigation',
               direction: 'up'
            });
            break;
         case 13:
            e.preventDefault();
            dispatchForAutocompleter({
               type: 'entryClick',
               suggestion: suggestionsBox.entrySelected !== -1 && suggestionsBox.suggestions[suggestionsBox.entrySelected]
            });
            dispatchForSuggestionsBox({
               type: 'entryClick'
            });
            break;
         case 27:
            e.preventDefault();
            if (hideOnEsc) {
               dispatchForSuggestionsBox({
                  type: 'escPress',
               });
            }
      }
   }

   function onFocus(e)
   {
      dispatchForAutocompleter({
         type: 'inputFocus',
         dispatchForAutocompleter,
         dispatchForSuggestionsBox
      });
      dispatchForSuggestionsBox({
         type: 'inputFocus',
         value: e.target.value,
         data: autocompleter.data
      });
   }

   function onBlur(e) {
      dispatchForSuggestionsBox({
         type: 'inputBlur'
      });
   }

   return (
      <div className="autocomplete">
         <Input value={autocompleter.value} className="autocomplete_input"
         onChange={onChange} type="text" onKeyDown={onKeyDown} onFocus={onFocus}
         onBlur={onBlur} />
         <input name={name} type="hidden" value={autocompleter.hiddenValue} />

         <SuggestionsBox {...{autocompleter, dispatchForAutocompleter,
         suggestionsBox, dispatchForSuggestionsBox}} />
      </div>
   );
}