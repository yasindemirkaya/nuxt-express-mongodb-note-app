export const state = () => ({
    isLoggedIn: false,
    userInfo: null,
});

export const getters = {
    isLoggedIn: (state) => state.isLoggedIn,
    userInfo: (state) => state.userInfo,
};

export const mutations = {
    setUser(state, user) {
        state.isLoggedIn = true;
        state.userInfo = user;
    },
    logoutUser(state) {
        state.isLoggedIn = false;
        state.userInfo = null;
    },
};

export const actions = {
    async login({ commit }, userData) {
        try {
            const response = await this.$axios.post('/login', userData);
            if (response.data.user) {
                commit('setUser', response.data.user)
            }
            return response
        } catch (error) {
            throw error
        }
    },
    async logout({ commit }) {
        try {
            commit('logoutUser');
        } catch (error) {
            throw error;
        }
    },
    async signup({ commit }, userData) {
        try {
            const response = await this.$axios.post('/signup', userData);
            if (!response.data.user) {
                return response.data
            } else {
                const user = response.data
                return user;
            }

        } catch (error) {
            throw error;
        }
    },
};
