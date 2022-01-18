<template>
  <div class="tooltip">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Tooltip'

}
</script>

<style>
.tooltip {
  position: absolute;
  padding: 5px;
  background-color: black;
  color: white;
  border-radius: 5px;
  text-align: center
}
</style>
