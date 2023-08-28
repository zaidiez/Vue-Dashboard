<template >
    <div class="dashboard" id="mybackground">
        <!-- navbvar -->
        <div id="navOffcanvas">
            <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
                <template #default="{ hide }">
                    <div class="p-2" id="myoffCanvas">
                        <b-button variant="" block @click="hide" id="close">
                            <img src="../assets/cross.png" alt="">
                        </b-button>
                        <div class="logo">
                            <h1>Dashboard</h1>
                            <img src="../assets/bg.jpg" alt="Logo">
                        </div>
                        <nav class="mb-3">
                            <b-nav vertical>
                                <router-link class="menu-link" to="/Dashboard/User">
                                    <li class="menu-item">
                                        <img class="menu-icon" src="../assets/Users.svg" alt="">Users
                                    </li>
                                </router-link>
                                <!-- Profiles -->
                                <router-link class="menu-link" to="/Dashboard/Profiles">
                                    <li class="menu-item">
                                        <img class="menu-icon" src="../assets/Profiles.svg" alt="">Profiles
                                    </li>
                                </router-link>
                                <router-link class="menu-link" to="/Dashboard/userRegistration">
                                    <li class="menu-item">
                                        <img class="menu-icon" src="../assets/students.png" alt="">Students
                                    </li>
                                </router-link>
                                <li class="menu-item">
                                    <img class="menu-icon" src="../assets/Profiles.svg" alt="">Teachers
                                </li>
                            </b-nav>
                        </nav>
                    </div>
                </template>
            </b-sidebar>
        </div>
        <div class="myNavbar">
            <div class="logo">
                <h1>Dashboard</h1>
                <img src="../assets/bg.jpg" alt="Logo">
            </div>
            <div class="menu">
                <ul>
                    <!-- userlink -->
                    <router-link class="menu-link" to="/Dashboard/User">
                        <li class="menu-item">
                            <img class="menu-icon" src="../assets/Users.svg" alt="">Users
                        </li>
                    </router-link>
                    <!-- Profiles -->
                    <router-link class="menu-link" to="/Dashboard/Profiles">
                        <li class="menu-item">
                            <img class="menu-icon" src="../assets/Profiles.svg" alt="">Profiles
                        </li>
                    </router-link>
                    <router-link class="menu-link" to="/Dashboard/userRegistration">
                        <li class="menu-item">
                            <img class="menu-icon" src="../assets/students.png" alt="">Students
                        </li>
                    </router-link>
                    <li class="menu-item">
                        <img class="menu-icon" src="../assets/Profiles.svg" alt="">Teachers
                    </li>
                </ul>
            </div>
        </div>
        <!-- header -->
        <div class="main">
            <div class="welcome-message row d-flex">
                <div class="col-lg-1 col-md-1 col-sm-1 mymenu">
                    <b-button v-b-toggle.sidebar-no-header class="menu-button">
                        <div>
                            <img src="../assets/menu.png" alt="">
                        </div>
                    </b-button>
                </div>
                <div id="head" class="col-lg-10 col-md-10 col-sm-10">
                    <h2> Welcome back, &nbsp;<span class="user-name">{{
                        myProfiles.name }}</span>
                        <span id="avatar">{{ this.myavatar }}</span>
                    </h2>
                </div>
                <!-- logout user -->
                <div id="logoutIcon" class="col-lg-1 col-md-1 col-sm-1" @click.prevent="LogoutUser">
                    <img src="../assets/logout.svg" alt="logout" class="logout-icon">
                </div>
            </div>
            <!-- Table for displaying users -->
            <div class="table-responsive">
                <router-view></router-view>
            </div>
        </div>

        <!-- chatbox -->
        <div class="chatbox">
            <div class="messages" @click="toggleChatbox">
                <img src="../assets/sms-solid.svg" alt="Messages" width="40px" height="40px">
            </div>
            <div class="chatbox_item d-flex" v-if="showChatbox" :class="{ 'active': showChatbox }">
                <div class="img-head d-flex">
                    <div class="img-head-top d-flex">
                        <div id="userName">
                            <span>{{ myProfiles.name }}</span>
                        </div>
                        <div>
                            <span><img class="profiles" src="../assets/chatbox-item.png" alt="" height="30px"></span>
                            <span><img class="profiles" src="../assets/chatbox-item1.png" alt="" height="30px"></span>
                            <span><img class="profiles" src="../assets/chatbox-item2.png" alt="" height="30px"></span>
                        </div>
                    </div>
                    <h3 class="Hi">Hi There <img src="../assets/hand.png" alt="" height="40px"> How can we Help
                        you
                        today?</h3>
                </div>
                <div id="chatArea">
                    <div class="msgs" v-for="message in myMessages" :key="message.text">
                        <!-- <div :class="{ 'sent-message': message.sent,'received-message': !message.sent}">
                            {{ message.text }}
                        </div> -->
                        <div :class="{ 'sent-message': message.sent, 'received-message': !message.sent }">
                            {{ message.text }}
                            <span class="tail"></span>
                        </div>
                    </div>
                </div>
                <div class="message-item">
                    <div id="app" class="send-message d-flex">
                        <div>
                            <p class="sm-foot">
                                <input type="text" v-model="message" placeholder="Enter your message..."
                                    @keydown="enterKeyPress">
                            </p>
                        </div>
                        <div>
                            <button @click="sendMessage">
                                <img src="../assets/play-solid.svg" alt="">
                            </button>
                        </div>
                    </div>
                    <div class="homeBox d-flex">
                        <div class="home">
                            <img src="../assets/house-solid.svg" alt="" height="20px">
                            <p>Home</p>
                        </div>
                        <div class="chat_message">
                            <img src="../assets/message-regular.svg" alt="" height="20px">
                            <p>Messages</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>`
<script>
import router from '@/router';
import { io } from 'socket.io-client';

export default {
    name: 'Dashboard',
    data() {
        return {
            myProfiles: {},
            user: {},
            myavatar: "",
            showChatbox: false,
            message: "",
            socket: null,
            myMessages: [],
        }
    },
    // Call checkUser and getUser when the component is created
    created() {
        this.checkUser();
        this.getUser();
        try {
            this.socket = io("http://192.168.11.212:8080/"); // Your Socket.IO server URL
            this.socket.on("connection", () => {
            });

            this.socket.on("chat message", (data) => {
                // Handle incoming messages from the server
                "Received message:", data;
                this.myMessages.push({
                    text: data,
                    sent: false,
                });
            });

            this.socket.on("disconnect", () => {
                console.log("Disconnected from Socket.IO server");
            });
        } catch (error) {
            console.error("Error connecting to Socket.IO server:", error);
        }
    },
    methods: {
        checkUser() {

            let checkUser = localStorage.getItem("loggedUser");
            if (!checkUser) {
                // Check if user data is null or undefined
                alert("Login first please!");
                // Routing back to the login page
                router.push("/Login");
            }
        },
        getUser() {
            // Getting data back from logged user storage
            let getUsers = localStorage.getItem("loggedUser");

            if (getUsers) { // Check if user data exists in local storage
                this.myProfiles = JSON.parse(getUsers);

                // Making avatar sign
                let name = this.myProfiles.name.toString();

                // Slicing first index and concatenating
                let myName = name.split(" ");
                let initials = myName.map(name => name[0]).join("");
                // console.log(initials)
                this.myavatar = initials;
            }
        },
        LogoutUser() {
            // Removing data from storage
            localStorage.removeItem("loggedUser");

            // Routing back to the login page
            router.push("/Login");
        },
        toggleChatbox() {
            this.showChatbox = !this.showChatbox;
        },
        enterKeyPress(event) {
            if (event.key == 'Enter') {
                this.sendMessage();
            }
        },
        sendMessage() {
            if (this.message.trim() == "") {
                return;
            }

            this.socket.emit("chat message", this.message);
            this.myMessages.push({
                text: this.message,
                sent: true,
            });
            // Clear the input field after sending
            this.message = "";
            console.log(this.myMessages)
        }
    }
}
</script>

<style scoped>
@media screen and (max-width:768px) {
    .myNavbar {
        display: none !important;
    }

    .menu-button {
        display: block !important;
    }

    #myoffCanvas {
        display: block !important;
        width: auto !important;
    }
}

@media screen and (max-width:425px) {
    .myNavbar {
        display: none !important;
    }

    .menu-button {
        display: block !important;
        background: transparent;
        border: none;
        padding: 0 !important;
    }

    #myoffCanvas {
        display: block !important;
        width: auto !important;
    }

    .welcome-message {
        flex-wrap: nowrap !important;
    }

    .menu-button img {
        height: 15px;
        color: #f5f5f5;
        padding-left: 0 !important;
    }

    .welcome-message img.logout-icon {
        height: 20px;
        transition: all 0.3s ease;
        width: 15px;
        text-align: end;
    }

    .welcome-message h2 {
        font-weight: 600;
        color: #333;
        text-align: end;
        font-size: 15px !important;
        padding-bottom: 5px;
        display: flex;
        justify-content: end;
        align-items: center;
        margin-bottom: 0;

    }

    #avatar {
        font-size: 15px !important;
    }

}

#mybackground {
    background-image: url(../assets/bg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
}

#close {
    text-align: end;
    background: linear-gradient(to right, #152f5b, #2c5bb9);
    border: none;
    padding: 0;
    margin: 0;
}

.menu-button {
    display: none;
    background-color: transparent;
}

.menu-button img {
    height: 20px;
}

#myoffCanvas {
    width: auto;
    display: none;
    background: linear-gradient(to right, #152f5b, #2c5bb9);
    color: white;
    width: 250px;
    box-shadow: 2px 2px 25px rgb(0, 0, 0);
    transition: all 0.3s ease-in-out;
    height: 120vh;
}

.dashboard {
    display: flex;
    font-family: Arial, sans-serif;
    overflow: scroll;
}

.myNavbar {
    height: 110vh;
    background: linear-gradient(to right, #152f5b, #2c5bb9);
    color: white;
    width: 250px;
    box-shadow: 1px 1px 30px rgb(2, 1, 1);
    transition: all 0.3s ease-in-out;

}

.logo {
    font-size: 1.5em;
    /* margin-bottom: 20px; */
    padding: 30px 30px 0 30px;
    text-align: center;
}

.logo h1 {
    font-size: 28px;
    font-weight: bold;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    text-transform: uppercase;
    margin-bottom: 20px;
}

.logo img {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    box-shadow: 0px 10px 10px 0px rgba(255, 255, 255, 0.1);
    /* margin-bottom: 20px; */
}

.menu {
    margin-top: 20px;
}

.menu ul {
    list-style-type: none;
    padding: 0;
}

.menu-icon {
    height: 30px;
    width: 30px;
    background-color: white;
    padding: 5px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
}

.menu-item {
    color: white;
    display: flex;
    align-items: center;
    font-size: 20px;
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.333);
    transition: all 0.3s ease-in-out;
}

.menu-link {
    text-decoration: none;
}

.menu-item:hover {
    background-color: #365187;
}

.menu-item:hover .menu-icon {
    box-shadow: 0px 10px 10px 0px rgba(255, 255, 255, 0.1);
}

.main {
    flex-grow: 1;
    padding: 5px 0 30px 0;
}

.welcome-message {
    margin: 10px;
    background: #f5f5f5;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    align-items: center;
}

.welcome-message img.logout-icon {
    height: 30px;
    transition: all 0.3s ease;
    width: 25px;
    text-align: end;
}

#logoutIcon {
    padding-right: 0;
    /* margin-right: 0; */
    text-align: end;
}

#avatar {
    background-color: #234fa6;
    color: white;
    padding: 10px;
    margin-left: 15px;
    border-radius: 50%;
    font-size: 20px;
    font-weight: 100;
    transition: all 0.3s ease;
    box-shadow: 1px 1px 10px rgb(106, 106, 106);
}

#avatar:hover {
    transform: scale(1.1);
    background-color: #234fa6;
    color: white;
    cursor: pointer;
}

.welcome-message img.logout-icon:hover {
    transform: scale(1.4);
    cursor: pointer;
}

.welcome-message h2 {
    font-weight: 600;
    color: #333;
    text-align: end;
    font-size: 25px;
    padding-bottom: 5px;
    display: flex;
    justify-content: end;
    align-items: center;
    margin-bottom: 0;

}

.welcome-message .user-name {
    color: #234fa6;
    font-style: italic;
}

.messages {
    padding: 6px;
    position: fixed;
    bottom: 3%;
    right: 3%;
    color: rgb(255, 255, 255);
    z-index: 1;
    background: linear-gradient(to right, #b8d2ff, #588aee);
    border-radius: 50%;
    box-shadow: 0 0 5px rgb(255, 255, 255);
}

.messages:hover {
    cursor: pointer;
}

.chatbox_item.active {
    /* display: flex !important; */
    position: fixed;
    bottom: 12%;
    right: 3%;
    /* z-index: 999999; */
}

#userName {
    color: white;
    background-color: lightskyblue;
    border-radius: 20px;
    padding: 10px 30px 10px 30px;
    font-weight: 900;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.chatbox_item {
    height: 650px;
    width: 500px;
    background-color: rgb(255, 255, 255);
    text-align: center;
    /* border-bottom: solid 1px rgb(191, 239, 255); */
    border-radius: 40px;
    box-shadow: 0 0 5px #00000033;
    position: relative;
    flex-direction: column;
    justify-content: space-between;

}

#chatArea {
    background-color: rgb(218, 232, 248);
    height: 100vh;
    width: 100%;
    margin: 0 auto;
    padding: 10px 20px 0 20px;
    overflow-y: auto;
}

.sent-message,
.received-message {
    padding: 10px 15px;
    margin: 5px 0;
    border-radius: 10px;
    position: relative;
    width: fit-content;

}

.sent-message {
    background-color: white;
    color: black;
    top: 0%;
    left: 0%;
}

.received-message {
    background-color: #000000;
    color: rgb(255, 255, 255);
    top: 0%;
    left: 40%;
}

.tail {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 10px solid transparent;
}

.sent-message .tail {
    border-right-color: white;
    border-left: none;
    border-top: none;
    left: -10px;
    top: 10px;
}

.received-message .tail {
    border-left-color: #000000;
    border-right: none;
    border-top: none;
    right: -10px;
    top: 10px;
}

.img-head {
    height: 150px;
    background-image: url(../assets/bg.jpg);
    border-radius: 40px 40px 0 0;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 30px 30px 30px 30px;
    flex-direction: column;
    justify-content: space-between;
}

.Hi {
    color: rgb(255, 255, 255);
    margin-top: 30px;
    font-size: 20px;
    font-weight: 900;
    background-color: transparent;
}

.Hi img {
    background-color: white;
    border-radius: 50%;
}

.img-head-top {
    justify-content: space-around;
}

.profiles {
    border-radius: 50%;
}

.send-message {
    position: absolute;
    background-color: white;
    width: 80%;
    height: 60px;
    top: 80%;
    right: 10%;
    border-radius: 10px;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    padding: 20px;
    text-align: start;
}

.send-message input {
    width: 300px;
    height: 50px;
    border: none;
    outline: none;
    margin: 2px 0 2px 0;
}

.send-message input::placeholder {
    color: rgba(79, 79, 79, 0.513);
}

/* .send-message input:hover {
    outline: auto;
    outline-color: #98b6f3e3;
} */

.send-message img {
    height: 10px;
    margin: 10px;
}

.send-message button {
    border: none;
    border-radius: 20px;
}

.send-message button:hover {
    background-color: lightskyblue;
    ;
}

.sm-head {
    color: black;
    font-weight: 400;
    font-size: 15px;
    margin: 0;
    text-align: start;
}

.sm-head:hover {
    color: #234fa6;
    ;
    cursor: pointer;
}

.sm-foot {
    color: rgb(122, 116, 116);
    font-size: 12px;
    margin: 0;
}

.message-item {
    justify-content: space-around;
    box-shadow: -10px -15px 15px rgba(0, 0, 0, 0.03);
    padding: 20px 0 10px 0;
    color: rgb(105, 102, 102);
    background-color: white;
    border-radius: 0 0 40px 40px;
}

.chat_message:hover {
    color: #234fa6;
    cursor: pointer;
}

.home:hover {
    color: #234fa6;
    cursor: pointer;
}

.home {
    font-size: 15px;
}

.home p {
    margin: 2px;
}

.chat_message {
    font-size: 15px;
}

.chat_message p {

    margin: 2px;
}

.homeBox {
    justify-content: space-around;
    align-items: center;
}
</style>