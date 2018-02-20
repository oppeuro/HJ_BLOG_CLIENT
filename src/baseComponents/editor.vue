<template>
  <div class="editor_container">
    <label for="input_article_title" class="editor_article_title">
      <i class="iconfont icon-biaoti"></i>
      <input id="input_article_title" type="text" v-model="title">
      <div class="btn btn-danger" id="delete" :disabled=!prop_edit_update_articleData @click="prop_edit_update_articleData && wait('_deleteArticle')">删除文章</div>
      <mu-checkbox label="置顶" class="my_checkbox" v-model="top"/>
    </label>
    <label  class="editor_article_tag_submit">
      <i class="iconfont icon-tag"></i>
      <input id="input_article_tag" type="text" v-model="tag">
      <div id="article_control">
        <div class="btn btn-primary" :disabled=prop_edit_update_articleData id="submit" @click="!prop_edit_update_articleData && validation() && wait('_uploadArticle')">发布文章</div>
        <div class="btn btn-success" :disabled=!prop_edit_update_articleData id="updata" @click="prop_edit_update_articleData && validation() && wait('_updateArticle')">更新文章</div>
        <label class="btn btn-success">
            <span>上传</span>
            <input id="input_file" type="file">
        </label>
      </div>
    </label>
    <label class="editor_article_summary">
      <i class="iconfont icon-summary"></i>
      <input id="input_article_summary" type="text" v-model="summary">
      <div class="btn btn-info" id="summary" @click="_addSummary">添加摘要</div>
    </label>
    <div class="editor_article_summary_container">
      <mavon-editor
        class="markdown_editor"
        @change="getValue"
        v-model="article_value"></mavon-editor>
    </div>
    <div id="shadowLayer" v-show="shadowShow" @click="shadowShow = false">
      <div class="summary_container"  @click.stop=''>
        <mavon-editor
          class="summary_editor"
          :code_style = code_style
          @change="getSummaryValue"></mavon-editor>
      </div>
    </div>
    <mu-dialog :open="dialog" title="ALERT">
      {{alert_meg}}
      <mu-flat-button label="取消" slot="actions" primary @click="makeSure(false)"/>
      <mu-flat-button label="确定" slot="actions" primary @click="makeSure(true)"/>
    </mu-dialog>
    <mu-toast v-if='toast' :message="toastMsg"/>
  </div>
</template>

<script>
  import {updateArticle,uploadArticle,uploadImg,deleteArticle} from "@/api/article";
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
    export default {
        name: "editor",
        components: {
          mavonEditor
        },
        props: {
          edit_update_articleData: {type: Object, default: null}
        },
        data() {
          return {
            prop_edit_update_articleData: this.edit_update_articleData,
            code_style: "monokai-sublime",
            title: "",
            top: false,
            tag: "",
            summary: "",
            article_value: "",
            bgImgName: "",
            article_html_value: "",
            shadowShow: false,
            dialog: false,
            alert_meg:"",
            waitToDo: "",
            toast: false,
            toastMsg:"",
            imgUploaded: false,
            articleUploaded: false,
          }
        },
        methods: {
          getValue(value, render) {
            this.article_html_value = render;
          },
          getSummaryValue(value, render) {
            this.summary = render;
          },
          clearData() {
            this.title = this.tag = this.summary = this.article_value = this.article_html_value = "";
          },
          _addSummary() {
            this.shadowShow = true;
          },
          openDialog() {
            this.dialog = true;
          },
          toastMeg(msg) {
            this.toast = true;
            this.toastMsg = msg;
            setTimeout(() => {
              this.toast = false;
            }, 2000)
          },
          delay(msg) {
            var timer = null;
            var now = this;
            var delayUploaded = function() {
              if(now.imgUploaded && now.articleUploaded) {
                now.imgUploaded = now.articleUploaded = false;
                now.toastMeg(msg);
                now.$emit('update_content_list');
                clearTimeout(timer);
                return;
              }else {
                timer = setTimeout(delayUploaded,500);
              }
            }
            timer = setTimeout(delayUploaded,500)
          },
          wait(f) {
            if(f == '_uploadArticle') {
              this.alert_meg = '是否确认上传新文章'
            }else if(f == '_updateArticle') {
              this.alert_meg = '是否确认更新该文章'
            }else {
              this.alert_meg = '是否确认删除该文章'
            }
            this.dialog = true;
            this.waitToDo = this[f];
          },
          makeSure(flag) {
            this.dialog = false;
            if(flag) {
              this.waitToDo();
              this.waitToDo = null;
            }
          },
          formatnewArticle() {
            return {
              date: new Date().toLocaleString(),
              name: this.title,
              isTop: this.top ? 1 : 0,
              type: this.tag.split(','),
              intro: this.summary,
              resource: this.article_value,
              data: this.article_html_value
            }
          },
          formatupdateArticle() {
            return {
              updateTime: new Date().toLocaleString(),
              name: this.title,
              isTop: this.top ? 1 : 0,
              type: this.tag.split(','),
              intro: this.summary,
              resource: this.article_value,
              data: this.article_html_value
            }
          },
          addSketch() {
            var inputFile = document.getElementById('input_file');
            if(inputFile.files[0] == null) {
              this.imgUploaded = true;
              return {};
            }
            var fileName = inputFile.files[0].name.split('.');
            var fileType = fileName[fileName.length - 1];
            this._uploadImg(inputFile.files[0])
            return {
                bgImgName: new Date().getFullYear()+'-'+(parseInt(new Date().getMonth())+1)+ '-'+ new Date().getDate()+'_'+this.title+'.'+fileType
            }
          },
          _uploadImg(file) {
            var formdata = new FormData();
            formdata.append('img', file);
            uploadImg(this.title,formdata)
              .then((res) => {
                this.imgUploaded = true;
              })
          },
          validation() {
            let reg = /^\s*/
            if(this.title.replace(reg,"") == "" || this.tag.replace(reg,"") == "" || this.summary.replace(reg,"") == "") {
              this.toastMeg('请补全信息')
              return false;
            }
            return true;
          },
          _uploadArticle() {
            uploadArticle(Object.assign(this.formatnewArticle(),this.addSketch()))
              .then((res) => {
                this.articleUploaded = true;
              })
            this.delay('成功上传');
          },
          _updateArticle() {
            updateArticle(Object.assign({_id:this.prop_edit_update_articleData._id},this.formatupdateArticle(),this.addSketch()))
              .then((res) => {
                this.articleUploaded = true;
              })
            this.delay("成功更新");
          },
          _deleteArticle() {
            if(this.prop_edit_update_articleData) {
              deleteArticle(this.prop_edit_update_articleData._id)
                .then((res) => {
                  this.toastMeg('成功删除')
                  this.$emit('update_content_list');
                  this.prop_edit_update_articleData = null;
                })
            }
          }
        },
        watch: {
          edit_update_articleData: function () {
            this.prop_edit_update_articleData = this.edit_update_articleData;
            if(this.prop_edit_update_articleData == null) {
              this.top= this.title = this.tag = this.summary = this.article_value = "";
            }else {
              this.top = this.prop_edit_update_articleData.isTop;
              this.title = this.prop_edit_update_articleData.name;
              this.tag = this.prop_edit_update_articleData.type.join(',');
              this.summary = this.prop_edit_update_articleData.intro;
              this.article_value = this.prop_edit_update_articleData.resource;
            }
          },
          prop_edit_update_articleData: function () {
            if(this.prop_edit_update_articleData == null) {
              this.top = this.title = this.tag = this.summary = this.article_value = "";
            }
          }
        }
    }
</script>

<style lang="scss">
  .editor_container{position: relative; height: 100%;width: 100%;display: flex; flex-direction: column;
    label{margin-bottom: 0px;font-weight: normal;}
    input{border: none;outline: none;padding-left: 20px;padding-right: 20px; color: #9b9b9b;}
    .iconfont{font-size: 22px;line-height: 48px;color: #373737;padding-left: 20px;padding-right: 20px;}
    >.mu-toast{top: 100px; right: 150px;}
  }
  .editor_article_title{height: 50px;width: 100%;border-bottom: 1px solid #ebebeb;
    >#input_article_title{font-size: 20px;line-height: 48px;height: 48px;width: 60%; color: #000000;}
    >.my_checkbox{float: right;margin-top: 13px; margin-right: 30px;}
    >#delete{float: right;margin-right: 30px; margin-top: 8px;}
    @media (max-width: 1020px) {
      .my_checkbox{display: none;}
    }
    @media (max-width: 950px) {
      #delete{display: none;}
    }
  }
  .editor_article_tag_submit{height: 50px;width: 100%; font-size: 20px;line-height: 48px;border-bottom: 1px solid #ebebeb;
    >#input_article_tag{width: 25%; display: inline-block;}
    #article_control{float: right;width: auto;
      label{float: right; height: 34px; width: 80px;font-size: 14px; margin-right: 30px; margin-top: 8px;overflow: hidden;}
      #input_file{opacity: 0; width: 0px; height: 0px;}
      >#submit,#updata,#add_sumary{font-size: 14px;
        width: 80px;float: right; margin-right: 30px; margin-top: 8px;
      }
    }
    @media (max-width: 900px) {
      #article_control{display: none;}
    }
  }
  .editor_article_summary{height: 50px;width: 100%;
    >#input_article_summary{position: relative; top: -2px; font-size: 16px;line-height: 1; height: 32px;width: 75%;}
    >#summary{float: right;margin-right: 30px; margin-top: 8px;}
    @media (max-width: 950px) {
      #summary{display: none;}
    }
  }
  .editor_article_summary_container{height: 100%;width: 100%;overflow: hidden;border-top: 1px solid #e1e1e1;
    >.markdown_editor{width: 100%;height: 100%;}
    >#article_summary{position: fixed;z-index: 2000; background-color: rgba(220, 220, 220, 0.6);width: 100%; height: 100%;}
  }
  #shadowLayer{position: absolute;display: flex;flex-direction: row; align-items: center; z-index: 2000; height: 100%;width: 100%;background-color: rgba(23, 23, 23, 0.50);
    >.summary_container{width: 75%;height: 75%;margin: 0 auto;
      >.summary_editor{width: 100%;height: 100%;
        pre{background-color: #23241f;font-size: 14px;  margin-top: 1em;margin-bottom: 1em; border-radius: 5px;}
      }
    }
  }
</style>
