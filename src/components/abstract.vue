<template>
  <div class="my_card_container">
    <abstract-card
      v-for="(blog, index) in blogs"
      :key="index"
      :_id="blog._id"
      :title="blog.name"
      :date="blog.date"
      :bgImgName="blog.bgImgName"
      :tags='blog.type'
      :intro="blog.intro"
      bgImg="../../static/img/bg/BG.jpg">
    </abstract-card>
  </div>
</template>

<script>
  import abstractCard from "@/baseComponents/abstractCard"
    export default {
        name: "abstract",
        components: {
          abstractCard,
        },
        props: {
          blogs: {type: Array, default: () => {return []}}
        }
    }
</script>

<style lang="scss">
  .my_card_container{width: 100%; max-width: 900px; height: auto; margin: 0 auto; margin-top: 50px; padding-top: 40px;}
</style>
