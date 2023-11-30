// Web Storage
const STORAGE_KEY = 'BOOKSHELF_APPS';
const SAVED_EVENT = 'saved-book';

// memeriksa apakah localStorage didukung oleh browser atau tidak
function storageExist() {
    if (typeof (Storage) === undefined) {
        alert('Unfortunately, your browser does not support local storage.');
        return false;
    }
    return true;
}

// menyimpan data ke localStorage based on Key yang sudah ditetapkan sebelumnya.
function saveData() {
    if (storageExist()) {
        const parsed /* string */ = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event('SAVED_EVENT'));
    }
}

document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
});

// memuat data dari localStorage & memasukkan data hasil parsing ke variabel books
function loadDataFromStorage() {
    const serializedData /* string */ = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        };
    };

    document.dispatchEvent(new Event(RENDER_EVENT));
}

// add preventDefault on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    overlay.style.display = 'none';
    const submitForm = document.getElementById('input-book');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (isEdit == true) {
            saveEditBook();
        } else {
            addBook();
        }
        clear();
        selectedEditBook.splice(0, selectedEditBook.length);
    });

    showOn.addEventListener('click', function (event) {
        event.preventDefault();
        overlay.style.display = 'flex';
    });

    showOff.addEventListener('click', function (event) {
        event.preventDefault();
        overlay.style.display = 'none';
    });

    if (storageExist()) {
        loadDataFromStorage();
    }
});

// clear value
function clear() {
    document.getElementById('input-book-title').value = '';
    document.getElementById('input-book-author').value = '';
    document.getElementById('input-book-year').value = '';
    document.getElementById('input-book-category').value = '';
    document.getElementById('input-book-is-completed').checked = false;
    overlay.style.display = 'none';
}

// var book
const books = [];
const RENDER_EVENT = 'render-book';

function generateId() {
    return +new Date();
};

// return book
function generateBookObject(id, title, author, year, category, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        category,
        isCompleted
    };
};

// render event
document.addEventListener(RENDER_EVENT, function () {
    console.log(books);
});

document.addEventListener(RENDER_EVENT, () => {
    const unfinished = document.getElementById('unfinished-book-list');
    const finished = document.getElementById('finished-book-list');

    unfinished.innerHTML = '';
    finished.innerHTML = '';

    for (const book of books) {
        const bookElement = newBook(book);
        if (book.isCompleted) {
            finished.append(bookElement);
        } else {
            unfinished.append(bookElement);
        }
    }
})

// book length
function booksLength() {
    const jumlahBuku = document.querySelectorAll('#total-books');
    jumlahBuku.innerText = books.length;
}

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
    booksLength();
  });
  
  document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
    booksLength();
  });