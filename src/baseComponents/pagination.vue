<template>
  <nav class="my_nav">
    <ul class="pager">
      <li class="previous" :class="{disabled: preDisable}"><a @click.stop="_prePage"><span aria-hidden="true"></span> Prev</a></li>
      <li class="next" :class="{disabled: nextDisable}"><a @click.stop="_nextPage">Next <span aria-hidden="true"></span></a></li>
    </ul>
  </nav>
</template>

<script>
    export default {
        name: "pagination",
        props: {
          preDisable:{type:Boolean, default: false},
          nextDisable:{type:Boolean, default: false},
        },
        methods: {
          _prePage() {
            this.$emit('pre');
          },
          _nextPage() {
            this.$emit('next');
          }
        }
    }
</script>

<style lang="scss">
  .my_nav{width: 100%; max-width: 900px; margin: 0 auto;}
  .pager{margin: 0px;}
  .pager li>a:focus, .pager li>a:hover{cursor: pointer}
</style>
