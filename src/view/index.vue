<template>
  <div class="indexPage">
    <drawer-menu></drawer-menu>
    <div class="container">
      <div class="row">
        <abstract class="abstract_blog" ref="abstractBlog" :blogs="blogs"></abstract>
        <pagination v-if="blogNum > 5" :preDisable="page <= 0" :nextDisable="(page+1)*5 > blogNum" @pre="_prePage" @next="_nextPage"></pagination>
      </div>
    </div>
    <tail></tail>
  </div>
</template>

<script>
  import {getArticleList,getArticleNum} from "../api/article";
  import drawerMenu from "@/components/drawerMenu"
  import abstract from "@/components/abstract"
  import tail from "@/baseComponents/tail"
  import pagination from "@/baseComponents/pagination"
    export default {
      name: "index",
      components: {
        drawerMenu,
        abstract,
        tail,
        pagination
      },
      data() {
        return {
          blogNum : 0,
          page: 0,
          blogs: [],
        }
      },
      watch: {
        '$route': function(to, from) {
          this.blogs = [];
          this.page = this.$route.params.page ? parseInt(this.$route.params.page) : 0;
          this._getArticleList();
          this._getArticleNum();
        }
      },
      methods: {
        _prePage() {
          if(this.page == 0) {
            return;
          }
          this.page--;
          this.$router.push('/index/page/'+this.page);
        },
        _nextPage() {
          if ((this.page + 1) * 5 > this.blogNum){
            return;
          }
          this.page++;
          this.$router.push('/index/page/'+this.page);
        },
        _getArticleNum() {
          getArticleNum()
            .then((res) => {
              this.blogNum = res.data.num;
            })
        },
        _getArticleList() {
          getArticleList({page: this.page, pageSize: 5})
            .then((blogData) => {
              this.blogs = blogData.data;
              this.$nextTick(() => {
                this.$refs.abstractBlog.$el.style.top = '0px';
                this.$refs.abstractBlog.$el.style.opacity = 1;
              })
            })
        }
      },
      created() {
        this.page = this.$route.params.page ? parseInt(this.$route.params.page) : 0;
        this._getArticleList();
        this._getArticleNum();
      }
    }
</script>

<style lang="scss">
  .indexPage{position: relative; min-height: 100vh;
    background-image: url('../../static/img/bg/container_bg.jpg');background-attachment: fixed;
    background-repeat: no-repeat; background-position: center;  background-size: cover;}
  .container{width: 90%; margin: 0 auto; padding-bottom: 180px;}
  .abstract_blog{position: relative; top: 50px; opacity: 0; transition: all .6s;}

  @media (max-width: 905px) {
    .container{width: 92%;}
  }
  @media (max-width: 600px) {
    .container{width: 95%;padding-bottom: 210px;}
  }
</style>
