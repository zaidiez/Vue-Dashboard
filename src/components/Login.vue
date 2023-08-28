<template>
    <div class="Login-template row">
        <div class="background col-lg-7">
            <img src="../assets/bg.jpg" alt="" width="100%">
        </div>
        <!-- Log in form -->
        <div class="col-lg-5" id="myForm">
            <form @submit.prevent="LoginUser">
                <h3>Log In</h3>

                <!-- getting email -->
                <div class="mb-3 mt-5">
                    <label>Email address</label>
                    <input type="email" v-model="email" class="form-control form-control-lg mb-3"
                        placeholder="Enter your Email Address" required />
                </div>
                <div class="mb-3">

                    <!-- getting password -->
                    <label>Password</label>
                    <input type="password" v-model="password" class="form-control form-control-lg mb-3"
                        placeholder="Enter Your Password" required />
                </div>
                <button type="submit" class="btn btn-dark btn-lg btn-block mb-3">
                    Log In
                </button>

                <!-- loggin in through social media -->
                <div class="social-icons mb-3">
                    Log in with
                    <ul class="mt-3">
                        <li><a id="fb" href="#"><i><img src="../assets/facebook.svg" alt=""></i></a></li>
                        <li><a id="ig" href="#"><i><img src="../assets/instagram.svg" alt=""></i></a></li>
                        <li><a id="tw" href="#"><i><img src="../assets/twitter.svg" alt=""></i></a></li>
                    </ul>
                </div>
                <p id="signup">
                    <!-- create an account first -->
                    Don't have an Account?
                    <router-link to="/Signup">Signup</router-link>
                </p>
                <!-- create an account first -->
                <p id="registerStudent">
                    If you are not a Student?
                    <button>Register
                        <router-link to="/Registration"></router-link>
                    </button>
                </p>
            </form>
        </div>
    </div>
</template>
<script>
import router from '@/router';
import axios from 'axios';

export default {
    name: 'Login',
    data() {

        // making data field for getting data
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        //log in user function
        async LoginUser() {

            // getting logged user data from input fields
            // let email = this.email;
            // let password = this.password;
            // let loggedUser;

            // getting data from my storage of all users
            // let getCurrentuser = localStorage.getItem("myAllusers");
            // let userArray = JSON.parse(getCurrentuser);

            // moving through the array to match my logged user
            // userArray.forEach((user) => {
            //     if (email == user.email && password == user.password) {
            //         loggedUser = user
            //     }
            // });


            const response = await axios.post('http://192.168.11.212:8080/users/login', {
                email: this.email,
                password: this.password,
            })
            const { message, token, refreshToken } = response.data;
            if (token==null){
                
                // No user matching the email and password was found
                alert("Invalid login credentials");
            }
            
            else{
                // A user matching the email and password was found
                alert("User logged in Successfully");
                router.push("/Dashboard");

            }

        }
    }
}
</script>
<style scoped>
@media screen and (max-width:768px) {

    .background {
        display: none;
    }
}

.Login-template {
    height: 100%;
    align-items: center;
}

#myForm {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    margin: 0;
}

#myForm form {
    box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 20px;
}

#myForm h3 {
    margin: 15px
}

#myForm label {
    display: flex;
}

#myForm button {
    background: linear-gradient(to right, #182f58, #234fa6);
    border: none;
    font-weight: 600;
}

#myForm button:hover {
    background: linear-gradient(to left, #182f58, #234fa6);
    border: none;
    color: white;

}

#myForm input::placeholder {
    font-size: 11px;
    color: rgb(123, 123, 123);
}

#fb {
    background-color: #619efa;
}

#tw {
    background-color: #71c8fe;
}

#ig {
    background: linear-gradient(to right, #fdde79, #fca469, #f45a83);
}

body {
    display: flex;
    font-weight: 400;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.background {
    padding: 0;
}

.background img {
    height: 100vh;
    padding: 0;
}

.social-icons {
    text-align: center;
    font-size: 15px;
    color: #222222;
}

.social-icons ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.social-icons ul li {
    display: inline-block;
    vertical-align: middle;
    font-size: 15px;
}

.social-icons ul li a {
    display: block;
    font-size: 1.4em;
    margin: 0 5px;
    text-decoration: none;
    border-radius: 50%;
    padding: 1px;

}

.social-icons img {
    height: 40px;
    margin: 5px;
}

.social-icons ul li a i {
    -webkit-transition: all 0.2s ease-in;
    -moz-transition: all 0.2s ease-in;
    -o-transition: all 0.2s ease-in;
    -ms-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
}

#signup {
    margin-bottom: 50px;
}

#register p {
    margin-right: 20px;
}

#registerStudent button {
    background: linear-gradient(to left, #182f58, #234fa6);
    border-radius: 30px;
    border: none;
    color: white;
    height: 50px;
    width: 100px;
    margin: 10px;
}

#registerStudent button:hover {
    text-decoration: none;
    background: linear-gradient(to right, #182f58, #234fa6);
    transform: scale(1.1);
}
</style>