// show formbook
const showOn = document.getElementById('add-book');
const showOff = document.getElementById('close');
const overlay = document.getElementById('form-book');

showOn.addEventListener('click', function () {
    clear();
    overlay.style.display = 'flex';
    const h2 = document.querySelector('.input-section .title-input h2');
    h2.innerText = 'Add New Book'

    const editNameButton = document.getElementById('book-submit');
    editNameButton.innerText = 'Add Book';
});

showOff.addEventListener('click', function () {
    overlay.style.display = 'none';
    selectedEditBook.length = 0;
});