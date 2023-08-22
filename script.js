const openModalButtons = document.querySelector('.add-book-btn');
const closeModalButtons = document.querySelector('.overlay');
const submitAddBookButtons = document.querySelector('.form-button');
const addBookForm = document.getElementById('add-book-form');
const bookLibrary = document.querySelector('.book-library-container');
const overlay = document.querySelector('.overlay');
const bookIsRead = document.querySelector('.read-button');


let title = document.getElementById('title');
let author = document.getElementById('author');
let pages = document.getElementById('pages');
let hasRead = document.getElementById('hasRead');

let myLibrary = [];

openModalButtons.addEventListener('click', () => {
    const modal = document.querySelector('.add-book-form');
    openModal(modal);
})
overlay.addEventListener('click', () => {
    const modals = document.querySelector('.add-book-form.active');
    closeModal(modals);
})

/*bookIsRead.addEventListener('click', () => {
   //Do the Same as BookIsNotRead but do the opposite when switching classes
})*/

//Hello
function openModal(modal)
{
    if(modal == null) return
    modal.classList.add('active');
    overlay.classList.add('active')
}

function closeModal(modal) {
    if(modal == null) return 
    modal.classList.remove('active')
    overlay.classList.remove('active');

    title.value = "";
    author.value = "";
    pages.value = "";
    hasRead.checked = false;
}





function Book(title, author, pages, hasRead) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

addBookForm.addEventListener('submit', addBookToTheLibrary, false);

function addBookToTheLibrary(event) {
    event.preventDefault();
    
    if(title.value == "" || author.value == "" || pages.value == "")
    {
        alert("Please complete all form fields");
    }
    else
    {
        const bookEntry = new Book(title.value, author.value, pages.value, hasRead.checked);
        myLibrary.push(bookEntry);
        
        const modals = document.querySelector('.add-book-form.active');
        closeModal(modals)
        displayBookInLibrary();
    }
}



function displayBookInLibrary() 
{
    while(bookLibrary.firstChild)
    {
        bookLibrary.removeChild(bookLibrary.lastChild);
    }
    for(i = 0; i < myLibrary.length; i++)
    {
        const bookEntry = document.createElement('div');
        const tempTitle = document.createElement('div');
        const tempAuthor = document.createElement('div');
        const tempPages = document.createElement('div');
        const tempHasRead = document.createElement('button');
        const removeEntryButton = document.createElement('button');

        tempTitle.classList.add('book-library-para');
        tempAuthor.classList.add('book-library-para');
        tempPages.classList.add('book-library-para');
        tempHasRead.classList.add('book-library-para');
        if(myLibrary[i].hasRead == false)
        {
            tempHasRead.classList.add('not-read-button');
            tempHasRead.textContent = "Not Read";
        }
        else
        {
            tempHasRead.classList.add('read-button');
            tempHasRead.textContent = "Read";
        }
        
        removeEntryButton.classList.add('book-library-para');
        removeEntryButton.classList.add('remove-button');
        removeEntryButton.textContent = "Remove";

        
        bookEntry.classList.add('book-library-card');
        tempTitle.textContent = "'" + myLibrary[i].title + "'";
        tempAuthor.textContent = myLibrary[i].author;
        tempPages.textContent = myLibrary[i].pages + " Pages";

        bookEntry.appendChild(tempTitle);
        bookEntry.appendChild(tempAuthor);
        bookEntry.appendChild(tempPages);
        bookEntry.appendChild(tempHasRead);
        bookEntry.appendChild(removeEntryButton);
        
        bookEntry.dataset.index = i;
        bookLibrary.appendChild(bookEntry);

        const parentCardContainer = document.querySelector('[data-index="' + i + '"]');
        const childReadButton = parentCardContainer.querySelector(':nth-child(4)');
        const childRemoveButton = parentCardContainer.querySelector(':nth-child(5)');

        childReadButton.addEventListener('click', () => {
            updateReadStatus(parentCardContainer);
        })
        childRemoveButton.addEventListener('click', () => {
            console.log('Remove Button has been clicked');
            removeBookFromLibrary(parentCardContainer);
        })
    }
    //Displays All Books Added to Library
}
function removeBookFromLibrary(parentCardContainer)
{
    myLibrary.splice(parentCardContainer.dataset.index, 1);
    displayBookInLibrary();
    //Remove Book From Library when User presses on the Remove Book option Button
}
function updateReadStatus(parentCardContainer) 
{
    if(myLibrary[parentCardContainer.dataset.index].hasRead == false)
    {
        console.log('Book is converted to true');
        myLibrary[parentCardContainer.dataset.index].hasRead = true;
        
    }
    else
    {
        console.log('Book is converted to false');
        myLibrary[parentCardContainer.dataset.index].hasRead = false;

    }
    displayBookInLibrary();
    //Changes 
}


