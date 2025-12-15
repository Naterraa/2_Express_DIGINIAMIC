let books = [
    {
        id: 1,
        titre: "Le Petit Prince",
        auteur: "Antoine de Saint-Exupéry",
        annee_publication: 1943,
        genre: "Conte philosophique",
        disponible: true
    },
    {
        id: 2,
        titre: "1984",
        auteur: "George Orwell",
        annee_publication: 1949,
        genre: "Science-fiction dystopique",
        disponible: true
    },
    {
        id: 3,
        titre: "Le Crime de l'Orient-Express",
        auteur: "Agatha Christie",
        annee_publication: 1934,
        genre: "Roman policier",
        disponible: false
    },
    {
        id: 4,
        titre: "Les Dix Petits Nègres",
        auteur: "Agatha Christie",
        annee_publication: 1939,
        genre: "Roman policier",
        disponible: true
    }
];

let nextId = 5;

const getAllBooks = () => {
    return books;
};

const getBookById = (id) => {
    const book = books.find(b => b.id === parseInt(id));
    if (!book) {
        throw new Error(`Livre avec l'ID ${id} non trouvé`);
    }
    return book;
};

const createBook = (bookData) => {
    const { titre, auteur, annee_publication, genre, disponible } = bookData;

    if (!titre || !auteur) {
        throw new Error('Le titre et l\'auteur sont requis');
    }

    const newBook = {
        id: nextId++,
        titre: titre.trim(),
        auteur: auteur.trim(),
        annee_publication: annee_publication || null,
        genre: genre ? genre.trim() : null,
        disponible: disponible !== undefined ? disponible : true
    };

    books.push(newBook);
    return newBook;
};

const updateBook = (id, bookData) => {
    const index = books.findIndex(b => b.id === parseInt(id));
    if (index === -1) {
        throw new Error(`Livre avec l'ID ${id} non trouvé`);
    }

    const { titre, auteur, annee_publication, genre, disponible } = bookData;

    if (titre !== undefined) books[index].titre = titre.trim();
    if (auteur !== undefined) books[index].auteur = auteur.trim();
    if (annee_publication !== undefined) books[index].annee_publication = annee_publication;
    if (genre !== undefined) books[index].genre = genre.trim();
    if (disponible !== undefined) books[index].disponible = disponible;

    return books[index];
};

const deleteBook = (id) => {
    const index = books.findIndex(b => b.id === parseInt(id));
    if (index === -1) {
        throw new Error(`Livre avec l'ID ${id} non trouvé`);
    }

    const deletedBook = books[index];
    books.splice(index, 1);
    return deletedBook;
};

// Bonus 

const getAvailableBooks = () => {
    return books.filter(b => b.disponible === true);
};

const getBooksByGenre = (query) => {
    if (!query) {
        return books;
    }
    return books.filter(b =>
        b.genre.toLowerCase().includes(query.toLowerCase())
    );
};

module.exports = {
    getAllBooks,
    getBookById,
    getAvailableBooks,
    getBooksByGenre,
    createBook,
    updateBook,
    deleteBook
};
