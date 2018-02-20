<template>
  <div class="row">
    <div class="tagList">
      <mu-raised-button
        class="tagButton"
        :key="index"
        @click="_gotoTag(tag[0])"
        v-for="(tag, index) in tagsList">{{tag[0]}}</mu-raised-button>
    </div>
  </div>
</template>

<script>
  import {getTagList} from "../api/tags";
    export default {
        name: "tagList",
        data() {
          return {
            tagsList: [],
          }
        },
        methods: {
          _gotoTag(tagName) {
            this.$router.push('/tags/'+tagName);
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
        },
        created() {
          this._getTagList();
        }
    }
</script>

<style lang="scss">
  .tagList{margin-top: 40px; min-height: 200px; padding: 40px; padding-right: 20px; background-color: rgba(70, 70, 70, 0.2);
      >.tagButton{margin: 20px; margin-left: 30px; margin-right: 10px;}
  }
</style>
