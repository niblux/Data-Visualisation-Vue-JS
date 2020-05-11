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
      this.displayBarChart(result.data);
    },
    displayBarChart: function(customers) {
      const countValues = (arr) => {
        let result = {};
        arr.forEach(function(x) {
          result[x] = (result[x] || 0) + 1;
        });
        return result;
      };

      const fruits = countValues(customers.map(i => i.preferences.fruit));
      fruits.type = 'fruit';
      const pets = countValues(customers.map(i => i.preferences.pet));
      pets.type = 'pet';
      const eyeColors = countValues(customers.map(i => i.eyeColor));
      eyeColors.type = 'eyeColor';

      const data = [];
      data.push(fruits);
      data.push(pets)
      data.push(eyeColors);
        
      const keys = data.map(item => Object.keys(item)).flatMap(x => x);

      const groupKey = "type";

      var margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 960 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const color = d3
        .scaleOrdinal()
        .range([
          "#98abc5",
          "#8a89a6",
          "#7b6888",
          "#6b486b",
          "#a05d56",
          "#d0743c",
          "#ff8c00"
        ]);

      
      const svg = d3
        .select(".bar-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      const x0 = d3
        .scaleBand()
        .domain(data.map(d => d[groupKey]))
        .rangeRound([margin.left, width - margin.right])
        .paddingInner(0.1);

      const x1 = d3
        .scaleBand()
        .domain([0, keys])
        .rangeRound([0, x0.bandwidth()])
        .padding(0.05);

      const y = d3
        .scaleLinear()
        .domain([0, 30])
        .nice()
        .rangeRound([height - margin.bottom, margin.top]);

      const xAxis = g =>
        g
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x0).tickSizeOuter(0))
          .call(g => g.select(".domain").remove());

      const yAxis = g =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(y).ticks(null, "s"))
          .call(g => g.select(".domain").remove())
          .call(g =>
            g
              .select(".tick:last-of-type text")
              .clone()
              .attr("x", 3)
              .attr("text-anchor", "start")
              .attr("font-weight", "bold")
              .text(data.y)
          );

      svg
        .append("g")
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d => `translate(${x0(d[groupKey])},0)`)
        .selectAll("rect")
        .data(d => {              
              let result = keys.map(key => ({key, value: d[key]}))
              
              let filtered = result.filter((x) => x.value !== undefined && x.key !== 'type');
              return filtered;
        })
        .join("rect")
        .attr("x", d => x1(d.key))
        .attr("y", d => y(d.value))
        .attr("width", x1.bandwidth())
        .attr("height", d => console.log('vlas', d.value) || d.value) // change height to how many people have a certain pet
        .attr("fill", d => color(d.key));

      svg.append("g").call(xAxis);

      svg.append("g").call(yAxis);

      // svg.append("g").call(legend);

      return svg.node();
    }
  },
  mounted() {
    this.fetchUsers();
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
  overflow-x: scroll;
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