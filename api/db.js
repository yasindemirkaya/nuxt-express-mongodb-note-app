const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/nuxt-note-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB bağlantısı başarılı.');
    })
    .catch((err) => {
        console.error('MongoDB bağlantı hatası:', err);
    });

module.exports = mongoose;