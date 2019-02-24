<template>
  <article-detail :is-edit="false"/>
</template>

<script>
import UserDetail from './components/Detail'

export default {
  name: 'AddForm',
  components: { UserDetail }
}
</script>

