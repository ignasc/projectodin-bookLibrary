const bookList = document.querySelector("#book-list");
const buttonRead = document.createElement("button");
const buttonRemove = document.createElement("button");
const buttonAdd = document.querySelector("#book-add-new");
const newBookForm = document.querySelector("#book-new-form");
const buttonNewBookFormSubmit = document.querySelector("#form-book-submit-btn");

const bookLibrary = [];

class Book{
    //book constructor

    constructor(title, author, pages, read = false){
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    setRead(){
        //change read status
        this.read = !this.read;
    };

  };

//Temporary book list
addBookToLibrary("Forest of the Gods", "Balys Sruoga", 450, true);
addBookToLibrary("The Alchemist", "Paulo Coelho", 208, true);
addBookToLibrary("Harry Potter and the Philosopher's Stone", "J. K. Rowling", 223, false);

function addBookToLibrary(title, author, pages, read){
    //add new book to library
    if(!title || !author){
        return;
    };
    let newBook = new Book(title, author, pages, read);
    bookLibrary.push(newBook);
};

function updateBookList(){
    bookList.textContent = '';//clear book list element
    bookLibrary.forEach(book => {
        let newItem = document.createElement("li");
        let divBookTitle = document.createElement("p");
        let divBookAuthor = document.createElement("p");
        let divBookPages = document.createElement("p");
        let divBookRead = document.createElement("p");
        let divBookContainer = document.createElement("div");
        let divButtonContainer = document.createElement("div");
        let newButtonRead = buttonRead.cloneNode();
        let newButtonRemove = buttonRemove.cloneNode();

        newItem.setAttribute("class", "book-card");
        divBookTitle.setAttribute("id", "book-title-p");
        divBookAuthor.setAttribute("id", "book-author-p");
        divBookPages.setAttribute("id", "book-pages-p");
        divBookRead.setAttribute("id", "book-read-p");
        divBookContainer.setAttribute("class", "book-info-container");
        divButtonContainer.setAttribute("class", "book-button-container");

        newButtonRemove.setAttribute("data-id", book["id"]);
        newButtonRemove.addEventListener("click", (e)=>{
            removeBookFromLibrary(e.target.getAttribute("data-id"));
            updateBookList();
        });

        newButtonRead.setAttribute("data-id", book["id"]);
        newButtonRead.addEventListener("click", (e)=>{
            let bookArrayIndex = getBookArrayIndexFromId(e.target.getAttribute("data-id"))
            bookLibrary[bookArrayIndex].setRead();
            updateBookList();
        });

        divBookTitle.textContent = book.title;
        divBookAuthor.textContent = "- written by " + book.author;
        divBookPages.textContent = "Pages: " + book.pages;
        divBookRead.textContent = "Read: " + (book.read?"finished.":"not finished.");
        
        newButtonRead.textContent = "Update read status";
        newButtonRemove.textContent = "Remove from library";

        divBookContainer.appendChild(divBookTitle);
        divBookContainer.appendChild(divBookAuthor);
        divBookContainer.appendChild(divBookPages);
        divBookContainer.appendChild(divBookRead);

        divButtonContainer.appendChild(newButtonRead);
        divButtonContainer.appendChild(newButtonRemove);
        
        newItem.setAttribute("id",book["id"]);
        newItem.appendChild(divBookContainer);
        newItem.appendChild(divButtonContainer);
        
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
    if(newBookForm.hidden){
        newBookForm.style.display = "flex";
    } else {
        newBookForm.style.display = "none";
    };
    newBookForm.hidden = newBookForm.hidden?false:true;
    e.target.textContent = newBookForm.hidden?"Show new book form":"Hide new book form";
});

buttonNewBookFormSubmit.addEventListener("click", (e)=>{
    let newFormData = new FormData(newBookForm);
    let newBookObject = {};

    for(const [key, value] of newFormData){
        newBookObject[key] = value;
    };
    
    addBookToLibrary(newBookObject.title, newBookObject.author, newBookObject.pages, (newBookObject.read?true:false));
    updateBookList();
    e.preventDefault();
});
