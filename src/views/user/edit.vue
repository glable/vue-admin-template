<template>
  <user-detail :is-edit="true"/>
</template>

<script>
import UserDetail from './components/Detail'

export default {
  name: 'EditForm',
  components: { UserDetail }
}
</script>

