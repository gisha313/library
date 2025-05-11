const myLibrary = [];

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

function createBookCard(book) {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h2");
  title.classList.add("book-title");
  title.textContent = book.title;
  card.appendChild(title);

  const author = document.createElement("p");
  author.textContent = "by " + book.author;
  card.appendChild(author);

  const pages = document.createElement("p");
  pages.textContent = book.pages + " pages";
  card.appendChild(pages);

  const isRead = document.createElement("p");
  isRead.textContent = book.isRead ? "Read" : "Not Read";
  card.appendChild(isRead);

  return card;
}

const cardContainer = document.querySelector(".card-container");
const formContainer = document.querySelector(".form-container");
const callBookFormBtn = document.querySelector("#call-book-form");
const addBookBtn = document.querySelector("#add-book");

const formBook = document.querySelector(".book-form > form");
const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formRead = document.querySelector("#isRead");

function displayBooks() {
  cardContainer.innerHTML = "";
  myLibrary.forEach((book) => {
    const bookCard = createBookCard(book);
    cardContainer.appendChild(bookCard);
  });
}

callBookFormBtn.addEventListener("click", () => {
  formContainer.classList = formContainer.classList.contains("closed")
    ? "form-container"
    : "form-container closed";
});

addBookBtn.addEventListener("click", (event) => {
  addBookToLibrary(
    formTitle.value,
    formAuthor.value,
    formPages.value,
    formRead.checked
  );

  formBook.reset();
  formContainer.classList = "form-container closed";
  displayBooks();

  event.preventDefault();
});
