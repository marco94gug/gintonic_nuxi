<template>
  <h2>Drink Page</h2>
  <Breadcrumbs :links="['prova', 'secondo', 'terzo']" />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["drink-dispatch"],
});
</script>
