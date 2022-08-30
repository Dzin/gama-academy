const books = require('./database');
const categories = [...new Set(books.map((book) => book.categoria))];

const readlineSync = require('readline-sync');

const option = readlineSync.question('Deseja buscar um livro? (S/N) ');

if (option.toLocaleUpperCase() === 'S') {
    console.log('Essas são as categorias disponíveis:');
    categories.map((category) => console.log(category));
    
    const category = readlineSync.question('Qual categoria você escolhe: ');
    console.log(category);
    const booksCategory = books.filter((book) => book.categoria === category);

    if (booksCategory.length > 0) {
        console.table(booksCategory);
    } else {
        console.log("Nenhum livro encontrado para a categoria selecionada!");
    }
} else {
    console.log("Esses são todos os livros disponíveis:");
    console.table(books.sort((a, b) => a.paginas - b.paginas));
}