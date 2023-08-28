<template>
    <div class="users-main">
        <h2 class="users-title">Students</h2>
        <div class="loadingBar d-flex">
            <div class="d-flex">
                <div class="filterBar">
                    <img src="../assets/search.png" alt=""><input v-model="filterValue" @click="filterUser"
                        @keydown="enterKeyPress" placeholder="filter by name">
                </div>
                <div class="sorting">
                    <b-dropdown id="dropdown-1" text="Dropdown Button" class="custom-dropdown">
                        <template #button-content>
                            <img src="../assets/filter.png" alt="Image" class="custom-icon">
                        </template>
                        <b-dropdown-item @click="ascendingOrder"><img class="sortImg1" src="../assets/ascending.svg"
                                alt="">Ascending</b-dropdown-item>
                        <b-dropdown-item @click="descendingOrder"><img class="sortImg1" src="../assets/descending.svg"
                                alt="">Descending</b-dropdown-item>
                        <b-dropdown-item @click="approved"><img class="sortImg1" src="../assets/approved.png"
                                alt="">Approved</b-dropdown-item>
                        <b-dropdown-item @click="rejected"><img class="sortImg1" src="../assets/rejected.png"
                                alt="">Rejected</b-dropdown-item>
                        <b-dropdown-item @click="pending"><img class="sortImg1" src="../assets/pending.png"
                                alt="">Pending</b-dropdown-item>
                        <b-dropdown-item @click="getUsers"><img class="sortImg1" src="../assets/allStudents.png" alt="">All
                            Students</b-dropdown-item>
                    </b-dropdown>
                </div>
            </div>
            <!-- <div class="ascending d-flex row">
                <div id="filterBar col-lg-11">
                    <img src="../assets/search.png" alt=""><input v-model="filterValue" @click="filterUser"
                        @keydown="enterKeyPress" placeholder="filter by name">
                </div>
                <div class="sorting col-lg-1 row">
                    <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
                        <template #button-content>
                                <img src="../assets/filter.png" alt="Image" class="mr-2" style="height: 20px; width: 20px;">
                        </template>
                        <b-dropdown-item @click="ascendingOrder">Ascending</b-dropdown-item>
                        <b-dropdown-item @click="descendingOrder">Descending</b-dropdown-item>
                    </b-dropdown>
                </div>
            </div> -->
            <div v-if="fetch" class="loader">
                <Loading />
            </div>
        </div>
        <table class="users-table">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Details</th>
                    <th>Update Status</th>
                    <th>CV</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in myUsers">
                    <td>{{ user.firstName }}</td>
                    <td>{{ user.lastName }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                        <b-button v-b-modal.modal-center @click="showUserDetails(user)" class="details-button">
                            View Details
                        </b-button>
                    </td>
                    <td>
                        <b-button @click="openModalForUser(user)" class="update-button btn-dark">Update</b-button>
                        <template>
                            <b-modal v-model="modalShow" size="lg">
                                <div class="p-4">
                                    <b-form-checkbox-group v-model="selected" :options="options" class="mb-3"
                                        value-field="item" text-field="name"
                                        disabled-field="notEnabled"></b-form-checkbox-group>
                                </div>
                            </b-modal>
                        </template>

                    </td>
                    <td>
                        <b-button @click="download(user)" class="download-button btn-light">
                            <img src="../assets/download.png" alt="">
                        </b-button>
                    </td>
                    <td>
                        <div>
                            <div v-if="loadingUser == user.id" class="loader">
                                <Loader />
                            </div>
                            <div v-else :class="['status-badge', getStatus(user.isApproved)]">
                                {{ getStatus(user.isApproved) }}
                            </div>

                        </div>
                    </td>
                </tr>
            </tbody>

        </table>
        <div>
            <b-modal id="modal-center" centered title="User Details">
                <div v-if="selectedUser">
                    <div class="address">
                        <h2 class="modal-heading">
                            {{ selectedUser.firstName + '' + selectedUser.lastName }}
                        </h2>
                        <p class="modal-email">
                            Email:
                            {{ selectedUser.email }}
                        </p>
                    </div>
                    <div class="modal-content">
                        <div>
                            <h3 class="modal-subheading">
                                <b>Personal Details</b>
                            </h3>
                            <p class="modal-address-item">
                                <b>Phone Number:</b> {{ selectedUser.phoneNumber }}
                            </p>
                            <p class="modal-address-item">
                                <b>Education: </b>{{ selectedUser.education }}
                            </p>
                            <p class="modal-address-item">
                                <b>Age: </b>{{ selectedUser.age }}
                            </p>
                            <p class="modal-address-item">
                                <b>Gender:</b> {{ selectedUser.gender }}
                            </p>
                            <p class="modal-address-item">
                                <b>Date of Birth: </b>{{ selectedUser.dateOfBirth }}
                            </p>
                            <p class="modal-address-item">
                                <b>Address: </b>{{ selectedUser.address }}
                            </p>
                            <p class="modal-address-item">
                                <b>CNIC: </b>{{ selectedUser.cnic }}
                            </p>
                        </div>
                    </div>
                </div>
            </b-modal>
        </div>
        <div class="overflow-auto">
            <div class="mt-3" id="pagination">
                <b-pagination v-model="currentPage" pills :total-rows="pageCount" :per-page="perPage" @change="getUsers">
                </b-pagination>
            </div>
        </div>
    </div>
</template> 

<script>
import axios from 'axios';
import Loading from './Loading.vue';
import Loader from './Loader.vue';
import Vue from 'vue';

export default {

    name: 'UserRegistration',
    data() {
        return {
            myUsers: [],
            // fetching: false,
            fetch: false,
            selectedUser: null,
            currentPage: 1,
            modalShow: false,
            pageCount: 0,
            perPage: 10,
            filterValue: '',
            selected: [],
            options: [
                { item: 'A', name: 'Approve' },
                { item: 'B', name: 'Reject' },
            ],
            status: '',
            currentUser: null,
            loadingUser: null,
        };
    },
    // watch: {
    //     currentPage(oldValue, newValue) {
    //         if (oldValue !== newValue) {
    //             this.getUsers()
    //         }
    //     }
    // },
    watch: {
        currentPage() {
            this.getUsers();
        },
        selected(newSelected) {
            if (newSelected.includes('A')) {
                this.approveUser(this.currentUser);
            }
            if (newSelected.includes('B')) {
                this.disapproveUser(this.currentUser);
            }
        },
    },

    created() {
        setTimeout(() => {
            this.getUsers();
        }, 1000)
        // setTimeout(() => {
        //     this.approveUser();
        // }, 200)
        // setTimeout(() => {
        //     this.disapproveUser();
        // }, 200)


    },
    mounted() {
        // this.fetching = true;
        this.fetch = true;

    },

    methods: {
        async userStatus() {
            try {
                const response = await axios.get(`http://192.168.11.212:8080/users/fetch`);
                this.status = response.data.users.isApproved;
                console.log(this.status)

            } catch (error) {
                console.error(error);
            }
        },


        async getUsers() {
            this.fetch = true;
            try {
                const response = await axios.get(`http://192.168.11.212:8080/users/fetch?name=${this.filterValue}&page=${this.currentPage}&ascending=1`);
                this.myUsers = response.data.users;
                this.status = response.data.users.isApproved;

                if (this.status == 0) {
                    this.status = 'Rejected'
                }
                else if (this.status == 1) {
                    this.status = 'Approved'
                }

                else {
                    this.status = 'Pending'
                }

                this.pageCount = response.data.pageCount * this.perPage;

            } catch (error) {
                console.error(error);
            }
            this.fetch = false;
        },

        enterKeyPress(event) {
            if (event.key == 'Enter') {
                this.filterUser()
            }
        },

        async filterUser() {
            try {
                const response = await axios.get(`http://192.168.11.212:8080/users/fetch?name=${this.filterValue}&page=${this.currentPage}&ascending=1`);
                this.myUsers = response.data.users;

                this.filterValue = ""

            } catch (error) {
                console.error(error);
            }
        },

        async ascendingOrder() {
            try {
                const response = await axios.get(`http://192.168.11.212:8080/users/fetch?name=${this.filterValue}&page=${this.currentPage}&ascending=1`);
                this.myUsers = response.data.users;


            } catch (error) {
                console.error(error);
            }
        },

        async descendingOrder() {
            try {
                const response = await axios.get(`http://192.168.11.212:8080/users/fetch?name=${this.filterValue}&page=${this.currentPage}&ascending=0`);
                this.myUsers = response.data.users;


            } catch (error) {
                console.error(error);
            }
        },
        async approved() {
            try {
                const response = await axios.get(`http://192.168.11.212:8080/users/fetch?name=${this.filterValue}&page=${this.currentPage}&ascending=0&isApproved=1`);
                this.myUsers = response.data.users;
                this.status = response.data.users.isApproved;


            } catch (error) {
                console.error(error);
            }
        },
        async rejected() {
            try {
                const response = await axios.get(`http://192.168.11.212:8080/users/fetch?name=${this.filterValue}&page=${this.currentPage}&ascending=0&isApproved=0`);
                this.myUsers = response.data.users;
                this.status = response.data.users.isApproved;


            } catch (error) {
                console.error(error);
            }
        },
        async pending() {
            try {
                const response = await axios.get(`http://192.168.11.212:8080/users/fetch?name=${this.filterValue}&page=${this.currentPage}&ascending=0&isApproved=-1`);
                this.myUsers = response.data.users;
                this.status = response.data.users.isApproved;


            } catch (error) {
                console.error(error);
            }
        },

        showUserDetails(user) {
            // Set the selectedUser property to the clicked user
            this.selectedUser = user;
        },

        getStatus(isApproved) {
            if (isApproved == 0) {
                return this.status = 'Rejected';
            } else if (isApproved == 1) {
                return this.status = 'Approved';;
            } else {
                return this.status = 'Pending';
            }
        },

        async approveUser(user) {
            // this.fetching = true;
            try {
                if (this.currentUser) {
                    await Vue.axios.put(`http://192.168.11.212:8080/users/approve?id=${user.id}&isApproved=1`);
                    this.loadingUser = user.id;
                    user.isApproved = 1; // Update the user's isApproved property


                }
            } catch (error) {
                console.error(error);
            } finally {
                setTimeout(() => {
                    this.loadingUser = null;
                }, 2000);
            }
            // this.fetching = false;
        },
        async disapproveUser(user) {
            // this.fetching = true;
            try {
                if (this.currentUser) {
                    await Vue.axios.put(`http://192.168.11.212:8080/users/approve?id=${user.id}&isApproved=0`);
                    this.loadingUser = user.id;
                    user.isApproved = 0; // Update the user's isApproved property

                    this.selected = null
                }
            } catch (error) {
                console.error(error);
            } finally {
                setTimeout(() => {
                    this.loadingUser = null;
                }, 2000);
            }
            // this.fetching = false;
        },
        openModalForUser(user) {
            this.currentUser = user; // Set the currentUser before opening the modal
            this.modalShow = true; // Open the modal
            this.selected = null
        },
        async download(user) {
            try {
                const response = await Vue.axios.get(`http://192.168.11.212:8080/users/download-cv?id=${user.id}`, {
                    responseType: 'blob'
                });

                const contentDisposition = response.headers['content-disposition'];
                let filename = `${user.firstName}_CV`;
                if (contentDisposition) {
                    const matches = contentDisposition.split(';')
                        .find(n => n.includes('filename='))
                        .replace('filename=', '')
                        .trim();
                    if (matches) {
                        filename = matches.replace(/['"]/g, '');
                    }
                }

                const blob = new Blob([response.data], { type: response.headers['content-type'] });
                const url = window.URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = url;

                link.download = filename;
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
            } catch (error) {
                console.error(error);
            }
        }

    },
    components: { Loading, Loader },
}
</script>

<style scoped>
body {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.loadingBar {
    justify-content: space-between;
    align-items: center;
}

.ascending {
    margin: 0;
}

/* Base class for common stylings */
.status-badge {
    font-size: 15px;
    font-weight: bold;
    border: 1px solid transparent;
    border-radius: 5px;
    padding: 5px 5px;
    transition: background-color 0.3s, border 0.3s, box-shadow 0.3s;
}

.status-badge:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.Approved {
    color: rgb(35, 174, 35);
    background-color: rgba(35, 174, 35, 0.1);
    border-color: rgba(35, 174, 35, 0.779);
}

.Rejected {
    color: rgb(255, 0, 0);
    background-color: rgba(255, 0, 0, 0.1);
    border-color: rgba(255, 0, 0, 0.821);
}

.Pending {
    color: rgb(243, 144, 30);
    background-color: rgba(243, 144, 30, 0.1);
    border-color: rgba(243, 144, 30, 0.757);
}

.loader {
    margin-top: 20px;
}

.filterBar {
    text-align: end;
    border-radius: 20px;
    background-color: white;
    width: 300px;
    padding: 5px;
    margin: 10px;
    box-shadow: 1px 1px 5px rgba(110, 109, 109, 0.9);
}

.filterBar:hover {
    box-shadow: 1px 1px 10px rgba(110, 109, 109, 0.9);
}

.filterBar input {
    border: none;
    border-radius: 20px;
    width: 90%;
    padding: 0;
    margin: 0;
    outline: none;
    font-size: 14px;
}

.filterBar img {
    height: 20px;
    margin-right: 5px;
}

.users-main {
    padding: 10px;
    background-color: #f5f7f9;
    border-radius: 10px;
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
    margin: 5px 10px 30px 10px;
    text-align: start;
    height: 90vh;
}

.custom-icon {
    height: 20px;
    width: 15px;
}

::v-deep .custom-dropdown .btn-secondary {
    background-color: transparent;
    border: none;
    /* box-shadow: 1px 1px 5px rgba(110, 109, 109, 0.9); */
}

::v-deep .custom-dropdown .btn-secondary.clicked {
    outline: none;
    border: none;
    /* background-color: white; */
}

::v-deep .custom-dropdown .btn-secondary::after {
    display: none;
}

::v-deep .custom-dropdown li {
    height: 60px;
    margin: 5px;
    width: 300px;
    font-size: 16px;
}

::v-deep .custom-dropdown .dropdown-item {
    padding: 10px;
}

::v-deep .custom-dropdown .dropdown-item:hover {
    background-color: rgb(215, 239, 254);
    border-radius: 10px;
    /* padding: 10px; */
}

.sorting {
    display: flex;
    align-items: center;
}

.sortImg1 {
    height: 40px;
    width: 40px;
    margin-right: 10px;
    background: linear-gradient(to left, #557dcec2, #4076dbbe, #2e63bfcb);
    padding: 5px;
    border-radius: 50%;
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
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
}

.users-table th,
.users-table td {
    padding: 15px 10px;
    text-align: center;
    border-bottom: 2px solid #f0f0f0;
}

.users-table thead {
    background-color: #333;
    color: white;
    font-weight: 600;

}
.users-table tbody tr:hover {
    background-color: #f7f7f7;
}
.users-table tr:last-child td {
    border-bottom: none;
}


::v-deep .modal-header {
    border: none;
    color: rgb(255, 255, 255);
    background-color: rgba(112, 112, 112, 0.844);
    box-shadow: 0 1px 15px rgba(112, 112, 112, 0.7);
}

::v-deep .modal-header button {
    color: rgb(255, 255, 255);
}

::v-deep .modal-content {
    max-width: 400px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    font-family: Arial, sans-serif;
    color: #333;
    margin-right: 0 !important;
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
    background: linear-gradient(to right, #4570c6, #2a5bb6, #224b91);
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
    background: linear-gradient(to left, #4570c6, #2a5bb6, #224b91);
}

.details-button i {
    margin-right: 5px;
}

.download-button img {
    height: 15px;
}

.download-button {
    box-shadow: 0 0 2px 1px rgba(139, 139, 139)
}

.pagination {
    justify-content: center;
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
</style>
