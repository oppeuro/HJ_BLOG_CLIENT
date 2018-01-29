<template>
  <div class="admin-nav">
    <div class="avatar"></div>
    <ul ref="menu" @click=addClass>
      <li :id=item.name :class=item.class class="iconfont" v-for="item in menuList"></li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "admin-menubar",
        data() {
          return {
            menuList: [{name:'articleList',class:'icon-files'},{name:'tagList',class:'icon-tag1'},{name:'out',class:'icon-previous'}]
          }
        },
        methods: {
          addClass(e) {
            let liList = this.$refs.menu.getElementsByTagName('li');
            for(let li of liList) {
              li.className = li.className.replace(/\s*active/,"");
            }
            if(e.target == this.$refs.menu) {
              this.$emit('changeStatue',{show:false});
              return;
            }else if(e.target == liList[2]) {
              this.$router.push('/');
              return;
            }else{
              e.target.className += ' active';
              this.$emit('changeStatue',{show:e.target.id});
            }
          }
        }
    }
</script>

<style>
  .admin-nav{z-index: 2;}
</style>
