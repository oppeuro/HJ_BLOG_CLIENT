<template>
  <mu-card class="my_card">
    <!--<mu-card-header title="OPPEURO" subTitle="TIME IS MONEY">-->
      <!--<mu-avatar src="../../static/IMG/avatar/avatar.gif" slot="avatar"/>-->
    <!--</mu-card-header>-->
    <div @click="_gotoBlog">
      <mu-card-media class="card_container" :title="title" :subTitle="date" >
        <div class="card_img_size" ref="sketch"></div>
        <!--<img class="card_img" src="../../static/IMG/bg/BG.jpg" alt="">-->
      </mu-card-media>
    </div>
    <mu-card-text>
      {{intro}}
    </mu-card-text>
    <mu-card-actions>
      <mu-flat-button v-for="(tag, index) in type" :key="index"  :label="tag" @click="_gotoTag(tag)"/>
    </mu-card-actions>
    <!--<mu-card-header title="OPPEURO" subTitle="TIME IS MONEY">-->
    <!--<mu-avatar src="../../static/IMG/avatar/avatar.gif" slot="avatar"/>-->
    <!--</mu-card-header>-->
  </mu-card>
</template>

<script>
  import {baseUrl} from "../api/API_BASE";
    export default {
        name: "abstract-card",
        props:{
          _id: {type: String},
          title: {type: String},
          date: {type: String},
          bgImgName: {type: String, default: ""},
          intro: {type: String},
          tags: {type: Array, default: () => {return []}}
        },
        methods: {
          _gotoBlog() {
            this.$router.push('/blog/' + this._id)
          },
          _gotoTag(tag) {
            this.$router.push('/tags/' + tag)
          }
        },
        computed: {
          type: function () {
            return [...this.tags];
          }
        },
        watch: {
          bgImgName : () => {
            this.$refs.sketch.style.backgroundImage = 'url('+baseUrl + "/"+ this.bgImgName + ')';
          }
        },
        mounted() {
          this.$refs.sketch.style.backgroundImage = 'url('+baseUrl + "/"+ this.bgImgName + ')';
        }
    }
</script>

<style lang="scss">
  .my_card{ margin-bottom: 60px; background-color: rgba(255, 255, 255, 0.70);}
  .card_container{&:hover{cursor: pointer;}}
  .card_img_size{height: 245px; background-repeat:no-repeat; background-position: center; background-size: cover;}
</style>
