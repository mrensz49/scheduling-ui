<script>

    import axios from 'axios';

    export default {

        name: 'VerifyEmail',

        mounted() {

            const hash = this.$route.params.hash+'?expires='+this.$route.query.expires+'?signature='+this.$route.query.signature;

            axios.interceptors.request.use(function(config) {
                const token = localStorage.getItem('scheduling_token');
                if(token) {
                    console.log('token - ', token)
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            }, function(err) {
                return Promise.reject(err);
            });

            axios.get(`/api/verify-email/${this.$route.params.id}/${hash}`).then(response => {

                if (response.data.message == 'verified') {
                    this.$router.push('/')
                }
            }).catch((errors) => {
                this.errors = errors.response.data.errors
            });

        }
    }
</script>