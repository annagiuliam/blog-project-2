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
  top: -20%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px;
  background-color: black;
  color: white;
  border-radius: 5px;
}
</style>
