const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth')
const errorController = require('./controllers/errorController')

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/',authRoutes);

app.get('/home', (req, res) => {
    res.render('home', {
        pageTitle: "Home",
    })
});

app.use('/',errorController.get404);

async function startServer() {
    try {
        await db.getDB();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();