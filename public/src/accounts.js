function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  let numBorrows = 0;

  // destructure account object to get the account's id
  const {id} = account;
  books.forEach(book => book.borrows.forEach(borrower => borrower.id === id ? numBorrows++ : null));

  return numBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  let result = [];

  books.forEach(item => {
    const borrowed = item.borrows;
    const {id, title, genre, authorId, borrows} = item;
    const book = {
      id,
      title,
      genre,
      authorId,
      author: {},
      borrows
    }

    borrowed.forEach(borrow => {
      if(borrow.id === account.id && !borrow.returned) {
        result.push(book);
        book.author = authors.filter(auth => auth.id === book.authorId)[0];
      }
    });
  });

  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
