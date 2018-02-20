<template>
  <div id="my_appbar_container" class="appbar_float">
    <mu-appbar id="my_appbar" title="HJ-BLOG">
      <mu-icon-button icon="menu" slot="left" @click="openPopup"/>
      <mu-flat-button class="appbar_btn" @click="goTo('/index')" data-link="index" label="HOME" slot="right"/>
      <mu-flat-button class="appbar_btn" @click="goTo('/tags')"   data-link="tag"   label="TAGS" slot="right"/>
      <mu-flat-button class="appbar_btn" @click="goTo('/about')" data-link="about" label="ABOUT" slot="right"/>
      <mu-flat-button class="appbar_btn" @click="admin" data-link="admin" label="ADMIN" slot="right"/>
      <mu-text-field icon="search" class="appbar-search-field"  slot="right" hintText="请输入搜索内容"/>
    </mu-appbar>
    <mu-popup position="left" popupClass="popup-left" :open="leftPopup" @close="closePopup">
      <div class="popup-left_bg">
        <div class="my_avatar">
          <mu-avatar  size="60" src="../../static/img/avatar/avatar.gif"/>
        </div>
        <mu-list class="my_info">
            <mu-list-item title="OPPEURO" :open="false" toggleNested>
              <mu-list-item slot="nested" title="OPPEURO">
                <mu-icon slot="right" value=":iconfont icon-github icon_color"/>
              </mu-list-item>
              <mu-list-item slot="nested" title="@爱搞事的HJ">
                <mu-icon slot="right" value=":iconfont icon-weibo icon_color"/>
              </mu-list-item>
              <mu-list-item slot="nested" title="479067068@QQ.com">
                <mu-icon slot="right" value=":iconfont icon-qqmw icon_color"/>
              </mu-list-item>
            </mu-list-item>
        </mu-list>
      </div>
      <div class="popup_menu">
        <mu-list @itemClick="closePopup">
          <mu-list-item title="HOME" @click="goTo('/index')">
            <mu-icon slot="left" value=":iconfont icon-home"/>
          </mu-list-item>
          <mu-list-item title="TAGS" @click="goTo('/tags')">
            <mu-icon slot="left" value=":iconfont icon-tag"/>
          </mu-list-item>
          <mu-list-item title="ABOUT" @click="goTo('/about')">
            <mu-icon slot="left" value=":iconfont icon-my"/>
          </mu-list-item>
          <mu-list-item title="ADMIN"  @click="admin">
            <mu-icon slot="left" value=":iconfont icon-edit"/>
          </mu-list-item>
        </mu-list>
      </div>
      <div class="popup_menu">
        <mu-list @itemClick="closePopup">
          <mu-list-item title="FRIEND" >
            <mu-icon slot="right" value=":iconfont icon-friendadd"/>
          </mu-list-item>
          <mu-list-item title="LIFE" >
            <mu-icon slot="right" value=":iconfont icon-quanshengmingzhouqiguanli"/>
          </mu-list-item>
        </mu-list>
      </div>
    </mu-popup>
    <login ref="login"></login>
  </div>
</template>

<script>
  import '@/assets/font/iconfont.css'
  import login from '@/baseComponents/login'
    export default {
      name: "nav-br",
      components: {
        login
      },
      data () {
        return {
          leftPopup: false,
          dialog: false,
        }
      },
      methods: {
        goTo(link) {
          this.$router.push(link);
        },
        openPopup() {
          this.leftPopup = true;
        },
        closePopup() {
          this.leftPopup = false;
        },
        admin() {
          if(this.getCookie('HJ_BLOG_USER')) {
            this.$router.push('/admin');
          }else {
            this.$refs.login.dialog = true;
          }
        }
      },
      mounted() {
        // window.addEventListener('mousewheel', (e) => {
        //   var my_appbar_container = document.getElementById('my_appbar_container');
        //   console.log(e,1)
        //   if(my_appbar_container && e.deltaY > 0) {
        //     my_appbar_container.style.transform = 'translate3d(0,-100%,0)'
        //   }else {
        //     my_appbar_container.style.transform = 'translate3d(0,0,0)'
        //   }
        // })
      }
    }
</script>

<style lang="scss">
  /*.appbar_float{*/
    /*position: fixed;width: 100%;top:0px;z-index: 1000; transition: all .3s;*/
    /*transform: translate3d(0,0,0);*/
  /*}*/
  #my_appbar{background-color: transparent; color: black; box-shadow: none;
    @media (max-width: 905px) {
      .appbar_btn,.appbar-search-field{display: none;}
    }
  }
  .appbar_btn{padding-left: 20px;padding-right: 20px;}
  .appbar-search-field{
    color: #FFF;
    margin-bottom: 0;
    &.focus-state {
      color: #FFF;
    }
    .mu-text-field-hint {
    }
    .mu-text-field-input {
      color: #FFF;
    }
    .mu-text-field-focus-line {
      background-color: #FFF;
    }
  }
  .popup-left{height: 100%; width: 256px;}
  .popup-left_bg{position: relative; height: auto; width: 256px;
    background-color: coral;
      >.my_avatar{position: relative; top:30px; left: 20px; height: 100px;}
      >.my_info{top: 8px; width: 100%;height: 100%; color: white;overflow: hidden;
        .mu-list{background-color: #f5f5f5;}
        .icon_color{color: #5c6bc0;}
      }
  }
  .popup_menu{padding-top: 10px;padding-bottom: 10px; border-bottom: 1px solid #ebebeb;}
</style>
