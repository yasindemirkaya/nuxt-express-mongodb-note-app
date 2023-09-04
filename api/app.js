const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const bcrypt = require('bcrypt');
const db = require('./db')


// Models
const User = require('./models/User');
const Note = require('./models/Note')

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));


// Base
app.route('/').get((req, res) => {
    res.send('NuxtJS Note App Express API');
    return res.status(200).json({ message: 'NuxtJS Note App Express API' })

})

// Login
app.route('/login').post(async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kullanıcının veritabanında var olup olmadığını kontrol edin
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(200).json({ message: 'Kullanıcı bulunamadı.' });
        }

        // Kullanıcının şifresini bcrypt.compare ile karşılaştırın
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(200).json({ message: 'Hatalı şifre. Lütfen tekrar deneyiniz.' });
        }
        return res.status(200).json({ message: 'Giriş başarılı', user });
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
})

// Signup
app.route('/signup').post(async (req, res) => {
    try {
        const { name, surname, email, password, phone } = req.body;

        // Kullanıcının e-posta adresi veritabanında zaten var mı kontrol et
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // E-posta adresi zaten kullanılıyor
            return res.status(200).json({ message: 'Bu e-posta adresi zaten kullanılıyor.' });
        }

        // Şifreyi bcrypt ile şifrele
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
        });

        await newUser.save()
        return res.status(200).json({ message: 'Kullanıcı başarıyla kaydedildi', user: newUser });

    }
    catch (error) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
})

// Add Note
app.route('/add-note').post(async (req, res) => {
    try {
        const { userId, title, description, date } = req.body;

        // Veritabanına yeni bir not eklemek için gerekli kodu burada ekleyin
        const newNote = new Note({
            userId,
            title,
            description,
            date,
        });
        // Yeni notu kaydedin
        await newNote.save();
        // Başarılı bir yanıt gönderin
        res.status(201).json({ message: 'Not başarıyla eklendi', note: newNote });
    } catch (error) {
        res.status(500).json({ message: 'Not eklenirken bir hata oluştu' });
    }
})

// Delete Note
app.route('/delete-note/:noteId').delete(async (req, res) => {
    try {
        const { noteId } = req.params
        // Notu MongoDB'den silin
        const deletedNote = await Note.findByIdAndRemove(noteId);

        if (!deletedNote) {
            return res.status(404).json({ message: 'Not bulunamadı.' });
        }

        return res.status(200).json({ message: 'Not başarıyla silindi.' });
    } catch (error) {
        console.error('Not silme hatası:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
})

// Get notes by User ID
app.route('/user-notes/:userId').get(async (req, res) => {
    try {
        const { userId } = req.params

        // Belirli bir kullanıcıya ait tüm notları MongoDB'den getirin
        const userNotes = await Note.find({ userId });

        return res.status(200).json({ notes: userNotes });
    } catch (error) {
        console.error('Notları alma hatası:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
})

// Update Note
app.route('/update-note/:noteId').put(async (req, res) => {
    try {
        const { noteId } = req.params
        const { title, description, date } = req.body

        // Güncellenecek notu MongoDB'den bulun
        const noteToUpdate = await Note.findByIdAndUpdate(
            noteId,
            { title, description, date },
            { new: true } // Güncellenmiş notu döndürmek için { new: true } ayarını kullanın
        );

        if (!noteToUpdate) {
            return res.status(404).json({ message: 'Not bulunamadı.' });
        }

        return res.status(200).json({ message: 'Not başarıyla güncellendi', updatedNote: noteToUpdate });
    } catch (error) {
        console.error('Not güncelleme hatası:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server ${port} portunda çalışıyor.`);
});
