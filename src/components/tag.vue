<template>
  <div class="row">
    <abstract  class="tag_blog" ref="tagBlog" :blogs="tagblogs"></abstract>
  </div>
</template>

<script>
  import {getTag} from "../api/tags";
  import abstract from "@/components/abstract"
  import pagination from "@/baseComponents/pagination"
    export default {
        name: "tag",
        components: {
          abstract,
          pagination
        },
        data() {
          return {
            tagblogs: []
          }
        },
        methods: {
          _prePage() {

          },
          _nextPage() {

          },
          _getTag(tag) {
            getTag(tag)
              .then((tagData) => {
                this.tagblogs = tagData.data;
              })
          }
        },
        created() {
          this._getTag(this.$route.params.tag);
        },
        watch: {
          '$route' : function (to, from) {
            this.tagblogs = [];
            this._getTag(this.$route.params.tag);
          }
        }

    }
</script>

<style lang="scss">
</style>
