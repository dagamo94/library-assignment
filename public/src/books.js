function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const result = [];

  // could also work with the array.push() method
  result[0] = books.filter(book => !book.borrows[0].returned);
  result[1] = books.filter(book => book.borrows[0].returned);

  return result;
}

function getBorrowersForBook(book, accounts) {
  const { borrows } = book;
  let filteredAccounts = [];

  borrows.forEach(borrower => {
    accounts.forEach(account => borrower.id === account.id ? filteredAccounts.push({...account, returned: borrower.returned}) : null);
  });

  return filteredAccounts.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
