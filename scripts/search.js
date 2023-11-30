// searchBook
const search = document.getElementById('search-book-title');

search.addEventListener('click', function (event) {
    const searchBook = event.target.value.toLowerCase();
    const listBooks = document.querySelectorAll('.book-list article');

    listBooks.forEach((book) => {
        const bookTitle = book.querySelector('.content h3').innerText.toLowerCase();
        if (bookTitle.includes(searchBook)) {
            book.style.display = 'flex';
        } else {
            book.style.display = 'none';
        }
    });
});