<template>
  <div class="container">
    <div class="menu">
      <div class="menu-icon">
        <i class="fas fa-bars"></i>
      </div>
      <ul class="nav-links">
        <li>
          <i class="far fa-chart-bar"></i>
        </li>
        <li class="active">
          <i class="fas fa-chart-pie"></i>
        </li>
        <li>
          <i class="fas fa-file-upload"></i>
        </li>
      </ul>
    </div>

    <div class="main-grid">
      <header>
        <div>
          <input class="icon search" placeholder="Type in to Search..." />
        </div>
        <div class="dash-label">
          <span>
            <i class="fas fa-th"></i> Customers
          </span>
        </div>
        <div class="user-avatar">
          <i class="far fa-user"></i>
          <p>Nabil Elidrissi</p>
        </div>
      </header>
      <div class="inner-grid">
        <div class="dash-header">
          <h1>Dashboard</h1>
          <ul>
            <li class="active-dashboard">Bar Chart</li>
            <li>Pie Chart</li>
            <li>Item Two</li>
          </ul>
        </div>
        <div class="bar-chart">
          <BarChart :chartData="chartData" />
        </div>
        <div class="pie-chart">
          <PieChart :chartData="chartData" />
        </div>
        <h1 class="table-header">Data Table</h1>
        <div class="table-edit">
          <TableEdit :chartData="chartData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import bb from "billboard.js";
import "billboard.js/dist/billboard.css";
import { mapState, mapGetters } from "vuex";
import BarChart from "../components/BarChart.vue";
import PieChart from "../components/PieChart.vue";
import TableEdit from "../components/TableEdit.vue";

export default {
  data() {
    return {
      tableData: []
    };
  },
  components: {
    BarChart,
    PieChart,
    TableEdit
  },
  methods: {},
  updated() {
    this.$store.getters.chartData;
  },
  created() {
    this.$store.dispatch("getData");
  },
  mounted() {
    this.$nextTick(function() {
      this.tableData = Object.entries(this.chartData);
    });
  },
  computed: {
    ...mapGetters(["chartData"])
  }
};
</script>

<style lang="css" scoped>
.bar {
  fill: steelblue;
}

.test {
  color: red;
  background: red;
}

.container {
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-template-rows: minmax(1200px, auto);
}

.menu {
  display: grid;
  grid-template-rows: 80px 1fr;
  align-items: start;
  justify-content: end;
}

.menu-icon {
  background: var(--icon-colour);
  font-size: 2em;
  padding: 18px 26px;
  color: white;
}

ul.nav-links {
  color: var(--icon-colour);
  margin: 15px 0px;
  padding: 0;
  display: grid;
  grid-template-rows: repeat(3, 50px);
  gap: 2em;
  list-style-type: none;
  font-size: 1.5em;
}

ul.nav-links li {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 35px 0px;
}

.active {
  border-left: 4px solid var(--icon-colour);
  background: linear-gradient(
    -90deg,
    rgba(183, 219, 255, 0),
    rgba(183, 219, 255, 1)
  );
}

.active-dashboard {
  border-bottom: 4px solid var(--icon-colour);
}

.main-grid {
  display: grid;
  grid-template-rows: 80px 1fr;
  background: #edf6ff;
}

header {
  display: grid;
  grid-template-columns: 5vw auto 200px;
  background: #fff;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.22);
}

.dash-label {
  align-self: center;
  justify-self: center;
}

.dash-label > span {
  background: #59b2ff;
  width: 80px;
  padding: 10px 10px;
  font-size: 16px;
  letter-spacing: 0.5px;
  border-radius: 10px;
  color: #fff;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.icon::before {
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}

.search::before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: "\f002";
}

.search {
  padding: 10px;
  margin: 20px 20px;
  align-self: center;
  justify-self: center;
  font-size: 16px;
  border: none;
}

.user-avatar {
  align-self: center;
  justify-self: center;
  font-size: 18px;
}

.user-avatar i,
.user-avatar p {
  display: inline-block;
}

.user-avatar i {
  width: 50px;
}

.user-avatar p {
  width: 150px;
  padding-left: 10px;
}

.inner-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 150px 1fr 1fr 150px;
}

.dash-header {
  grid-column: 1;
}

.dash-header ul {
  padding: 0;
  margin: 0;
}

.dash-header ul li:first-of-type {
  padding-left: 0;
}

.dash-header ul li {
  display: inline;
  padding-left: 20px;
  margin: 20px 0px;
}

.pie-chart {
  grid-row: 2;
  grid-column: 3;
}

.bar-chart {
  grid-row: 2 /3;
  grid-column: 1 / 3;
  gap: 2rem;
}

.table-edit {
  margin-top: 80px;
  grid-row: 3;
  grid-column: 1;
}

.table-header {
  grid-row: 3;
  grid-column: 1;
}
</style>