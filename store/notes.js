const state = () => ({
    notes: []
});

// Mutations: State'i değiştirmek için kullanılır
const mutations = {
    SET_NOTES(state, note) {
        state.notes = note;
    },
    ADD_NOTE(state, note) {
        state.notes.push(note);
    },
    DELETE_NOTE(state, index) {
        state.notes.splice(index, 1);
    },
    UPDATE_NOTE(state, { index, updatedNote }) {
        state.notes[index] = updatedNote;
    },
    REMOVE_NOTE(state, noteId) {
        const index = state.notes.findIndex((note) => note._id === noteId);
        if (index !== -1) {
            state.notes.splice(index, 1);
        }
    },
};

// Actions: Asenkron işlemler ve API çağrıları için kullanılır
const actions = {
    async fetchUserNotes({ commit }, userId) {
        try {
            const response = await this.$axios.get(`/user-notes/${userId}`)
            const notes = response.data.notes
            commit('SET_NOTES', notes)
        } catch (error) {
            console.error('Notları getirme hatası: ', error)
        }
    },
    async removeNote({ commit }, noteId) {
        try {
            const response = await this.$axios.delete(`/delete-note/${noteId}`)
            commit('REMOVE_NOTE', noteId);
            return response
        } catch (error) {
            console.error('Notu silerken hata: ', error)
            return response
        }
    },
    async addNewNote({ commit }, note) {
        try {
            const response = await this.$axios.post('/add-note', note)
            commit('ADD_NOTE', response.data.note)
            return response
        } catch (error) {
            console.error('Notu eklerken hata: ', error)
            return response
        }
    },
    async modifyNote({ commit }, { index, updatedNote, noteId }) {
        try {
            const response = await this.$axios.put(`/update-note/${noteId}`, updatedNote)
            if (response.data.updatedNote) {
                commit('UPDATE_NOTE', { noteId, updatedNote: response.data.note })
                return response
            } else {
                return response
            }
        } catch (error) {
            console.error('Notu güncellerken hata: ', error)
            return response
        }
    },
};

// Getters: State'den veri okumak için kullanılır
const getters = {
    userNotes: (state) => state.notes
};

export default {
    state,
    mutations,
    actions,
    getters,
};
