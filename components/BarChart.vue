<template>
      <canvas id="bar-chart" width="400" height="400"></canvas>
</template>

<script>
import { mapState } from "vuex";
import Vue from "vue";

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
    displayBarChart(data) {
      const barData = JSON.parse(JSON.stringify(data));
      const fruits = barData[0].fruits;
      const pets = barData[0].pets;
      const eyeColors = barData[0].eyeColors;

      var ctx = document.getElementById("bar-chart").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["fruits", "pets", "eyeColors"],
          datasets: [
            {
              label: "",
              borderWidth: 1,
              data: [fruits[0].count, pets[0].count, eyeColors[0].count],
              backgroundColor: "rgba(237, 53, 53, 0.5)"
            },
            {
              label: "",
              borderWidth: 1,
              data: [fruits[1].count, pets[1].count, eyeColors[1].count],
              backgroundColor: "rgba(53, 90, 237, 0.5)"
            },
            {
              label: "",
              borderWidth: 1,
              data: [fruits[2].count, pets[2].count, eyeColors[2].count],
              backgroundColor: "rgba(53, 237, 68, 0.5)"
            },
            {
              label: "",
              borderWidth: 1,
              data: [fruits[3].count, 0, 0],
              backgroundColor: "rgba(206, 53, 237, 0.5)"
            }
          ],
          backgroundColor: []
        },
        options: {
          animation: {
            onComplete: function() {
              const chartInstance = this.chart;
              ctx = chartInstance.ctx;
              ctx.textAlign = "center";
              ctx.fillStyle = "rgba(0, 0, 0, 1)";
              ctx.textBaseline = "bottom";

              // get each set of bars per dataset
              const metaFirst = chartInstance.controller.getDatasetMeta(0).data;
              const metaSecond = chartInstance.controller.getDatasetMeta(1).data;
              const metaThird = chartInstance.controller.getDatasetMeta(2).data;
              const metaFourth = chartInstance.controller.getDatasetMeta(3).data;

              // setup individual labels
              const first = ["apple", "dog", "green"];
              const second = ["strawberry", "cat", "brown"];
              const third = ["mango", "bird", "blue"];
              const fourth = ["banana", '', ''];

              // use positions for each bar to add unique label

              for (let i = 0; i < first.length; i++) {
                ctx.fillText(
                  first[i],
                  metaFirst[i]._model.x,
                  metaFirst[i]._model.y - 5
                );

                ctx.fillText(
                  second[i],
                  metaSecond[i]._model.x,
                  metaSecond[i]._model.y - 5
                );

                ctx.fillText(
                  third[i],
                  metaThird[i]._model.x,
                  metaThird[i]._model.y - 5
                );
                ctx.fillText(
                  fourth[i],
                  metaFourth[i]._model.x,
                  metaFourth[i]._model.y - 5
                );
              }
            }
          },
          responsive: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  min: 0,
                  max: 20
                }
              }
            ]
          }
        }
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.displayBarChart(this.chartData);
    }, 1000);
  }
};
</script>

<style>
</style>
