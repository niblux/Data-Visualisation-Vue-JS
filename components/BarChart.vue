<template>
  <div class="bar-chart">
    <div class="header">
      <div class="header-left">Customer Data</div>
      <div class="header-right">Edit Data</div>
    </div>
    <div class="card-body">
      <canvas id="bar-chart" class="card"></canvas>
      <div class="table-edit">
        <TableEdit :chartData="chartData" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Vue from "vue";
import TableEdit from "./TableEdit.vue";
import Header from "./Header.vue";

export default {
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  components: {
    TableEdit
  },
  data() {
    return {};
  },
  methods: {
    displayBarChart(data) {
      const barData = JSON.parse(JSON.stringify(data));
      const fruits = barData[0];
      const pets = barData[1];
      const eyeColors = barData[2];

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
              data: [fruits[3].count, pets[3].count, 0],
              backgroundColor: "rgba(206, 53, 237, 0.5)"
            }
          ],
          backgroundColor: []
        },
        options: {
          scales: {
            xAxes: [
              {
                gridLines: {
                  drawOnChartArea: false
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  drawOnChartArea: false
                }
              }
            ]
          },
          animation: {
            onComplete: function() {
              const chartInstance = this.chart;
              ctx = chartInstance.ctx;
              ctx.textAlign = "center";
              ctx.fillStyle = "rgba(0, 0, 0, 1)";
              ctx.textBaseline = "bottom";

              // get each set of bars per dataset
              const metaFirst = chartInstance.controller.getDatasetMeta(0).data;
              const metaSecond = chartInstance.controller.getDatasetMeta(1)
                .data;
              const metaThird = chartInstance.controller.getDatasetMeta(2).data;
              const metaFourth = chartInstance.controller.getDatasetMeta(3)
                .data;

              // setup individual labels
              const first = ["apple", "bird", "brown"];
              const second = ["strawberry", "cat", "blue"];
              const third = ["banana", "none", "green"];
              const fourth = ["mango", "dog", ""];

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
      // end chart
      myChart.canvas.parentNode.style.height = "700px";
      myChart.canvas.parentNode.style.width = "700px";
    }
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === "UPDATE_DATA") {
        this.updateChart;
      }
    });
  },
  mounted() {
    setTimeout(() => {
      this.displayBarChart(this.chartData);
    }, 1000);
  },
  computed: {
    updateChart: function() {
      this.displayBarChart(this.chartData);
    }
  },
  beforeDestroy() {
    this.unsubscribe();
  }
};
</script>

<style>
</style>
