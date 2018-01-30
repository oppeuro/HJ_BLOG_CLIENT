<template>
  <div class="tailContainer">
    <p>Copyright © 2018  HJ BLOG</p>
    <p><a href="http://www.miitbeian.gov.cn/">桂ICP备18000545号</a></p>
    <p>Powered by <a href="https://www.aliyun.com/">aliyun</a></p>
  </div>
</template>

<script>
    export default {
        name: "tail"
    }
</script>

<style lang="scss">
  .tailContainer{background-color: #fff; padding:40px;height: 120px; width: 100%; margin-top: 60px;
    p{float: left; width: 33.3%;text-align: center;line-height: 40px;height: 40px;
      &:first-child{text-align: right;}
      &:last-child{text-align: left;}
      a{color: #ff4081;display: inline-block;
        &:after{content: "";transition: all 0.5s;transform: scaleX(0); position: relative; top: -10px; display: block; border-bottom: 1px solid #ff4081;}
        &:hover{color: #ff4081;text-decoration: none;}
        &:hover:after{transform: scaleX(1);}
      }
    }
  }

</style>
