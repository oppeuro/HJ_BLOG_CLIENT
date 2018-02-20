<template>
  <div class="blogPage">
    <drawer-menu></drawer-menu>
    <div class="blog_container">
      <div class="blogData_container">
        <blog-data :data="blogData.data"
                   :title="blogData.name"
                   :date="blogData.date"
                   :tags="blogData.type"
                   :bgImgName="blogData.bgImgName"
        ></blog-data>
      </div>
    </div>
    <tail v-show="blogData.name"></tail>
  </div>
</template>

<script>
  import {getArticle} from "../api/article";
  import drawerMenu from "@/components/drawerMenu"
  import blogData from "@/baseComponents/blogData"
  import tail from "@/baseComponents/tail"
    export default {
        name: "blog",
        components: {
          drawerMenu,
          blogData,
          tail
        },
        data() {
          return {
            blogData: {},
          }
        },
        methods: {
          _getArticle(id) {
            getArticle(id)
              .then((getData) => {
                this.blogData = getData.data
              })
          }
        },
        created() {
          this._getArticle(this.$route.params._id);
        },
        mounted() {
        }
    }
</script>

<style>
</style>
