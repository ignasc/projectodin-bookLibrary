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

    if(!isNewBookFormValidOnSubmit()){
        return;
    };

    for(const [key, value] of newFormData){
        newBookObject[key] = value;
    };
    
    addBookToLibrary(newBookObject.title, newBookObject.author, newBookObject.pages, (newBookObject.read?true:false));
    updateBookList();
    e.preventDefault();
});

const inputBookTitle = document.querySelector("#form-book-title")
const inputBookAuthor = document.querySelector("#form-book-author")
const inputBookPages = document.querySelector("#form-book-pages")

inputBookTitle.addEventListener("input", (e)=>{
    console.log(inputBookTitle.value)
    if(inputBookTitle.validity.valueMissing){
        inputBookTitle.setCustomValidity("Enter book title.");
        inputBookTitle.reportValidity();
    } else{
        inputBookTitle.setCustomValidity("");
    };

});

inputBookAuthor.addEventListener("input", (e)=>{
    if(inputBookAuthor.validity.valueMissing){
        inputBookAuthor.setCustomValidity("Enter book author.");
        inputBookAuthor.reportValidity();
    } else{
        inputBookAuthor.setCustomValidity("");
    };

});

inputBookPages.addEventListener("input", (e)=>{
    if(inputBookPages.validity.rangeUnderflow){
        inputBookPages.setCustomValidity("Enter a number higher than 0.");
        inputBookPages.reportValidity();
    } else{
        inputBookPages.setCustomValidity("");
    };

});

function isNewBookFormValidOnSubmit(){
    let isFormValid = true;

    console.log("Title value: " + inputBookTitle.value + " , validity: " + inputBookTitle.checkValidity())
    console.log("Author value: " + inputBookAuthor.value + " , validity: " + inputBookAuthor.checkValidity())
    console.log("Pages value: " + inputBookPages.value + " , validity: " + inputBookPages.checkValidity())

    if(inputBookTitle.validity.valueMissing){
        isFormValid = false;
        inputBookTitle.setCustomValidity("Please enter book title");
        inputBookTitle.reportValidity();
    } else {
        inputBookTitle.setCustomValidity("");
    };

    if(inputBookAuthor.validity.valueMissing){
        isFormValid = false;
        inputBookAuthor.setCustomValidity("Please enter book author");
        inputBookAuthor.reportValidity();
    } else {
        inputBookAuthor.setCustomValidity("");
    };

    if(inputBookPages.validity.rangeUnderflow){
        isFormValid = false;
        inputBookPages.setCustomValidity("Please enter book pages");
        inputBookPages.reportValidity();
    } else {
        inputBookPages.setCustomValidity("");
    };

    return isFormValid;
};
