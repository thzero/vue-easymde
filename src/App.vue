<template>
  <div class="demo-wrap">
    <div class="editor-wrap">
      <div class="editor">
        <h4 class="title">Default configuration & disable automatic initialization</h4>
        <h5 class="title">默认配置&禁用自动初始化</h5>
        <markdown-editor
          v-model="content"
          ref="markdownEditor"
          :autoinit="false"></markdown-editor>
      </div>
      <div class="editor">
        <h4 class="title">Turn on code highlighting & use github's markdown style</h4>
        <h5 class="title">开启代码高亮&使用github的markdown样式</h5>
        <markdown-editor
          v-model="content"
          :highlight="true"
          preview-class="markdown-body"></markdown-editor>
      </div>
      <div class="editor theme">
        <h4 class="title">Custom code highlighting theme</h4>
        <h5 class="title">自定义代码高亮主题</h5>
        <markdown-editor
          v-model="content"
          :highlight="true"
          preview-class="markdown-body"></markdown-editor>
      </div>
      <div class="editor">
        <h4 class="title">Hide bottom statistics bar & edit toolbar</h4>
        <h5 class="title">隐藏底部统计栏&修改工具栏</h5>
        <markdown-editor
          v-model="content"
          :configs="configs"></markdown-editor>
      </div>
    </div>
    <div class="button-wrap">
      <button type="button" @click="handleOutputMARKDOWN">Output MARKDOWN</button>
      <button type="button" @click="handleOutputHTML">Output HTML</button>
      <pre v-text="output"></pre>
      <div v-html="output" v-show="type === 'html'" class="markdown-body"></div>
    </div>
  </div>
</template>

<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor';
import hljs from 'highlight.js';

window.hljs = hljs;
export default {
  name: 'index',
  components: {
    markdownEditor,
  },
  data() {
    return {
      content: '``` \nconsole.log("lalala") \n```',
      configs: {
        status: false,
        toolbar: ['image'],
      },
      output: '',
      type: 'markdown',
    };
  },
  computed: {
    simplemde() {
      return this.$refs.markdownEditor.simplemde;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.markdownEditor.initialize();
    });
  },
  methods: {
    handleInput(val) {
      this.output = val;
    },
    handleOutputHTML() {
      this.type = 'html';
      this.output = this.simplemde.markdown(this.content);
    },
    handleOutputMARKDOWN() {
      this.type = 'markdown';
      this.output = this.content;
    },
  },
};
</script>

<style>
@import '~simplemde/dist/simplemde.min.css';
@import '~highlight.js/styles/atom-one-dark.css';
@import '~github-markdown-css';

body {
  margin: 0;
  padding: 0;
}

.button-wrap {
  padding: 20px;
}

.editor-wrap {
  width: 100%;
  max-width: 900px;
  padding: 0 10px;
  float: left;
}

.editor {
  padding: 10px;
  box-sizing: border-box;
}

.title {
  text-align: center;
}

.markdown-editor .CodeMirror {
  height: 200px;
}

/*修改代码块背景色及字体颜色 \ Modify the code block background color and font color*/
.theme .editor-preview-side pre, .theme .editor-preview pre{
  color: #abb2bf !important;
  background: #282c34 !important;
}
</style>
