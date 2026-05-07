# Project Odin - Book Library

Project Odin assignment. A simple book library webpage where you can add/remove your books.

[Live preview](https://ignasc.github.io/projectodin-bookLibrary/)

## Features

- Add/remove books from the list.
- Flag the book as read.

## Tech stack

- HTML
- CSS
- Javascript

## Learning

- Manipulating DOM elements
- User form with required fields

## Thoughts

I was very tempted to just quickly add a whole bunch of books to the page by adding them to html file. But it really pays off building a piece of code that does it for you from a hidden list of predefined books to be always shown when the page is loaded.

It becomes much easier to modify as I build the structure of the page and add styling.

I also had issues where changing new book form display to grid/flex no longer allows me to show/hide the form with a button click. Took me some time to figure out how to change that through javascript using following expression:

    <selected element>.style.display = "none/grid/flex"
