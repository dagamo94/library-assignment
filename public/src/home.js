function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) { 
  let result = 0;
  books.forEach(book => !book.borrows[0].returned ? result++ : null);
  return result;
}

// try to refactor
function getMostCommonGenres(books) {
  let countObj = books.reduce((acc, book) => {
    acc[book.genre] ? acc[book.genre]++ : acc[book.genre] = 1;
    return acc;
  }, {});
  
  let keys = Object.keys(countObj);

  keys.sort((keyA, keyB) => {
    if(countObj[keyA] > countObj[keyB]){
      return -1;
    }else if(countObj[keyA] > countObj[keyB]){
      return 1;
    }
    return 0;
  });

  let sortedGenres = keys.map(key => ({name: key, count: countObj[key]}));

  return sortedGenres.slice(0,5);
}

function getMostPopularBooks(books) {
  return books
    .sort((bookA, bookB) => bookB.borrows.length - bookA.borrows.length)
    .slice(0, 5)
    .map(book => ({ name: book.title, count: book.borrows.length }));
}


// **HELPER FUNCTION - Returns an array of author ids with the total number of borrows from all of their books
function getAuthorIds(books) {
  let authorIds = books.reduce((list, book) => {
    const id = book.authorId;
    list.hasOwnProperty(id) ? list[id].push(book.borrows.length) : list[id] = [book.borrows.length];
    return list;
  }, {});

  const ids = Object.keys(authorIds);
  const result = {};

  ids.forEach(id => result[id] = authorIds[id].reduce((total, num) => total + num));

  return result;
}

// **HELPER FUNCTION - replaces the id for the author's name in the 'name' key
function replaceIdWithName(temp, authors) {
  return temp.map(item => {
    const authorName = authors.find(author => author.id == item.name);
    item.name = `${authorName.name.first} ${authorName.name.last}`;
    return item;
  });
}

function getMostPopularAuthors(books, authors) {
  const borrowsByAuthorId = getAuthorIds(books);
  const sortableArray = [];
  const temp = [];
  let result = [];


  for (const id in borrowsByAuthorId) {
    sortableArray.push([id, borrowsByAuthorId[id]])
  }

  sortableArray.sort((authorA, authorB) => authorB[1] - authorA[1]);
  sortableArray.forEach(id => temp.push({ name: id[0], count: id[1] }));

  result = replaceIdWithName(temp, authors);

  return result.slice(0, 5);

}

// alternative solution by Dakota:
/*
function getMostPopularAuthors(books, authors) {
  let popularAuthors = [];
  books.forEach(book => {
    authors.forEach(author => {
      if(book.authorId === author.id){
        popularAuthors.push({
          'name': ${author.name.first} ${author.name.last},
          'count': book.borrows.length
        });
      }
    });
  });
  popularAuthors.sort((a,b) => b.count - a.count);
  let popularAuthorsReturn = popularAuthors.slice(0,5);
  return popularAuthorsReturn;
}
*/

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
