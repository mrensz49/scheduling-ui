import { defineStore } from 'pinia'
import { useMemberStore } from '@/store/member'
import {
    regions,
    provinces,
    cities,
    barangays,
} from "select-philippines-address";

const memberStore = useMemberStore()

export const useAddressStore = defineStore({

    id: 'addresses',

    state: () => ({
        regions: {},
        provinces: {},
        cities: {},
        barangays: {},
    }),

    getters: {
    },

    actions: {

        fetchRegions() {
            regions().then((region) => {
                this.regions = region
            });
        },

        fetchProvinces(code) {
            if (code) {
                provinces(code).then((province) => {
                    this.provinces = province
                });
            }
        },

        fetchCities(code) {
            if (code) {
                cities(code).then((city) => {
                    this.cities = city
                });
            }
        },

        fetchBrgys(code) {
            if (code) {
                barangays(code).then((barangay) => {
                    this.barangays = barangay
                    memberStore.def_brgys = barangay
                });
            }
        }
    }

})