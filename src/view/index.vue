<template>
  <div >
    <drawer-menu></drawer-menu>
    <div class="container">
      <div class="row">
        <abstract :blogs="blogs"></abstract>
        <nav class="my_nav">
          <ul class="pager">
            <li class="previous"><a @click.stop="_gotoPage"><span aria-hidden="true"></span> Prev</a></li>
            <li class="next"><a @click.stop="_gotoPage">Next <span aria-hidden="true"></span></a></li>
          </ul>
        </nav>
      </div>
    </div>
    <tail></tail>
  </div>
</template>

<script>
  import {getArticleList} from "../api/article";
  import drawerMenu from "@/components/drawerMenu"
  import abstract from "@/components/abstract"
  import tail from "@/baseComponents/tail"
    export default {
      name: "index",
      components: {
        drawerMenu,
        abstract,
        tail
      },
      data() {
        return {
          page: 0,
          blogs: [],
        }
      },
      methods: {
        _gotoPage(page) {

        },
        _getArticleList() {
          getArticleList({page: this.page, pageSize: 5})
            .then((blogData) => {
              this.blogs = blogData.data;
              console.log(this.blogs)
            })
        }
      },
      created() {
        this._getArticleList()
      }

    }
</script>

<style lang="scss">
  .container{width: 90%; margin: 0 auto;}
  .my_nav{width: 100%; max-width: 900px; margin: 0 auto;}
  .pager{margin: 0px;}
  .pager li>a:focus, .pager li>a:hover{cursor: pointer}
  @media (max-width: 905px) {
    .container{width: 92%;}
  }
  @media (max-width: 600px) {
    .container{width: 95%;}
  }
</style>
