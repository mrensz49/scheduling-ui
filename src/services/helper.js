import { defineStore } from 'pinia'

export const useHelperStore = defineStore({

    id: 'helper',

    state: () => ({
        confirm: 0,
    }),

    actions: {

        confirmDelete(id) {
            this.confirm = id
        }
    }
})