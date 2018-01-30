<template>
  <div>
    <mu-appbar class="my_appbar" title="HJ-BLOG">
      <mu-icon-button icon="menu" slot="left" @click="openPopup"/>
      <mu-flat-button class="appbar_btn" @click="goTo('/index')" data-link="index" label="HOME" slot="right"/>
      <mu-flat-button class="appbar_btn" @click="goTo('/tag')"   data-link="tag"   label="TAGS" slot="right"/>
      <mu-flat-button class="appbar_btn" @click="goTo('/about')" data-link="about" label="ABOUT" slot="right"/>
      <mu-flat-button class="appbar_btn" @click="goTo('/admin')" data-link="admin" label="ADMIN" slot="right"/>
      <mu-text-field icon="search" class="appbar-search-field"  slot="right" hintText="请输入搜索内容"/>
    </mu-appbar>
    <mu-popup position="left" popupClass="popup-left" :open="leftPopup" @close="closePopup">
      <div class="popup-left_bg">
        <div class="my_avatar">
          <mu-avatar  size="60" src="../../static/IMG/avatar/avatar.gif"/>
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
          <mu-list-item title="HOME" >
            <mu-icon slot="left" value=":iconfont icon-home"/>
          </mu-list-item>
          <mu-list-item title="TAGS" >
            <mu-icon slot="left" value=":iconfont icon-tag"/>
          </mu-list-item>
          <mu-list-item title="ABOUT" >
            <mu-icon slot="left" value=":iconfont icon-my"/>
          </mu-list-item>
          <mu-list-item title="ADMIN" >
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
  </div>
</template>

<script>
  import '@/assets/font/iconfont.css'
    export default {
      name: "nav-br",
      data () {
        return {
          leftPopup: false,
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
        }
      }
    }
</script>

<style lang="scss">
  .my_appbar{background-color: transparent; color: black; box-shadow: none;}
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
    /*background: url("../../static/IMG/bg/BG.jpg") no-repeat center; background-size: cover;*/
      >.my_avatar{position: relative; top:30px; left: 20px; height: 100px;}
      >.my_info{top: 8px; width: 100%;height: 100%; color: white;overflow: hidden;
        .mu-list{background-color: #f5f5f5;}
        .icon_color{color: #5c6bc0;}
      }
  }
  .popup_menu{padding-top: 10px;padding-bottom: 10px; border-bottom: 1px solid #ebebeb;}
  @media (max-width: 905px) {
    .appbar_btn,.appbar-search-field{display: none;}
  }
</style>
