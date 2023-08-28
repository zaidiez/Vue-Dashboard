<template>
    <div class="users-main">
        <h2 class="users-title">Users</h2>
        <div v-if="fetching">
                <Loader/>
            </div>
        <table class="users-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in myUsers" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                        <b-button v-b-modal.modal-center @click="showUserDetails(user)" class="details-button">
                            <i class="fas fa-info-circle"></i> View Details
                        </b-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <b-modal id="modal-center" centered title="User Details">
                <div v-if="selectedUser">
                    <div class="address">
                        <h2 class="modal-heading">
                            {{ selectedUser.name }}
                        </h2>
                        <p class="modal-email">
                            Email:
                            {{ selectedUser.email }}
                        </p>
                    </div>
                    <div class="modal-content">
                        <div>
                            <h3 class="modal-subheading">
                            <b>Address</b>
                        </h3>
                        <p class="modal-address-item">
                            <b>City:</b> {{ selectedUser.address.city }}
                        </p>
                        <p class="modal-address-item">
                            <b>Geo Location: </b>{{ selectedUser.address.geo.lat }} {{
                                selectedUser.address.geo.lng }}
                        </p>
                        <p class="modal-address-item">
                            <b>Street: </b>{{ selectedUser.address.street }}
                        </p>
                        <p class="modal-address-item">
                            <b>Suite:</b> {{ selectedUser.address.suite }}
                        </p>
                        <p class="modal-address-item">
                            <b>Zipcode: </b>{{ selectedUser.address.zipcode }}
                        </p>
                        </div>
                        <div>
                            <h3 class="modal-subheading">
                            <b>Company</b>
                        </h3>
                        <p class="modal-address-item">
                            <b>bs:</b> {{ selectedUser.company.bs }}
                        </p>
                        <p class="modal-address-item">
                            <b>name:</b> {{ selectedUser.company.name }}
                        </p>
                        <p class="modal-address-item">
                            <b>catchPhrase: </b>{{ selectedUser.company.catchPhrase }}
                        </p>
                        </div>
                    </div>
                </div>
            </b-modal>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Loader from './Loader.vue';

export default {
    name: 'Users',
    data() {
        return {
            myUsers: [],
            selectedUser: null,
            fetching: false,
        };
    },
    created() {
        setTimeout(() => {
            this.getUsers();
        },2000)
        
    },
    mounted() {
        this.fetching = true;
        
    },
    methods: {
        getUsers() {
            const usersAPI = 'https://jsonplaceholder.typicode.com/users';
            axios
                .get(usersAPI)
                .then((response) => {
                this.myUsers = response.data;
                // Save the fetched data in local storage
                localStorage.setItem('externalStorage', JSON.stringify(this.myUsers));
            })
                .catch((error) => {
                alert('Error fetching data:', error);
            });
            this.fetching=false
        },
        showUserDetails(user) {
            // Set the selectedUser property to the clicked user
            this.selectedUser = user;
        }
    },
    components: { Loader }
}
</script>

<style scoped>
.users-main {
    padding: 10px;
    background-color: #f5f7f9;
    border-radius: 10px;
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
    margin: 5px 10px 30px 10px;
}

.users-title {
    text-align: center;
    color: #333;
    margin-bottom: 10px;
}

.users-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 10px;
    overflow: hidden;
}

.users-table th,
.users-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.users-table thead {
    background-color: #424141;
    color: white;
}

::v-deep .modal-header {
    border: none;
    color: rgb(255, 255, 255);
    background-color: rgba(112, 112, 112, 0.844);
    box-shadow: 0 1px 15px rgba(112, 112, 112, 0.7);
}

::v-deep .modal-header {
    background: linear-gradient(to right, #4570c6, #2a5bb6, #224b91);

}

::v-deep .modal-body {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

::v-deep .modal-content {
    padding: 10px;
}

::v-deep .modal-body .btn {
    height: 40px;
    width: 100px;
}

.modal-content h2.modal-heading {
    margin-top: 0;
    font-size: 28px;
    color: #007bff;
    text-align: center;
    margin-bottom: 10px;
}

.modal-content .modal-email {
    font-size: 16px;
    color: #555;
    text-align: center;
}

.modal-content h3.modal-subheading {
    font-size: 20px;
    color: #333;
    margin-bottom: 10px;
}

.modal-content .address .modal-address-item {
    margin: 5px 0;
    font-size: 16px;
    color: #555;
}

.users-table tbody tr:nth-child(even) {
    background-color: #f3f3f3;
}

.details-button {
    background: linear-gradient(to right, #2854aa, #204588, #173261);
    border: none;
    color: white;
    text-align: center;
    display: inline-block;
    font-size: 15px;
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 5px;
    padding: 10px;
}

.details-button:hover {
    background-color: #45a049;
}

.details-button i {
    margin-right: 5px;
}
</style>
