import { defineStore } from 'pinia'

export const useHelperStore = defineStore({

    id: 'helper',

    state: () => ({
        loading_delete: false,
        loading: false,
        confirm: 0,
        errors: {},

        visibleModalSongsMeeting: false,
    }),

    actions: {

        confirmDelete(id) {
            this.confirm = id
        }
    }
})