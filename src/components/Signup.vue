<template>
  <div class="Signup-template">
    <div id="myForm">
      <form @submit.prevent="createUser">
        <h3 class="mb-5 mt-3">Sign Up</h3>

        <!-- entering first name -->
        <div class="details mb-2">
          <label>Full Name</label>
          <input type="text" class="form-control form-control-lg" v-model="name" placeholder="Enter your First Name"
            required />
        </div>

        <!-- entering email address -->
        <div class="details mb-2">
          <label>Enter your Email</label>
          <input type="text" class="form-control form-control-lg" v-model="email" placeholder="Enter your Email Address"
            required />
        </div>

        <!-- entering password once -->
        <div class="details mb-2">
          <label>Password</label>
          <input type="password" class="form-control form-control-lg" v-model="password1" placeholder="Enter a Password"
            required />
        </div>

        <!-- confirming password -->
        <div class="details mb-2">
          <label>Confirm Password</label>
          <input type="password" class="form-control form-control-lg mb-2" v-model="password2"
            placeholder="Enter the same Password" required />
        </div>

        <button type="submit" class="btn btn-dark btn-lg btn-block mb-3">Sign Up</button>

        <!-- signing up using social media -->
        <div class="social-icons">
          Sign up using
          <ul class="">
            <li><a id="fb" href="#"><i><img src="../assets/facebook.svg" alt=""></i></a></li>
            <li><a id="ig" href="#"><i><img src="../assets/instagram.svg" alt=""></i></a></li>
            <li><a id="tw" href="#"><i><img src="../assets/twitter.svg" alt=""></i></a></li>
          </ul>
        </div>

        <!-- going back to login screen -->
        <p id="backTologin" class="mb-3 mt-3">
          Back to
          <router-link to="/Login">Login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import router from '@/router'
import VueAxios from 'vue-axios'

export default {
  name: 'Signup',

  //properties stored for every user
  data() {
    return {
      allUsers: [],
      name: "",
      email: "",
      password1: "",
      password2: ""
    }
  },

  methods: {
    // Create user fucntion
    async createUser() {

      // storing values of properoties against variables
      let name = this.name
      let email = this.email
      let password = this.password1
      let confirmPassword = this.password2
      let userId = 0;

      //Iteriating id according to the allusers array
      // userId = this.allUsers.length + 1

      //validating password
      if (password !== confirmPassword) {
        alert("Password does not match");
      }
      else{

        //adding users to allusers array
        // this.allUsers.push({
        //   userId: userId,
        //   name: name,
        //   email: email,
        //   password: password
        // })

        //storing data in local storage
        // let myUsers = JSON.stringify(this.allUsers);
        // localStorage.setItem("myAllusers", myUsers);

        const response  = await axios.post('http://192.168.11.212:8080/users/signup',{
          fullName: this.name,
          email: this.email,
          password: this.password1
        })
        const {message, user} = response.data;

        alert("User Created Successfully!");

        router.push("/Login");
      } 
    },
    
    // making sure data is not lost after page refreshes
    mounted() {
        this.createUser();
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

.Signup-template {
  background-image: url(../assets/bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}

#myForm {
  /* height: 100vh; */
  padding: 50px;
  margin: 0;
  text-align: center;
  display: flex;
  justify-content: center;

}

#myForm form {
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
}

#myForm input {
  width: 100%;
}

#myForm button {
  background: linear-gradient(to right, #1a2f58, #28437e);
  font-weight: 600;
  font-size: 18px;
  width: 30%;
  border: none;
}

#myForm button:hover {
  background: linear-gradient(to left, #1a2f58, #274178);
  border: none;
  color: white;

}

#myForm input::placeholder {
  font-size: 11px;
  color: rgb(123, 123, 123);
}

.details label {
  display: flex;
  font-size: 15px;
  font-weight: bold;
}


#fb {
  background-color: #4088f4;
}

#tw {
  background-color: #59bdfb;
}

#ig {
  background: linear-gradient(to right, #ffd754, #fc9049, #e6446f);
}

body {
  display: flex;
  font-weight: 400;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.background {
  padding: 0;
}

.social-icons {
  font-size: 15px;
  color: #222222;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#backTologin {
  width: 100%;
  text-align: right;
  padding-right: 20px;
  font-size: 13px;
}

#backTologin::after {
  content: " >";
  color: #0a8ddf;
  font-weight: 900;
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
  height: 30px;
  margin: 5px;
}

.social-icons ul li a i {
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -ms-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

@media screen and (max-width: 425px) {
  .form-container {
    width: 90%;
    padding: 20px;
  }
  
  .form-container button {
    width: 60%;
  }
  
  .social-icons {
    font-size: 14px;
  }
  
  #backTologin {
    padding-right: 10px;
    font-size: 12px;
  }
}
</style>