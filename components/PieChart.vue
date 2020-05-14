<template>
  <div>
    <h1>Hey i'm the Pie Chart Comp</h1>
    <div class="pie-chart"></div>
  </div>
</template>

<script>
export default {
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    displayPieChart() {
      var pieChart = bb.generate({
        data: {
          columns: [
            ["pets", pets.cat, pets.dog, pets.bird, pets.none],
            ["fruits", fruits.apple, fruits.banana, fruits.strawberry],
            ["eyeColor", eyeColors.green, eyeColors.blue, eyeColors.brown]
          ],
          type: "pie",
          onclick: function(d, i) {
            console.log("onclick", d, i);
          },
          onover: function(d, i) {
            console.log("onover", d, i);
          },
          onout: function(d, i) {
            console.log("onout", d, i);
          }
        },
        bindto: ".pie-chart"
      });
    }
  }
};
</script>

<style>
</style>