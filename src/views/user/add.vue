<template>
  <user-detail :is-edit="false"/>
</template>

<script>
import UserDetail from './components/Detail'

export default {
  name: 'PostForm',
  components: { UserDetail }
}
</script>

