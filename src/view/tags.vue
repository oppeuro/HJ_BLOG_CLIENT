<template>
  <div class="tags">
    <drawer-menu></drawer-menu>
    <div class="tagsContainer container">
      <router-view></router-view>
    </div>
    <tail></tail>
  </div>
</template>

<script>
  import {getTagList,getTag} from "../api/tags";
  import drawerMenu from "@/components/drawerMenu"
  import tail from "@/baseComponents/tail"
    export default {
      name: "tags",
      components: {
        drawerMenu,
        tail
      },
      data() {
        return {
          tagsOrTag: false,
          tagsList: [],
          tagblogs: []
        }
      },
      methods: {
        _gotoTag(tagName) {
          this.$router.push('/tags/'+tagName);
        },
        _tagsOrTag() {
          let routeParma = this.$route.params.tag;;
          if(!routeParma) {
            this.tagsOrTag = true;
            this._getTagList();
          }else {
            this.tagsOrTag = false;
            this._getTag(routeParma);
          }
        },
        _getTagList() {
          getTagList()
            .then((tagsData) => {
              Object.keys(tagsData.data).forEach((val) => {
                this.tagsList.push([val,tagsData.data[val]])
              })
              this.tagsList.sort((a, b) => {
                return b[1] - a[1];
              })
            })
        },
        _getTag(tag) {
          getTag(tag)
            .then((tagData) => {
              this.tagblogs = tagData.data;
            })
        }
      },
      created() {
        this._tagsOrTag();
      },
      watch: {
        '$route': function(to, from){
          this.tagsList = [];
          this.tagblogs = [];
          this._tagsOrTag();
        }
      }

    }
</script>

<style lang="scss">
  .tags{position: relative; min-height: 100vh;
    background-image: url('../../static/img/bg/container_bg.jpg');background-attachment: fixed;
    background-repeat: no-repeat; background-position: center;  background-size: cover;}
  .tagsContainer{padding-bottom: 180px; width: 85%;}
</style>
