// function to add book
function addBook() {
    isEdit = false;
    const title = document.getElementById('input-book-title').value;
    const author = document.getElementById('input-book-author').value;
    const year = parseInt(document.getElementById('input-book-year').value);
    const category = document.getElementById('input-book-category').value;
    const isCompleted = document.getElementById('input-book-is-complete').checked;

    const generateID = generateId();
    const bookObject = generateBookObject(generateID, title, author, year, category, isCompleted);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));

    saveData();
};

// funtion to create a new book
function newBook(bookObject) {
    const img = document.createElement('img');
    if (bookObject.isCompleted) {
        img.setAttribute('src', 'assets/images/doneRead.png');
    } else {
        img.setAttribute('src', 'assets/images/notDoneRead.png');
    }

    // card image
    const cardImage = document.createElement('div');
    cardImage.classList.add('card-img');
    cardImage.append(img);

    // card-body>content
    const bookTitle = document.createElement('h3');
    bookTitle.innerText = bookObject.title;

    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = bookObject.author;

    const bookYear = document.createElement('p');
    bookYear.innerText = bookObject.year;

    const bookCategory = document.createElement('h4');
    bookCategory.innerText = bookObject.category;

    const content = document.createElement('div');
    content.classList.add('content');
    content.append(bookTitle, bookAuthor, bookYear, bookCategory);

    // card-body>action
    const action = document.createElement('div');
    action.classList.add('action');

    // card-body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.append(content, action);

    if (bookObject.isCompleted) {
        const undoIcon = document.createElement('i');
        undoIcon.classList.add('fa-solid');
        undoIcon.classList.add('fa-rotate-right');

        const undoButton = document.createElement('button');
        undoButton.setAttribute('type', 'button');
        undoButton.classList.add('undo');
        undoButton.append(undoIcon);

        undoButton.addEventListener('click', function () {
            addUnfinished(bookObject.id);
        });

        const editIcon = document.createElement('i');
        editIcon.classList.add('fa-solid');
        editIcon.classList.add('fa-pen-to-square');

        const editButton = document.createElement('button');
        editButton.setAttribute('type', 'button');
        editButton.classList.add('edit');
        editButton.append(editIcon);

        editButton.addEventListener('click', function () {
            editBook(bookObject.id);
        });

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa-solid');
        deleteIcon.classList.add('fa-trash');

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('type', 'button');
        deleteButton.classList.add('delete');
        deleteButton.append(deleteIcon);

        deleteButton.addEventListener('click', function () {
            deleteBook(bookObject.id);
        });

        action.append(undoButton, editButton, deleteButton);

    } else {
        const doneIcon = document.createElement('i');
        doneIcon.classList.add('fa-regular');
        doneIcon.classList.add('fa-circle-check');

        const doneButton = document.createElement('button');
        doneButton.setAttribute('type', 'button');
        doneButton.classList.add('done');
        doneButton.append(doneIcon);

        doneButton.addEventListener('click', function () {
            addFinished(bookObject.id);
        });

        const editIcon = document.createElement('i');
        editIcon.classList.add('fa-solid');
        editIcon.classList.add('fa-pen-to-square');

        const editButton = document.createElement('button');
        editButton.setAttribute('type', 'button');
        editButton.classList.add('edit');
        editButton.append(editIcon);

        editButton.addEventListener('click', function () {
            editBook(bookObject.id);
        });

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa-solid');
        deleteIcon.classList.add('fa-trash');

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('type', 'button');
        deleteButton.classList.add('delete');
        deleteButton.append(deleteIcon);

        deleteButton.addEventListener('click', function () {
            deleteBook(bookObject.id);
        });

        action.append(doneButton, editButton, deleteButton);
    };

    const card = document.createElement('article');
    card.classList.add('card');
    card.append(cardImage, cardBody);

    return card;
};