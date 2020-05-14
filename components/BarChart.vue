<template>
  <div>
    <div class="bar-chart">
      <!-- <p>I am in the bar chart comp {{ this.chartData }}</p> -->
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  </div>
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

      var ctx = document.getElementById("myChart").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["fruits", "pets", "eyeColors"],

          datasets: [
            {
              label: "",
              backgroundColor: "green",
              borderColor: "green",
              borderWidth: 1,
              data: [fruits.apple, pets.dog, eyeColors.green]
            },
            // {
            //   label: "Dog",
            //   backgroundColor: "lightblue",
            //   borderColor: "blue",
            //   borderWidth: 1,
            //   data: [pets.dog]
            // },
            // {
            //   label: "Green",
            //   backgroundColor: "lightgreen",
            //   borderColor: "green",
            //   borderWidth: 1,
            //   data: [eyeColors.green]
            // },
            {
              label: "",
              backgroundColor: "red",
              borderColor: "red",
              borderWidth: 1,
              data: [fruits.strawberry, pets.dog, eyeColors.brown]
            },
            // {
            //   label: "Dog",
            //   backgroundColor: "lightblue",
            //   borderColor: "blue",
            //   borderWidth: 1,
            //   data: [pets.dog]
            // },
            // {
            //   label: "Brown",
            //   backgroundColor: "lightblue",
            //   borderColor: "blue",
            //   borderWidth: 1,
            //   data: [eyeColors.brown]
            // },
            {
              label: "",
              backgroundColor: "blue",
              borderColor: "red",
              borderWidth: 1,
              data: [fruits.mango, pets.bird, eyeColors.blue]
            },
            // {
            //   label: "Bird",
            //   backgroundColor: "lightblue",
            //   borderColor: "blue",
            //   borderWidth: 1,
            //   data: [pets.bird]
            // },
            //  {
            //   label: "None",
            //   backgroundColor: "lightblue",
            //   borderColor: "green",
            //   borderWidth: 1,
            //   data: [eyeColors.blue]
            // },
            {
              label:'',
              backgroundColor: "pink",
              borderColor: "red",
              borderWidth: 1,
              data: [fruits.banana, pets.cat, 0]
            }
            // {
            //   label: "Cat",
            //   backgroundColor: "lightblue",
            //   borderColor: "blue",
            //   borderWidth: 1,
            //   data: [pets.cat]
            // },
            // {
            //   label: "None",
            //   backgroundColor: "lightgreen",
            //   borderColor: "green",
            //   borderWidth: 1,
            //   data: [0]
            // },

            // {
            //   label: "Blue",
            //   backgroundColor: "lightgreen",
            //   borderColor: "green",
            //   borderWidth: 1,
            //   data: [eyeColors.blue]
            // },

            // {
            //   label: "Brown",
            //   backgroundColor: "lightgreen",
            //   borderColor: "green",
            //   borderWidth: 1,
            //   data: [eyeColors.brown]
            // }
          ]
        },
        options: {
          responsive: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
      console.log("myCCart", myChart);
    }
  },
  mounted() {
    setTimeout(() => {
      this.displayBarChart(this.chartData);
    }, 1000);
    // Vue.nextTick(function() {
    //   this.displayBarChart(this.chartData);
    // });
  }
  // computed: {
  //   myData() {
  //     return this.displayBarChart(this.chartData);
  //   }
  // },
  //   computed: {
  //   item() {
  //     return this.$store.state.chartData || {}; // added {} as default.
  //   }
  // }
};
</script>

<style>
</style>
