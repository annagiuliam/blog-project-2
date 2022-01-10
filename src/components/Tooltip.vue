<template>
  <!-- <div style="position: relative">
    <span class="tooltip"><slot /></span>
  </div> -->
  <div class="tooltip"><slot /></div>
</template>

<script>
export default {
  name: "Tooltip",
};
</script>

<style>
.tooltip {
  width: 120%;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: -45%;
  text-align: center;
  padding: 5px;
  background-color: black;
  color: white;
  border-radius: 5px;
}
</style>
