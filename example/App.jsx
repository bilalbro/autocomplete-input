import React from "react";
import ReactDOM from 'react-dom/client';
import AutocompleteInput from '../src/AutocompleteInput';

function App()
{
   return <>
      <h1>AutocompleteInput</h1>
      <p>A simple autocompleter built using React, by <a href="https://github.com/bilalbro/">@bilalbro</a>.</p>
      <AutocompleteInput
         placeholder="Type a language name"
         name="lang"
         data={['Python', 'Perl', 'ActionScript', 'PHP', 'Pascal']}
         noMatchText={v => `Language '${v}' doesn't exist in our store.`}
         allOnEmpty
         getHiddenInputValue={v => v.toUpperCase()}
         hideOnEsc={false}
      />
   </>
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);