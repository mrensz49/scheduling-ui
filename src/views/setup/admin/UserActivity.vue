<template>
<div class="container">
    <div class="row">
        <div class="col-md-10 timeline">
            <ul class="cbp_tmtimeline">
                <template v-for="datas in userStore.activities" :key="datas">
                    <li v-for="data in datas" :key="data.id">
                        <time class="cbp_tmtime" :datetime="data.created_at"><span>{{ helperStore.getHumanDate(data.created_at) }}</span> <span>{{ helperStore.getHumanTime(data.created_at) }}</span></time>
                        <div class="cbp_tmicon">
                            <img src="@/assets/images/avatars/avatar7.png" alt="Admin" class="rounded-circle" width="40">
                        </div>

                        <div class="cbp_tmlabel">
                            <h2><span class="text-primary fw-semibold">
                                {{ data.visitor?.name ? data.visitor?.name : type(data.url, data.request)}}
                            </span></h2>
                            <div><span class="fw-semibold">URL :</span> {{ data.url }}</div>
                            <div><span class="fw-semibold">Device :</span> {{ data.device }}</div>
                            <div><span class="fw-semibold">Platform :</span> {{ data.platform }}</div>
                            <div><span class="fw-semibold">IP :</span> {{ data.ip }}</div>
                        </div>
                    </li>
                </template>
            </ul>
            <p class="text-center">
                <CSpinner color="primary" component="span" size="xl" aria-hidden="true" v-if="userStore.loading"/>
            </p>
        </div>
    </div>
    <scroll-top/>
</div>

</template>

<script>

import { useUserStore } from '@/store/user'
import { useHelperStore } from '@/services/helper'

const userStore = useUserStore()
const helperStore = useHelperStore()


export default {

    mounted() {
        userStore.fetchUsersActivity(1)
        this.processInfiniteScroll()
    },

    data() {
        return {
            userStore: userStore,
            helperStore: helperStore,

            temp_current_page: ''
        }
    },

    methods: {

        processInfiniteScroll() {
            window.addEventListener('scroll', () => {
                if ((window.innerHeight + Math.round(window.scrollY) + 1) >= document.body.offsetHeight) {
                    if (this.temp_current_page != userStore.current_page) {
                        userStore.fetchUsersActivity(userStore.current_page)
                    }
                    this.temp_current_page = userStore.current_page
                }
            })
        },

        type(string, request) {

            if (string.indexOf('login') !== -1)
                return JSON.parse(request).email + ' - login'
            else
                return ''
        }
    },

}

</script>