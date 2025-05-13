const myLibrary = [
  new Book("A Clockwork Orange", "Anthony Burgees", 240, false),
  new Book("Brave New World", "Aldous Huxley", 200, true),
  new Book("The Stranger", "Albert Camus", 100, true),
  new Book("Catcher in the Rye", "J. D. Salinger", 210, true),
];

const cardContainer = document.querySelector(".card-container");
const formContainer = document.querySelector(".form-container");
const callBookFormBtn = document.querySelector("#call-book-form");
const addBookBtn = document.querySelector("#add-book");
const closeFormBtn = document.querySelector(".close-form");
const overlay = document.querySelector(".overlay");

const formBook = document.querySelector(".book-form > form");
const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formRead = document.querySelector("#isRead");

displayBooks();

function Book(title, author, pages, isRead) {
  if (!new.target) throw new Error("Constructor called without new operator.");

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
  let newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

function removeBookFromLibrary() {
  let bookID = this.parentElement.dataset.id;
  myLibrary.splice(
    myLibrary.findIndex((book) => book.id === bookID),
    1
  );
  let bookCard = document.querySelector(`[data-id="${bookID}"]`);
  bookCard.remove();
}

function createBookCard(book) {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h2");
  title.classList.add("book-title");
  title.textContent = book.title;
  card.appendChild(title);

  const deleteBookBtn = document.createElement("button");
  deleteBookBtn.classList.add("delete-book");
  deleteBookBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Delete Book</title><path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" /></svg>`;
  deleteBookBtn.addEventListener("click", removeBookFromLibrary);
  card.appendChild(deleteBookBtn);

  const author = document.createElement("p");
  author.innerHTML = `by <em>${book.author}</em>`;
  card.appendChild(author);

  const pages = document.createElement("p");
  pages.textContent = book.pages + " pages";
  card.appendChild(pages);

  const isRead = document.createElement("p");
  isRead.textContent = book.isRead ? "Read" : "Not Read";
  card.appendChild(isRead);

  card.dataset.id = book.id;

  return card;
}

function displayBooks() {
  cardContainer.innerHTML = "";
  myLibrary.forEach((book) => {
    const bookCard = createBookCard(book);
    cardContainer.appendChild(bookCard);
  });
}

function closeForm() {
  formContainer.classList = "form-container closed";
  overlay.style.display = "none";
}

callBookFormBtn.addEventListener("click", () => {
  formContainer.classList = formContainer.classList.contains("closed")
    ? "form-container"
    : "form-container closed";
  overlay.style.display = "block";
});

addBookBtn.addEventListener("click", (event) => {
  addBookToLibrary(
    formTitle.value,
    formAuthor.value,
    formPages.value,
    formRead.checked
  );

  formBook.reset();

  closeForm();
  displayBooks();

  event.preventDefault();
});

closeFormBtn.addEventListener("click", closeForm);
