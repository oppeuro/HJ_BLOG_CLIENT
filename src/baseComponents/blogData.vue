<template>
  <!--<mu-card class="my_card">-->
    <!--<mu-card-media class="card_container" :title="title" :subTitle="date" >-->
      <!--<div class="card_img_size" ref="sketch"></div>-->
    <!--</mu-card-media>-->
    <!--<mu-card-text v-html="data">-->
    <!--</mu-card-text>-->
  <!--</mu-card>-->
  <div class="blog">
    <div class="blog_bg_container">
      <div class="blog_bg" ref="sketch"></div>
      <div class="blog_title">{{title}}</div>
    </div>
    <div class="blog_info">
      <mu-avatar src="../../static/IMG/avatar/avatar.gif"/>
      <div class="blog_info_title">
        <div class="author">OPPEURO</div>
        <div class="blog_info_date">{{date}}</div>
      </div>
      <div class="blog_info_tags">
        <mu-flat-button :label="tag" :key="index" v-for="(tag, index) in tagSet"/>
      </div>
    </div>
    <div class="blog_data" v-html="data"></div>
  </div>
</template>

<script>
  import {baseUrl} from "../api/article";
  export default {
        name: "blog-data",
        props:{
          title: {type: String},
          date: {type: String},
          bgImgName: {type: String,default:''},
          data: {type: String},
          tags:{type: String,default: ""}
        },
        computed: {
          tagSet() {
            return this.tags.split(',');
          }
        },
        watch: {
          bgImgName: function () {
            console.log(this.bgImgName,'url('+baseUrl + '/' + this.bgImgName + ')');
            this.$refs.sketch.style.backgroundImage = 'url('+baseUrl + '/' + this.bgImgName + ')';
          }
        },
        mounted() {
          this.$refs.sketch.style.backgroundImage = 'url('+baseUrl +'/'+ this.bgImgName + ')'; //`url(${this.bgImg})`;
        }
    }
</script>

<style lang="scss">
  pre{background-color: #23241f;font-size: 14px;  margin-top: 1em;margin-bottom: 1em; border-radius: 5px;}

  .blog{min-width: 300px; background-color: white;  margin-bottom: 60px; border-radius: 5px; box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);}
  .blog_bg_container{position: relative;}
  .blog_bg{width: 100%; height: 245px; background-size: cover; background-repeat: no-repeat; background-position: center;}
  .blog_title{position: absolute; bottom: 0; padding: 16px; color: hsl(0, 0%, 100%); font-size: 30px;}
  .blog_info{padding: 16px; background-color: white; height: 75px; overflow: hidden;
    >.mu-avatar{margin-right: 16px;}
    >.blog_info_title{display: inline-block; vertical-align: top;
      >.author{font-size: 15px; font-weight: 600;}
      >.blog_info_date{font-size: 14px; color: rgba(0,0,0,.6)}
    }
    >.blog_info_tags{float: right; margin-top: 2px;}
  }
  .blog_data{width: 90%;padding: 30px 0px 30px 0px; margin: 0  auto;
    .h1, .h2, .h3, h1, h2, h3{margin-top: 30px; margin-bottom: 15px;}
    p{line-height: 1.5; margin-bottom: 1em;}
  }
</style>
