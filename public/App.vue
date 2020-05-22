<template>
  <div class="container">
    <div class="menu">
      <div class="menu-icon">
        <i class="fas fa-bars"></i>
      </div>
      <ul class="nav-links">
        <router-link to="/bar-chart">
          <li
            @click="active = 'chart'"
            class="navbar__menu--item"
            :class="{active:active === 'chart'}"
          >
            <i class="far fa-chart-bar"></i>
          </li>
        </router-link>
        <router-link to="/pie-chart">
          <li @click="active = 'pie'" class="navbar__menu--item" :class="{active:active === 'pie'}">
            <i class="fas fa-chart-pie"></i>
          </li>
        </router-link>
        <router-link to="/upload">
          <li
            @click="active = 'upload'"
            class="navbar__menu--item"
            :class="{active:active === 'upload'}"
          >
            <i class="fas fa-file-upload"></i>
          </li>
        </router-link>
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
        </div>
        <router-view :chartData="chartData" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import BarChart from "../components/BarChart.vue";
import PieChart from "../components/PieChart.vue";
import TableEdit from "../components/TableEdit.vue";

export default {
  data() {
    return {
      active: null
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
    this.active = "chart";
    this.$nextTick(function() {
      this.tableData = Object.entries(this.chartData);
    });
  },
  computed: {
    ...mapGetters(["chartData"])
  }
};
</script>

<style lang="css">
body {
  display: grid;
}

.container {
  display: grid;
  grid-template-columns: 65px 1fr;
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
  font-size: 1em;
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

a:-webkit-any-link {
  text-decoration: none;
}

ul.nav-links li {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 35px 0px;
  color: var(--icon-colour);
}

a:-webkit-any-link > li.page-link {
  text-decoration: none;
  color: #000;
  font-size: 18px;
  padding-left: 10px;
}

.active {
  border-left: 4px solid var(--icon-colour);
  background: linear-gradient(
    -90deg,
    rgba(183, 219, 255, 0),
    rgba(183, 219, 255, 1)
  );
}

.activeDashboard {
  border-bottom: 4px solid var(--icon-colour);
}

.main-grid {
  display: grid;
  grid-template-rows: 58px 1fr;
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
  margin: 10px 20px;
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

.user-avatar p {
  width: 150px;
  padding-left: 10px;
}

.inner-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 150px 1fr 1fr 150px;
  padding: 10px;
}

.dash-header {
  grid-column: 1;
  padding: 10px;
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
  display: grid;
  grid-row: 2;
  grid-column: 1;
  grid-gap: 10px;
}

.bar-chart {
  display: grid;
  grid-row: 2;
  grid-column: 1;
  gap: 10px;
}

.table-edit {
  padding: 0px 10px;
  grid-row: 1;
  grid-column: 3;
}

.table-header {
  grid-row: 1;
  grid-column: 2;
}

.card {
  background: white;
  border: 1px solid #efefef;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.card-body {
  display: grid;
}

.header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 11em;
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border: 1px solid var(--icon-colour);
}

.header-left {
  grid-column: 1;
}

.header-right {
  grid-column: 2;
}
</style>