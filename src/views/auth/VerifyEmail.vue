<script>

    import axios from 'axios';

    export default {

        name: 'VerifyEmail',

        mounted() {

            const hash = this.$route.params.hash+'?expires='+this.$route.query.expires+'&expires='+this.$route.query.expires+'?signature='+this.$route.query.signature;

            axios.get(`/api/verify-email/${this.$route.params.id}/${hash}`).then(response => {
                console.log(response)
            }).catch((errors) => {
                this.errors = errors.response.data.errors
            });

        }
    }
</script>