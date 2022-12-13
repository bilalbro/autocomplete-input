# AutocompleteInput

A lightweight autocomplete input, powered by React.

## Motivation

For the recipe manager application, that I am currently working on at the time of this writing, I felt the need of an autocompleting input so that I could easily enter the names of the ingredients for a new recipe, based on all the ingredient names added up to that point. 

(If you're not aware of the term already, an **_autocompleting input_** is simply one where as we type, suggestions matching the entered query are shown to us. Besides the word _'autocomplete'_, it goes by a couple of other names as well, including _'autosuggest'_, _'word completion'_, etc.)

At first, I created a React component within the files of the project to denote such an input. But, with time, I found that it was becoming increasingly complex and so eventually it became a good candidate for a standalone library. And thus I created `AutocompleteInput` — a library providing us with a React component that renders an `<input>` and along with it a suggestions box.

## Technologies used

### 1. React

As stated near the end of the text above, `AutocompleteInput` is a React component; likewise, it's clear that **React** is used to build this library.

Diving specifically into React, the concept of reducers is employed to power state updates of the `AutocompleteInput` component. Frankly speaking, I could've made the library using the `useState()` approach, but with reducers (i.e. `useReducer()`), I get the added benefit of being able to extract some logic out of the component, into a separate file to keep the component file short and concise.

Believe it or not, that's a huge advantage!

### 2. rollup.js

For the bundling, I used **rollup.js**, which is quite a simple, yet powerful, bundler.


## A little about the library

Before beginning the discussion, it's worthwhile discussing about the two different kinds of `<input>` elements rendered by the `AutocompleteInput` component. One is what I refer to here as the _displayed `<input>`_, while the other is what I refer to as the _hidden `<input>`_.

The displayed `<input>` is the one that's actually visible on the screen. You basically interact with this `<input>` element.

The hidden `<input>` is denoted using the HTML `<input type="hidden">` element and serves a very different, yet equally important, purpose. It holds the name passed into the `AutocompleteInput` component along with the value of the selected suggestion. When the form containing the `AutocompleteInput` component is submitted, it's this hidden input that gets its data to be amalgamated with other inputs of the form. The displayed input has no `name` HTML attribute and is just meant visual interaction.

The reason for taking this approach boils down to certain scenarios where we don't want to use the text of a selected suggestion as the input's value, but instead something else based on the suggestion itself. For instance, in an autocompleting input for the name of a country, we might not want to use the text 'Australia' when a suggestion containing the text 'Australia' is clicked, but rather a numeric value. At the backend, this numeric value might refer to a key for a given country in a database of countries.

With this displayed-and-hidden-input approach, clicking the suggestion showing 'Australia', as described above, could be configured to set the value of the displayed `<input>` field to `'Australia'` whereas the value of the hidden `<input>` field to, let's say, `'1'`, where `'1'` might be the key of the country Australia in a backend database.

I hope this makes sense...

## Using this library

Let's now see how to use this library.

```
<AutocompleteInput {/* The following props can go here. */} />
```

So coming back to the point, here are the supported props of `AutocompleteInput`:

- **`value`** (`string`) - The starting value of the underlying displayed `<input>` element.
- **`name`** (`string`) - The name of the underlying hidden `<input>` element, which will be used to submit the entered value to the containing form.
- **`input`** - The value of the first argument to `React.createElement()` when creating the displayed `<input>` element. Defaults to `'false'`.
- **`data`**
  - (`Array`) - A collection of values that acts as the data store of the autocompleter, where it searches for matches.
  - (`Promise`) - The promise is first resolved and then the resolved value, which is meant to be an array, is used as the data.
- **`allOnEmpty`** (`boolean`) - A boolean indicating whether all entries should be shown when the input is empty. The default is `false`.
- **`hideOnEsc`** (`boolean`) - A boolean indicating whether the suggestions box should be hidden on the `Esc` key's press. The default is `true`.
- **`noMatchText`**
  - (`string`) - The text to display in the suggestions box when there are no matches.
  - (`function`) - A function called with one argument that is the current value of the displayed input element.
  - The default value is `'Nothing found'`.
- **`getInputValue`** (`function`) - A function that takes the selected suggestion entry (from the provided `data`) and returns a string to be used as the `value` attribute of the displayed input field.
- **`getHiddenInputValue`** (`function`) - A function that takes the selected suggestion entry (from the provided `data`) and returns a string to be used as the `value` attribute of the hidden input field.
- **`getSuggestionValue`** (`function`) - A function that takes a suggestion entry (from the provided `data`) and returns a React node, i.e. a string or a React element, to be displayed for the suggestion.
- **`filterFunction`** (`function`) - A function that specifies whether a given entry matches the value entered in the autocompleting input field (i.e the displayed input). The function gets two arguments: the value of the input field, followed by the current `data` entry. If `true` is returned`, the entry is added to the list of current suggestions, or else it's ignored.
