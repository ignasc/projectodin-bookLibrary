const bookLibrary = [
    {
      "id": "2a0cc60c-4160-4430-a0a6-316bcdb1f7d9",
      "name": "book01",
      "author": "author01",
      "pages": 123,
      "read": false
    },
    {
      "id": "e84bc301-9006-4dfc-9e7b-13288c57c871",
      "name": "book02",
      "author": "author02",
      "pages": 546,
      "read": false
    },
    {
      "id": "11e47826-6bbe-4f82-a314-016ffb6c66dc",
      "name": "book03",
      "author": "author03",
      "pages": 274,
      "read": true
    }
  ];

function Book(name, author, pages, read = false) {
    //book constructor
    if (!new.target) {
      throw Error("You must use the 'new' operator to call the constructor");
    }
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;

    return {
        "id": crypto.randomUUID(),
        "name": this.name,
        "author": this.author,
        "pages": this.pages,
        "read": this.read,
    }
  };

function addBookToLibrary(name, author, pages, read){
    //add new book to library
    let newBook = new Book(name, author, pages, read);
    bookLibrary.push(newBook);
};
