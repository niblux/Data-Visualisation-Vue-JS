// Fetch data for visulisation
const axios = require('axios');

function fetchUsers() {
    const baseURI = "https://updates.suade.org/files/people.json";
    axios.get(baseURI).then(result => {
        console.log("reseses", result.data);
        this.customers = result.data;
    });
};

fetchUsers();