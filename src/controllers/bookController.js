const Book = require("../models/Book");

exports.index = async (req, res) => {
    const books = await Book.find().lean();
    res.render('index', { 
        books, 
        title: 'Livros', 
        csrfToken: req.csrfToken(), 
        searchQuery: ''
    });
};

exports.addBook = async (req, res) => {
    const { titulo, autor } = req.body;
    await Book.create({ titulo, autor });
    res.redirect('/');
};

exports.deleteBook = async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/');
};

exports.editBookForm = async (req, res) => {
    const book = await Book.findById(req.params.id).lean();
    res.render('edit', { book, title: 'Editar Livro', csrfToken: req.csrfToken() });
};

exports.editBook = async (req, res) => {
    const { titulo, autor, disponivel } = req.body;
    await Book.findByIdAndUpdate(req.params.id, {
        titulo,
        autor,
        disponivel: !!disponivel
    });
    res.redirect('/');
};

exports.searchBooks = async (req, res) => {
    const query = req.query.query || '';
    const books = await Book.find({
        $or: [
            { titulo: { $regex: query, $options: 'i' } },
            { autor: { $regex: query, $options: 'i' } }
        ]
    }).lean();

    res.render('index', { 
        books, 
        csrfToken: req.csrfToken(), 
        searchQuery: query,
        title: 'Resultados da busca'
    });
};
