// Fetch data for visulisation
const axios = require('axios');

function fetchUsers() {
    const baseURI = "https://updates.suade.org/files/people.json";
    axios.get(baseURI).then(result => {
        this.customers = result.data;
    });
};

fetchUsers();