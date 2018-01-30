<template>
  <div>
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
    <tail></tail>
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
                console.log(getData.data)
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

<style lang="scss">
  .blog_container{width: 90%;margin: 0 auto;}
  .blogData_container{width: 100%; max-width: 900px; margin: 0 auto; margin-top: 50px; padding-top: 40px; }
  @media (max-width: 905px) {
    .blog_container{width: 92%;}
  }
  @media (max-width: 600px) {
    .blog_container{width: 95%;}
  }
</style>
