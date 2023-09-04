<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title text-center">Notlarım</h2>
          </div>
          <div class="card-body text-center">
            <button @click="showAddNoteForm" class="btn btn-primary mb-3">Not Ekle</button>
            <button @click="listNotes" class="btn btn-info mb-3">Notları Listele</button>

            <div v-if="showAddNote">
              <h3 class="mb-3">Not Ekle</h3>
              <form @submit.prevent="addNote">
                <div class="mb-3">
                  <label for="noteTitle" class="form-label">Not Başlığı</label>
                  <input type="text" id="noteTitle" v-model="newNote.title" class="form-control" required />
                </div>

                <div class="mb-3">
                  <label for="noteContent" class="form-label">Not İçeriği</label>
                  <textarea id="noteContent" v-model="newNote.description" class="form-control" rows="4" required></textarea>
                </div>

                <div class="mb-3">
                  <label for="noteDate" class="form-label">Not Tarihi</label>
                  <input type="date" id="noteDate" v-model="newNote.date" class="form-control" required />
                </div>

                <button type="submit" class="btn btn-success">Not Ekle</button>
              </form>
            </div>

            <!-- Notlar Listesi -->
            <div v-if="showNoteList">
              <h3 class="mb-3">Notlar Listesi</h3>
              <div class="row">
                <div class="col-md-12" v-for="(note, index) in userNotes" :key="index">
                  <div class="card mb-3">
                    <div class="card-body">
                      <h5 class="card-title">{{ note.title }}</h5>
                      <p class="card-text">{{ note.description }}</p>
                      <p class="card-text">
                        <small class="text-muted">{{ note.date }}</small>
                      </p>
                      <div class="btn-group">
                        <button @click="editNote(index)" class="btn btn-primary">Notu Düzenle</button>
                        <button @click="deleteNote(note._id)" class="btn btn-danger">Notu Sil</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
  import { mapActions, mapGetters, mapState } from 'vuex';

  export default {
    data() {
      return {
        showAddNote: false,
        showNoteList: false,
        newNote: {
          title: '',
          description: '',
          date: ''
        }
      };
    },
    computed: {
      ...mapGetters({ userInfo: 'user/userInfo', }),
      ...mapGetters({ userNotes: 'notes/userNotes', }),
    },
    methods: {
      ...mapActions('notes', ['addNewNote', 'removeNote', 'modifyNote', 'fetchUserNotes']),

      // Not ekleme formunu açar
      showAddNoteForm() {
        this.showAddNote = true;
        this.showNoteList = false;
      },
      // Not güncelleme formunu açar
      editNote(index) {
        if (index >= 0 && index < this.userNotes.length) {
          const editedNote = this.userNotes[index];
          this.newNote = { ...editedNote };
          this.showAddNote = true;
          this.showNoteList = false;
        }
      },
      // Notları listeler
      async listNotes() {
        this.showAddNote = false;
        this.showNoteList = true;
        await this.fetchUserNotes(this.userInfo._id)
      },
      // Duruma göre ekleme ya da güncelleme yapar
      async addNote() {
        if (this.newNote._id) {
          const response = await this.modifyNote({ index: index, updatedNote: this.newNote, noteId: this.newNote._id });

          alert(response.data.message)
        } else {
          try {
            const newNote = {
              title: this.newNote.title,
              description: this.newNote.description,
              date: this.newNote.date,
              userId: this.userInfo._id,
            };

            const response = await this.addNewNote(newNote);

            alert(response.data.message);

            this.newNote.title = '';
            this.newNote.description = '';
            this.newNote.date = '';
          } catch (error) {
            alert('Not eklerken bir hata oluştu.');
            console.error('Not ekleme hatası:', error);
          }
        }
      },
      // Seçilen notu siler
      async deleteNote(noteId) {
        try {
          const response = await this.removeNote(noteId);
          if (response.data.message) {
            alert(response.data.message);
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          console.error('Notu silerken bir hata oluştu:', error);
        }
      },
    },
  };
</script>
