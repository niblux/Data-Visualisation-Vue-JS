<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Count</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="row in rows">
          <template v-for="col in columns">
            <tr v-for="item in row[col]" :key="item.id">
              <td>{{ item.name }}</td>
              <template v-if="item.edit">
                <input type="text" v-model.number="item.count" />
              </template>
              <template v-if="!item.edit">
                <td>{{ item.count }}</td>
              </template>
              <button v-on:click="setEdit($event, item)">Edit</button>
              <button v-show="item.edit" v-on:click="updateItem($event, item)">Save</button>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
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
    return {
      rows: [],
      editFlag: false
    };
  },
  mounted() {
    setTimeout(() => {
      const barData = JSON.parse(JSON.stringify(this.chartData));
      console.log('barData', barData);

      this.rows = barData;
    }, 1000);
  },
  methods: {
    setEdit(evt, item) {
      item.edit = !item.edit
      // console.log('evt', evt.target.innerHTML);
      // need to know which name the clicked count is related to 
      // so when we process the update it will update the correct item in the array
      // as in fruits.apple.count
      // this.editFlag = !this.editFlag
    }, 
    updateItem(evt, item) {
      item.edit = false;
      this.$store.dispatch('updateData', item)
      // console.log(item);
    }
  },
  computed: {
    columns: function columns() {
      let keys = ["fruits", "pets", "eyeColors"];
      return Object.values(keys);
    }
  }
};
</script>

<style>
table {
  font-family: "Open Sans", sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475c;
  margin: 10px 10px 0 10px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475c;
  color: #fff;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7d82a8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #d4d8f9;
}
</style>