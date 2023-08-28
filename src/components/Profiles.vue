<template>
    <div id="profile-main">
        <b-card-group columns>
            <b-card title="My Profile" img-top id="myProfile">
                <img src="../assets/User-Avatar.png" alt="">
                <b-card-text>
                    <div>Name: {{ myavatar }}</div>
                    <div>Email: {{ email }}</div>
                </b-card-text>
                <div>
                    <div v-for="bar in bars" class="row mb-1">
                        <div class="col-sm-4" id="myVariant">{{ bar.variant }}:</div>
                        <div class="col-sm-8 pt-1" id="myProgress">
                            <b-progress :value="bar.value" :variant="bar.variant" :key="bar.variant"></b-progress>
                        </div>
                    </div>
                </div>
            </b-card>

            <b-card header="Quote">
                <blockquote class="blockquote mb-0">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                    <footer class="blockquote-footer">
                        Someone famous in <cite title="Source Title">Source Title</cite>
                    </footer>
                </blockquote>
            </b-card>


            <b-card bg-variant="primary" text-variant="white">
                <blockquote class="card-blockquote">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                    <footer>
                        <small>Someone famous in <cite title="Source Title">Source Title</cite></small>
                    </footer>
                </blockquote>
            </b-card>

            <b-card>
                <b-card-title>Title</b-card-title>
                <b-card-text>
                    This card has supporting text below as a natural lead-in to additional content.
                </b-card-text>
                <b-card-text class="small text-muted">Last updated 3 mins ago</b-card-text>
            </b-card>
            <b-card title="Card title that wraps to a new line" id="userProfile">
                <img src="../assets/User-Avatar.png" alt="" img-top>
                <b-card-text>
                    This is a wider card with supporting text below as a natural lead-in to additional content.
                    This content is a little bit longer.
                </b-card-text>
            </b-card>

            <b-card img-src="https://picsum.photos/400/200/?image=41" img-alt="Image" img-top>
                <b-card-text>
                    This is a wider card with supporting text below as a natural lead-in to additional content.
                    This card has even longer content than the first.
                </b-card-text>
                <template #footer>
                    <small class="text-muted">Footer Text</small>
                </template>
            </b-card>
        </b-card-group>
    </div>
</template>

<script>
export default {
    name: "profile",
    data() {
        return {
            myProfiles: {},
            user: {},
            myavatar: "",
            bars: [
          { variant: 'Progress', value: 75 },
          { variant: 'Achievment', value: 75 },
          { variant: 'Portfolio', value: 75 },
          { variant: 'Discipline', value: 75 }
        ],
        timer: null
        }
    },
    mounted() {
      this.timer = setInterval(() => {
        this.bars.forEach(bar => (bar.value = 25 + Math.random() * 75))
      }, 2000)
    },
    beforeDestroy() {
      clearInterval(this.timer)
      this.timer = null
    },

    created() {
        this.checkUser();
        this.getUser();
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
                // let Fname = this.myProfiles.fname.toString();
                // let Lname = this.myProfiles.lname.toString();
                let email = this.myProfiles.email
                this.email = email
                // Slicing first index and concatenating
                let avatar = this.myProfiles.name;
                this.myavatar = avatar;
            }
        }
    }
}
</script>

<style scoped>
#userProfile img {
    height: 50px;   
}

#myProfile img {
    height: 200px;
    padding: 10px;
    border-radius: 50%;
    background-color: black;
}

#profile-main {
    margin: 5px 10px 30px 10px;
}

#myVariant{
    font-size: 10px;
}

.progress{
    width: 80%;
}

#myProgress{
    padding-left:0 !important ;
}
</style>