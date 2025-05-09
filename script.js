const myLibrary = [];

function Book(id, title, author, pages, isRead) {
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
