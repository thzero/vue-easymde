<template>
  <div class="demo-wrap">
    <div class="editor-wrap">
      <div class="editor">
        <h4 class="title">Default configuration & disable automatic initialization</h4>
        <markdown-editor
          v-model="content"
          ref="markdownEditor"
          :autoinit="false"></markdown-editor>
      </div>
      <div class="editor">
        <h4 class="title">Turn on code highlighting & use github's markdown style</h4>
        <markdown-editor
          v-model="content"
          :highlight="true"
          preview-class="markdown-body"></markdown-editor>
      </div>
      <div class="editor theme">
        <h4 class="title">Custom code highlighting theme</h4>
        <markdown-editor
          v-model="content"
          :highlight="true"
          preview-class="markdown-body"></markdown-editor>
      </div>
      <div class="editor">
        <h4 class="title">Hide bottom statistics bar & edit toolbar</h4>
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
import markdownEditor from 'vue-easymde/src/markdown-editor'
import hljs from 'highlight.js'

window.hljs = hljs

export default {
  name: 'app',
  components: {
    markdownEditor
  },
  data () {
    return {
      content: '``` \nconsole.log("lalala") \n```',
      configs: {
        status: false,
        toolbar: ['image']
      },
      output: '',
      type: 'markdown'
    }
  },
  computed: {
    easymde () {
      return this.$refs.markdownEditor.easymde
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.markdownEditor.initialize()
    })
  },
  methods: {
    handleInput (val) {
      this.output = val
    },
    handleOutputHTML () {
      this.type = 'html'
      this.output = this.easymde.markdown(this.content)
    },
    handleOutputMARKDOWN () {
      this.type = 'markdown'
      this.output = this.content
    }
  }
}
</script>

<style>
  @import '~easymde/dist/easymde.min.css';
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

  .theme .editor-preview-side pre, .theme .editor-preview pre{
    color: #abb2bf !important;
    background: #282c34 !important;
  }
</style>
