<template>
  <div class="editor_container">
    <label for="input_article_title" class="editor_article_title">
      <i class="iconfont icon-biaoti"></i>
      <input id="input_article_title" type="text" v-model="title">
    </label>
    <label  class="editor_article_tag_submit">
      <i class="iconfont icon-tag"></i>
      <input id="input_article_tag" type="text" v-model="tag">
      <div id="article_control">
        <div class="btn btn-primary" :disabled=edit_update_articleData id="submit" @click="_uploadArticle">发布文章</div>
        <div class="btn btn-success" :disabled=!edit_update_articleData id="updata" @click="_updataArticle">更新文章</div>
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
  </div>
</template>

<script>
  import {updateArticle,uploadArticle,uploadImg} from "../../../blog/src/api/article";
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
            code_style: "monokai-sublime",
            title: "",
            tag: "",
            summary: "",
            article_value: "",
            bgImgName: "",
            article_html_value: "",
            shadowShow: false,
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
          formatArticle() {
            var inputFile = document.getElementById('input_file');
            var fileName = inputFile.files[0].name.split('.');
            var fileType = fileName[fileName.length - 1];
            return {
              date: new Date().toLocaleString(),
              name: this.title,
              type: this.tag,
              intro: this.summary,
              bgImgName: new Date().getFullYear()+'-'+(parseInt(new Date().getMonth())+1)+ '-'+ new Date().getDate()+'_'+this.title+'.'+fileType,
              resource: this.article_value,
              data: this.article_html_value
            }
          },
          _addSummary() {
            this.shadowShow = true;
          },
          _uploadImg() {
            var inputFile = document.getElementById('input_file');
            var formdata = new FormData();
            formdata.append('img', inputFile.files[0]);
            uploadImg(this.title,formdata);
          },
          _uploadArticle() {
            let reg = /^\s*/
            if(this.title.replace(reg,"") == "" || this.tag.replace(reg,"") == "" || this.summary.replace(reg,"") == "") {
              //信息补全
              console.log(false)
            }else {
              console.log(this.formatArticle());
              uploadArticle(this.formatArticle());
              this.$emit('update_content_list');
            }
          },
          _updataArticle() {
            let reg = /^\s*/
            if(this.title.replace(reg,"") == "" || this.tag.replace(reg,"") == "" || this.summary.replace(reg,"") == "") {
              //信息补全
              console.log(false)
            }else {
              updateArticle(Object.assign({_id:this.edit_update_articleData._id},this.formatArticle()));
              this._uploadImg();
              this.$emit('update_content_list');
            }
          }
        },
        watch: {
          edit_update_articleData: function () {
            if(this.edit_update_articleData == null) {
              this.title = this.tag = this.summary = this.article_value = "";
            }else {
              this.title = this.edit_update_articleData.name;
              this.tag = this.edit_update_articleData.type;
              this.summary = this.edit_update_articleData.intro;
              this.article_value = this.edit_update_articleData.resource;
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
  }
  .editor_article_title{height: 50px;width: 100%;border-bottom: 1px solid #ebebeb;
    >#input_article_title{font-size: 20px;line-height: 48px;height: 48px;width: 75%; color: #000000;}
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
    @media (max-width: 900px) {
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
