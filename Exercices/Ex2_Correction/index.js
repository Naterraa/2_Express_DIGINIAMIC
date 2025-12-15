const express = require('express');
const bookRouter = require('./router/bookRouter');

const app = express();
const PORT = 3006;

app.use(express.json());

// /books
app.use('/books', bookRouter);

app.listen(PORT, () => {
    console.log(`Serveur demarre sur http://localhost:${PORT}`);
});
