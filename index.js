const bookList = document.querySelector("#book-list");
const buttonRead = document.createElement("button");
const buttonRemove = document.createElement("button");
const buttonAdd = document.querySelector("#book-add-new");
const newBookForm = document.querySelector("#book-new-form");
const buttonNewBookFormSubmit = document.querySelector("#form-book-submit-btn");

const bookLibrary = [
    {
      "id": "2a0cc60c-4160-4430-a0a6-316bcdb1f7d9",
      "title": "book01",
      "author": "author01",
      "pages": 123,
      "read": false
    },
    {
      "id": "e84bc301-9006-4dfc-9e7b-13288c57c871",
      "title": "book02",
      "author": "author02",
      "pages": 546,
      "read": false
    },
    {
      "id": "11e47826-6bbe-4f82-a314-016ffb6c66dc",
      "title": "book03",
      "author": "author03",
      "pages": 274,
      "read": true
    }
  ];

function Book(title, author, pages, read = false) {
    //book constructor
    if (!new.target) {
      throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    return {
        "id": crypto.randomUUID(),
        "title": this.title,
        "author": this.author,
        "pages": this.pages,
        "read": this.read,
    }
  };

function addBookToLibrary(title, author, pages, read){
    //add new book to library
    let newBook = new Book(title, author, pages, read);
    bookLibrary.push(newBook);
};

function updateBookList(){
    bookList.textContent = '';//clear book list element
    bookLibrary.forEach(element => {
        let newItem = document.createElement("li");
        let newInfo = document.createElement("p");
        let newButtonRead = buttonRead.cloneNode();
        let newButtonRemove = buttonRemove.cloneNode();

        newButtonRemove.addEventListener("click", (e)=>{
            removeBookFromLibrary(e.target.parentElement.id);
            updateBookList();
        });

        newButtonRead.addEventListener("click", (e)=>{
            updateBookReadStatus(e.target.parentElement.id);
            updateBookList();
        });

        newInfo.textContent = "\"" + element["title"] + "\", " + element["author"] + ", pages: " + element["pages"] + ", status: " + (element["read"]?"finished.":"not finished.");
        
        newButtonRead.textContent = "Update read status";
        newButtonRemove.textContent = "Remove from library";
        
        newItem.setAttribute("id",element["id"]);
        newItem.appendChild(newInfo);
        newItem.appendChild(newButtonRead);
        newItem.appendChild(newButtonRemove);
        
        bookList.appendChild(newItem);
    });
    
};

updateBookList(); // to be removed eventually

function getBookArrayIndexFromId(id){
    //this returns the bookLibrary array index based on id
    return bookLibrary.findIndex((element)=>{return element["id"] == id});
};

function removeBookFromLibrary(id){
    let bookArrayIndex = getBookArrayIndexFromId(id);

    bookLibrary.splice(bookArrayIndex, 1);
};

function updateBookReadStatus(id){
    let bookArrayIndex = getBookArrayIndexFromId(id);

    bookLibrary[bookArrayIndex].read = !bookLibrary[bookArrayIndex].read;
};

buttonAdd.addEventListener("click", (e)=>{
    newBookForm.hidden = newBookForm.hidden?false:true;
    e.target.textContent = newBookForm.hidden?"Show new book form":"Hide new book form";
});

buttonNewBookFormSubmit.addEventListener("click", (e)=>{
    console.log("form submitted")

    let newFormData = new FormData(newBookForm);
    let newBookObject = {};

    for(const [key, value] of newFormData){
        newBookObject[key] = value;
    };
    
    addBookToLibrary(newBookObject.title, newBookObject.author, newBookObject.pages, (newBookObject.read?true:false));
    updateBookList();
    e.preventDefault();
});
