<template>
  <div>
    <!-- use v-model control value -->
    <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>

    <!-- use event control value -->
    <markdown-editor :value="content" @input="handleInput"></markdown-editor>

    <!-- add config -->
    <markdown-editor :configs="configs"></markdown-editor>

    <!-- disable auto init -->
    <markdown-editor :autoinit="false"></markdown-editor>
  </div>
</template>

<script>
  import markdownEditor from 'vue-easymde/src/markdown-editor'

  // Base example
  export default {
    components: {
      markdownEditor
    },
    data () {
      return {
        content: '',
        configs: {
          spellChecker: false // disable spell check
        }
      }
    }
  }

  // Complete example
  export default {
    components: {
      markdownEditor
    },
    data () {
      return {
        content: '',
        configs: {
          status: false, // disable the status bar at the bottom
          spellChecker: false // disable spell check
        }
      }
    },
    computed: {
      easymde () {
        return this.$refs.markdownEditor.easymde
      }
    },
    mounted () {
      console.log(this.easymde)
      this.easymde.togglePreview()

      // 'change' envent has bound, via @input attache an event listener
      // You can attache events in this [list](https://codemirror.net/doc/manual.html#events) yourself if necessary
      this.simplemde.codemirror.on('beforeChange', (instance, changeObj) => {
        // do some things
      })

      // remove SimpleMDE, when component destroy will invoke
      this.simplemde = null

      // some useful methods
      this.$refs.markdownEditor.initialize() // init
      this.easymde.toTextArea()
      this.easymde.isPreviewActive() // returns boolean
      this.easymde.isSideBySideActive() // returns boolean
      this.easymde.isFullscreenActive() // returns boolean
      this.easymde.clearAutosavedValue() // no returned value
      this.easymde.markdown(this.content) // returns parsed html
      this.easymde.codemirror.refresh() // refresh codemirror
    },
    methods: {
      handleInput () {
        // do some things
      }
    }
  }
</script>

<style>
  @import '~easymde/dist/easymde.min.css';
</style>
