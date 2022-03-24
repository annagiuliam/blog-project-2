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
.left {
  top: 25%;
  right: 100%;
  width: 5rem;
  transform: none;
}
.right {
  top: 25%;
  left: 8%;
  width: 5rem;
  transform: none
}
.top {
  top: -20%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
