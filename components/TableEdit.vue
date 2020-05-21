<template>
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
            <tr v-for="item in row" :key="item.id">
              <td>{{ item.name }}</td>
              <template v-if="item.edit">
              <td>
                <input class="table-input" type="text" v-model.number="item.count" />
                </td>
              </template>
              <template v-if="!item.edit">
                <td>{{ item.count }}</td>
              </template>
              <td>
              <button v-on:click="setEdit($event, item)">Edit</button>
              <button v-show="item.edit" v-on:click="updateItem($event, item)">Save</button>
              </td>
            </tr>
        </template>
      </tbody>
    </table>
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
      this.rows = barData;
    }, 1000);
  },
  methods: {
    setEdit(evt, item) {
      item.edit = !item.edit
    }, 
    updateItem(evt, item) {
      item.edit = false;
      this.$store.dispatch('updateData', item);
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
  width: 450px;
  border-collapse: collapse;
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
}

table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #efefef;
}

button {
    background: white;
    border-radius: 5px;
    padding: 5px;
    width: 50px;
    margin: 10px;
}

.table-input {
  background: none;
    border: none;
    font-size: 16px;
    font-family: 'Nunito';
}
</style>