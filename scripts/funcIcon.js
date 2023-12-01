// function to edit book
function editBook(bookId) {
    isEdit = true;
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    selectedEditBook.push(bookTarget);
    overlay.style.display = 'flex';
    document.getElementById('input-book-title').value = bookTarget.title;
    document.getElementById('input-book-author').value = bookTarget.author;
    document.getElementById('input-book-year').value = bookTarget.year;
    document.getElementById('input-book-category').value = bookTarget.category;
    document.getElementById('input-book-is-complete').checked = bookTarget.isCompleted;

    const h2 = document.querySelector('.input-section .title-input h2');
    h2.innerText = 'Form Edit'

    const editNameButton = document.getElementById('book-submit');
    editNameButton.innerText = 'Edit Book';
}

function saveEditBook() {
    isEdit = false;
    const getBookId = selectedEditBook[0].id;
    const title = document.getElementById('input-book-title').value;
    const author = document.getElementById('input-book-author').value;
    const year = Number(document.getElementById('input-book-year').value);
    const category = document.getElementById('input-book-category').value;
    const isCompleted = document.getElementById('input-book-is-complete').checked;

    const bookTarget = findBook(getBookId);

    if (bookTarget == null) return;

    bookTarget.id = getBookId;
    bookTarget.title = title;
    bookTarget.author = author;
    bookTarget.year = year;
    bookTarget.category = category;
    bookTarget.isCompleted = isCompleted;

    selectedEditBook.splice(0, selectedEditBook.length);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

// function to delete book
function deleteBook(bookId) {
    const bookTarget = findBookIndex(bookId);

    if (bookTarget == -1) return;

    const confirmDelete = confirm('Are you sure want to delete?');
    if (confirmDelete === true) {
        books.splice(bookTarget, 1);
        document.dispatchEvent(new Event(RENDER_EVENT));
    } else {
        return;
    }

    saveData();
}

// function to findbook
function findBook(bookId) {
    for (const book of books) {
        if (book.id === bookId) {
            return book;
        };
    };
    return null;
};

function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
    return -1;
}