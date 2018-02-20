<template>
  <div id="about">
    <div id="move"></div>
    <div class="blogPage" id="about_blog_page">
      <drawer-menu></drawer-menu>
      <div class="blog_container" id="about_blog">
        <div class="blogData_container">
          <div class="blog">
            <div class="blog_bg_container">
              <div class="blog_bg about_blog_bg"></div>
              <div class="blog_title">Vue学习之后的练手作品</div>
            </div>
            <div class="blog_info">
              <mu-avatar src="../../static/img/avatar/avatar.gif"/>
              <div class="blog_info_title">
                <div class="author">OPPEURO</div>
                <div class="blog_info_date">2018/1/1 上午08:20:12</div>
              </div>
            </div>
            <div class="blog_data" v-html="data"></div>
          </div>
        </div>
      </div>
      <tail></tail>
    </div>
  </div>
</template>

<script>
  import drawerMenu from "@/components/drawerMenu"
  import tail from "@/baseComponents/tail"
  import {animate} from "../api/animate";
  export default {
        name: "about",
        components: {
          drawerMenu,
          tail
        },
        data() {
          return {
            data: '<p>学习Vue之后做的个人博客，当做是学习的练手作品，从逻辑层面上讲不难，Vue确实是个不错的框架。' +
            '主要是自己的美工实力太差从头到尾一共重做了三次，每次快做好又觉得太难看把样式重新写一遍，最后面还仿着自己' +
            '觉得好看的博客样式做成现在这个样子。</p> <h3>前端</h3> <p>最后还是借用Vue的前端框架Muse，默认样式上使用' +
            '了bootstrap。确实是省事了不少而且看着还是蛮简洁的，一些前端方面的逻辑也不需要自己在重新写一遍。</p> <h3>' +
            '后台</h3> <p>数据库用的是mongodb，使用express驱动，因为是个人博客逻辑并不复杂，主要还是增删改，expr' +
            'ess+moogoose可以很好的解决这一需求。</p> <h3>可以改进的部分</h3> <ol> <li>评论系统，有时间会把评论' +
            '系统加上去。</li> <li>代码，样式写的有点杂乱，有时间在修改修改。</li> <li>主要还是懒…</li> </ol> <h3>后记' +
            '</h3> <p>前端代码：<a href="https://github.com/oppeuro/HJ_BLOG_CLIENT" target="_blank">' +
            'https://github.com/oppeuro/HJ_BLOG_CLIENT</a><br /> 后台代码：<a href="https://github.co' +
            'm/oppeuro/HJ_Blog_server" target="_blank">https://github.com/oppeuro/HJ_Blog_server</a></p>'+
            '<p><img src="../../static/img/about_blog.jpg"></p>'
          }
        },
        mounted() {
          var about_blog_page = document.getElementById('about_blog_page');
          var move = document.getElementById('move');
          animate([move],[{height:'100vh',width:'100vw',left: '100vw'}],1000);
          setTimeout(function () {
            about_blog_page.style.display = 'block';
            animate([move],[{opacity:0.9}],1000);
            animate([about_blog_page],[{opacity: 1}],1500)
          },2000)
        }

    }
</script>

<style lang="scss">
  .about_blog_bg{background-image: url("../../static/img/bg/about_bg.jpg")}
  #about_blog_page{display: none; opacity: 0;}
  #move{position: absolute;background-color: black;height: 10px;width: 60px; z-index: 100; left: 0px; opacity: 1;}
</style>
