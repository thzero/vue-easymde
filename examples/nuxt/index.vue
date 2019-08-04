<template>
  <div class="wrap">
    <no-ssr>
      <vue-easymde v-model="content" />
    </no-ssr>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '``` \nconsole.log("lalala") \n```',
    };
  },
};
</script>
