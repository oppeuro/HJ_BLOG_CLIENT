<template>
  <div class="content-list">
    <div class="title">
      <i :class="content_statue.icon" class="iconfont"></i>
      {{content_statue.title}}
      <i :class="content_statue.add" class="iconfont" @click="add_articleOrTag"></i>
    </div>
    <div class="dataList">
      <ul class="article_data_container" v-if="article_or_tag">
        <li class="article_data" v-for="item in dataList" @click=edit_updata_article(item)>
          <p class="article_title"><strong>{{item.name}}</strong></p>
          <p class="article_post_time">{{item.date}}</p>
        </li>
        <li class="blank"></li>
      </ul>
      <ul class="tag_data" v-if="!article_or_tag">
        <li v-for="item in dataList" @click="">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {getArticleList} from "../api/article"

  export default {
        name: "list",
        props: {
          article_or_tag:{type: Boolean,default:true},
          content_statue:{type: Object,default:null},
        },
        data() {
          return {
            dataList: [],
          }
        },
        methods: {
          _getArtilceList() {
            getArticleList()
              .then((data) => {
                this.dataList = data.data;
              })
              .catch(function (err) {

              })
          },
          add_articleOrTag() {
            this.article_or_tag ? (this.$emit('edit_new_article')) : (this.$emit('edit_new_tag'));
          },
          edit_updata_article(article_data) {
            this.$emit('edit_updata_article',article_data);
            return;
          }
        },
        created() {
          this._getArtilceList();
        },
        mounted() {

        }

    }
</script>

<style lang="scss">
    .content-list{position: fixed; width: 250px; z-index: 1; height: 100%;background-color: rgb(255, 255, 255); color: #7d7d7d;
      .title{height: 50px; width: 100%;background-color: #ffffff;border-bottom: 1px solid rgba(70, 70, 70, 0.16); padding-left: 20px; line-height: 50px;font-size: 18px;
        >.iconfont{font-size: 18px;padding-right: 5px;}
        >.icon-jiajianzujianjiahao{float: right; padding-right: 10px; color: #ffb26d; font-size: 16px;
          &:hover{cursor: pointer;}
        }
      }
      .dataList{height: 95%;
        ::-webkit-scrollbar
        {
          width: 0px;
          height: 0px;
          background-color: #F5F5F5;
        }
        .article_data_container{height: 100%; width: 100%;overflow-y: scroll;
          >.article_data{padding: 20px;
            &:hover{background-color: #ff8c5f;cursor: pointer;
              >.article_title,.article_post_time{color: #ffffff;}
            }
            /*<!--&:before{content: ""; border-top: 1px solid #ebe9e4; width: 100%; display: block;position: relative; top: -21px;}-->*/
            >.article_title{font-size: 18px; color: #5bbbff;}
            >.article_post_time{font-size: 14px;color: #000000;}
          }
          >.blank{height: 30px;}
        }
      }
    }

</style>
