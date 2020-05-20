<template>
  <div>
    <div class="pie-chart">
      <canvas id="pie-chart" width="400" height="400"></canvas>
      <div id="my-legend-con" class="legend-con"></div>
    </div>
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
        test: function() {
          return this;
        },
        type: "pie",
        data: {
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
          legend: false,
          legendCallback: function(chart) {
            var legendHtml = [];
            legendHtml.push("<ul>");
            var item = this.data.datasets[0];
            for (var i = 0; i < item.data.length; i++) {
              legendHtml.push("<li>");
              legendHtml.push(
                '<span class="chart-legend" style="background-color:' +
                  item.backgroundColor[i] +
                  '"></span>'
              );
              legendHtml.push(
                '<span class="chart-legend-label-text">' +
                  item.data[i] +
                  " person - " +
                  this.data.labels[i] +
                  " times</span>"
              );
              legendHtml.push("</li>");
            }

            legendHtml.push("</ul>");
            return legendHtml.join("");
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
              const first = ["apple", "dog", "green"];
              const second = ["strawberry", "cat", "brown"];
              const third = ["mango", "bird", "blue"];
              const fourth = ["banana", "", ""];

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

      myPieChart.config.options.legendCallback.call(myPieChart);
    }
  },
  mounted() {
    setTimeout(() => {
      this.displayPieChart(this.chartData);
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
</style>