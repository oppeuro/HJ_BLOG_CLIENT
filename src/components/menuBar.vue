<template>
  <div class="admin">
    <nav-bar class="nav-bar" @changeStatue=changeStatue></nav-bar>
    <div class="nav_bar_flex_box"></div>
    <transition  name="content">
      <content-list
        ref="content_list"
        class="content"
        v-if="content_box_show"
        :article_or_tag=article_or_tag
        :content_statue=data_statue
        @edit_new_article="edit_new_article"
        @edit_updata_article=edit_updata_article></content-list>
    </transition>
    <transition name="content">
      <div v-if="content_box_show" class="content_flex_box"></div>
    </transition>
    <div class="edit_area">
      <editor v-if="edit_reset" ref="editor" @update_content_list="update_content_list" :edit_update_articleData="update_articleData"></editor>
    </div>
  </div>
</template>

<script>
  import navBar from "@/baseComponents/navBar";
  import contentList from "@/baseComponents/contentList";
  import editor from "@/baseComponents/editor";
    export default {
        name: "menu-bar",
        components: {
          navBar,
          contentList,
          editor
        },
        data() {
          return {
            show: true,
            edit_reset: true,
            article_or_tag: true,
            content_box_show: false,
            update_articleData: null,
            data_statue: {title:'文章列表', icon:'icon-edit',add:'icon-jiajianzujianjiahao'},
          }
        },
        methods: {
          changeStatue(data) {
            if(!data.show) {
              this.content_box_show = data.show;
            }else {
              this.content_box_show = true;
              if(data.show == 'tagList') {
                this.article_or_tag = false;
                this.data_statue = {title:'标签列表', icon:'icon-tag',add:'icon-jiajianzujianjiahao'}
              }else {
                this.article_or_tag = true;
                this.data_statue = {title:'文章列表', icon:'icon-edit',add:'icon-jiajianzujianjiahao'}
              }
            }
          },
          update_content_list() {
            this.$refs.content_list._getArtilceList();
          },
          edit_updata_article(data) {
            //拿到要修改的数据，传给编辑器
            //console.log(data);
            this.update_articleData = data;
          },
          edit_new_article() {
            this.update_articleData = null;
            this.$refs.editor.clearData();
          }
        }
    }
</script>

<style lang="scss">
  .admin{position: fixed; display: flex;height: 100%;width: 100%; overflow: hidden;}
  .nav-bar{left: 0px;}
  .content{left: 75px;flex: 0 0 250px;width: 250px;border-right: 1px solid #ebebeb;}
  .nav_bar_flex_box{flex: 0 0 75px;width: 75px;}
  .content_flex_box{flex: 0 0 250px;width: 250px;}
  .edit_area{flex: 1 0;background-color: #ffffff; height: 100%;width: 100%;}
  .content-enter-active, .content-leave-active {
    transition: all 1s;
  }
  .content-enter, .content-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;transform: translateX(-250px);flex: 0 0 0;
  }
</style>
