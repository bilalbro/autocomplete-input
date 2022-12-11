import React from "react";
import ReactDOM from 'react-dom/client';
import AutocompleteInput from '../src/AutocompleteInput';

function App()
{
   return (
      <AutocompleteInput
         name="lang"
         data={['Python', 'Perl', 'ActionScript', 'PHP', 'Pascal']}
         noMatchText={v => `Thing '${v}' would be added`}
         allOnEmpty
         getHiddenInputValue={v => v.toUpperCase()}
         hideOnEsc={false}
      />
   )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);