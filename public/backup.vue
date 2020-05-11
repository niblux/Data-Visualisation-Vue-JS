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
            <li class="active-dashboard">Item One</li>
            <li>Item Two</li>
            <li>Item Two</li>
          </ul>
        </div>
        <div class="bar-chart"></div>
        <div class="pie-chart"></div>
        <h1 class="table-header">Data Table</h1>
        <div class="table-edit"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  data() {
    return {
      customers: null
    };
  },
  methods: {
    async fetchUsers() {
      const baseURI = "https://updates.suade.org/files/people.json";
      const result = await this.$http.get(baseURI);
      console.log("data", result.data);
      this.displayBarChart(result.data);
    },
    displayBarChart: function(customers) {
      var w = 800;
      var h = 600;
      // var margin = 100;
      var width = w;
      var height = h;

      // create element and append on to the DOM
      const svg = d3
        .select(".bar-chart")
        .append("svg")
        .attr("viewbox", "100 100 400 600")
        .attr("width", width)
        .attr("height", height);

      // Range = Output , create the x and y axis.
      var xScale = d3.scaleBand().range([0, width]).padding(0.4);
      var yScale = d3.scaleBand().range([height, 0]);

      // Create a group so we can group the axis.
      var g = svg
        .append("g")
        .attr("transform", "translate(" + 100 + "," + 20 + ")");

      // Domain = Input , map the values for x and y axis.
      const sortedAge = customers.sort((a, b) => a.age - b.age);
      xScale.domain(customers.map(c => c.name));
      yScale.domain(sortedAge.map(c => c.age));

      g.append("g")
        .attr("transform", "translate(0," + 550 + ")")
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .attr("transform", "translate(-36 45.5) rotate(90)" )

      g.append("g")
         .call(d3.axisLeft(yScale).ticks(10));

          

    }
  },
  mounted() {
    // const d3 = require("d3");
    this.fetchUsers();
  }
};
</script>

<style lang="css" scoped>

.bar {
  fill:steelblue;
}

.test {
  color:red;
  background:red;
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
  grid-template-columns: 100px repeat(2, minmax(600px, auto)) 1fr;
  grid-template-rows: 150px 1fr 1fr 150px;
}

.dash-header {
  grid-column: 2;
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
  max-width: 400px;
  max-height: 400px;
}

.bar-chart {
    grid-row: 2 /3;
    grid-column: 1 / 3;
    gap: 2rem;
}
/*
.pie-chart {
  background: orange;
  grid-row: 2 / 4;
  grid-column: 3 / 4;
}
*/
.table-edit {
  max-width: 600px;
  max-height: 400px;
  margin-top: 80px;
  grid-row: 3;
  grid-column: 2;
  background: rebeccapurple;
}

.table-header {
  grid-row: 3;
  grid-column: 2;
}
</style>