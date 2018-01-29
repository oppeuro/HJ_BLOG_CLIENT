<template>
  <div  class="admin">
    <mu-drawer class="my_stdio" :open=true :docked=true width="75">
      <mu-list>
        <div class="my-icon"></div>
        <ul class="menu-list" ref="menu" @click="addClass">
          <li id="blogList"><mu-icon-button  icon=":iconfont icon-files"/></li>
          <li id="tagList"><mu-icon-button  icon=":iconfont icon-tag"/></li>
          <li class="previous"><mu-icon-button  icon=":iconfont icon-previous"/></li>
        </ul>
      </mu-list>
    </mu-drawer>
    <div class="nav_bar_flex_box"></div>
    <mu-drawer class="content_container" :open=content_open :docked=true width="250" >
      <content-list
        v-if="content_box_show"
        :article_or_tag=article_or_tag
        :content_statue=data_statue>
      </content-list>
    </mu-drawer>
    <transition name="content">
      <div v-if="content_box_show" class="content_flex_box"></div>
    </transition>
    <div class="edit_area">
      <editor v-if="edit_reset"
              ref="editor"
              @update_content_list="update_content_list"
              :edit_update_articleData="update_articleData">
      </editor>
    </div>
  </div>
</template>

<script>
  import contentList from "@/baseComponents/contentList"
  import editor from "@/baseComponents/editor";
    export default {
        name: "admin",
        components: {
          contentList,
          editor
        },
        data() {
          return {
            edit_reset: true,
            content_open: false,
            article_or_tag: true,
            content_box_show: false,
            data_statue: {title:'文章列表', icon:'icon-edit',add:'icon-jiajianzujianjiahao'},
          }
        },
        methods: {
          addClass(e) {
            let liList = this.$refs.menu.getElementsByTagName('li');
            for(let li of liList) {
              li.className = li.className.replace(/\s*active/,"");
            }
            if(e.target == this.$refs.menu) {
              this.changeStatue({show:false});
              this.content_open = false;
              return;
            }else if(e.path[3] == liList[2]) {
              this.$router.push('/');
              return;
            }else{
              e.path[3].className += ' active';
              this.content_open = true;
              this.changeStatue({show:e.path[3].id});
            }
          },
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
          show_dataList() {

          }
        }

    }
</script>

<style lang="scss">
  .admin{position: fixed; display: flex;height: 100%;width: 100%; overflow: hidden;}
  .my_stdio,.content_container{box-shadow: none; border-right: 1px solid #ebebeb;}
  .my_stdio{background-color: #f5f5f5;
    .mu-list{height: 100%; overflow: hidden;}
    .my-icon{width: 50px;height: 50px; margin: 0 auto; margin-top: 30px; margin-bottom: 25px;
      background: url("../../static/IMG/avatar/avatar.gif") no-repeat center;background-size: 50px;
      border-radius: 50px;
      &:after{position: relative; top: 75px; content: ""; display: block; border-bottom: 1px solid #b9b9b9;}
    }
    .menu-list{list-style: none; height: 100%;  padding: 0; text-align: center;margin: 0; padding-top: 30px;
      >li{width: 50px; height: 50px; border-radius: 50px;color: #00cd1d;
        margin: 0 auto; margin-top: 50px; background-color: #fff;
        &:hover{border: 1px solid #02cd01;}
      }
      >.active{border: 1px solid #02cd01;}
    }
    .previous{position: fixed;bottom: 30px;left: 12.5px;}
  }
  .nav_bar_flex_box{flex: 0 0 75px;width: 75px;}
  .content_flex_box{flex: 0 0 250px;width: 250px;}
  .content_container{left: 75px; z-index: 1;}
  .edit_area{flex: 1 0;background-color: #ffffff; height: 100%;width: 100%;}
  .content-enter-active, .content-leave-active {
    transition: all .2s;
  }
  .content-enter, .content-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;transform: translateX(-250px);flex: 0 0 0px;
  }
  @media (max-height:500px) {
    .previous{display: none;}
  }
</style>
