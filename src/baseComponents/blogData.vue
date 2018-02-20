<template>
  <div class="blog">
    <div class="blog_bg_container">
      <div class="blog_bg" ref="sketch"></div>
      <div class="blog_title">{{title}}</div>
    </div>
    <div class="blog_info">
      <mu-avatar src="../../static/img/avatar/avatar.gif"/>
      <div class="blog_info_title">
        <div class="author">OPPEURO</div>
        <div class="blog_info_date">{{date}}</div>
      </div>
      <div class="blog_info_tags">
        <mu-flat-button :label="tag" :key="index" v-for="(tag, index) in tags"/>
      </div>
    </div>
    <div class="blog_data" v-html="data"></div>
  </div>
</template>

<script>
  import {baseUrl} from "../api/API_BASE";
  export default {
        name: "blog-data",
        props:{
          title: {type: String},
          date: {type: String},
          bgImgName: {type: String,default:''},
          data: {type: String},
          tags:{type: Array, default: () => {return []}}
        },
        watch: {
          bgImgName: function () {
            this.$refs.sketch.style.backgroundImage = 'url('+baseUrl + '/' + this.bgImgName + ')';
          }
        },
        mounted() {
          this.$refs.sketch.style.backgroundImage = 'url('+baseUrl +'/'+ this.bgImgName + ')'; //`url(${this.bgImg})`;
        }
    }
</script>

<style>
</style>
