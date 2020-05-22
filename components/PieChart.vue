<template>
      <div class="pie-chart">
      <canvas id="pie-chart" class="card" width="600" height="600"></canvas>
      <div class="table-edit card">
        <TableEdit :chartData="chartData" />
      </div>
    </div>
</template>

<script>
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
    displayPieChart(data) {
      const barData = JSON.parse(JSON.stringify(data));
      const fruits = barData[0];
      const pets = barData[1];
      const eyeColors = barData[2];

      var canvas = document.getElementById("pie-chart");
      var ctx = canvas.getContext("2d");
      canvas.onclick = function(evt) {
        var activePoints = myPieChart.getElementsAtEvent(evt);
      };
      var myPieChart = new Chart(ctx, {
        type: "pie",
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
          ]
        },
        options: {
          responsive: false,
          legend: false,
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
              ctx.fillText(first[0], 370, 228);
              ctx.fillText(first[1], 280, 371);
              ctx.fillText(first[2], 45, 286);

              ctx.fillText(second[0], 284, 130);
              ctx.fillText(second[1], 213, 320);
              ctx.fillText(second[2], 80, 234);

              ctx.fillText(third[0], 260, 180);
              ctx.fillText(third[1], 231, 284);
              ctx.fillText(third[2], 130, 247);

              ctx.fillText(fourth[0], 195, 238);
            }
          }
        }
      });

    }
  },
  mounted() {
    setTimeout(() => {
      this.displayPieChart(this.chartData);
      console.log('this.chartData', this.chartData);
    }, 1000);
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === "UPDATE_DATA") {
        this.updateChart;
      }
    });
  },
  computed: {
    updateChart: function() {
      this.displayPieChart(this.chartData);
    }
  }
};
</script>

<style>
canvas#pie-chart {
  border: 1px solid #efefef;
  border-radius: 10px;
  padding: 10px;
}
</style>