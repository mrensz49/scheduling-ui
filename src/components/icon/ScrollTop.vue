<template>
    <CAvatar v-show="scY > 300" @click="toTop" class="scroll-top pointer" color="warning" text-color="white" size="lg">
        <CIcon icon="cil-chevron-circle-up-alt" size="xl"/>
    </CAvatar>
</template>

<script>

export default {

    name: 'ScrollTop',

    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },

    data() {
      return {
        scTimer: 0,
        scY: 0,
      }
    },

    methods: {
      handleScroll: function () {
        if (this.scTimer) return;
        this.scTimer = setTimeout(() => {
          this.scY = window.scrollY;
          clearTimeout(this.scTimer);
          this.scTimer = 0;
        }, 100);
      },
      toTop: function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      },
    },
}
</script>