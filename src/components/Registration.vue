<template>
    <div class="Login-template row">
        <div id="background" class="col-lg-7">
            <div id="logo"></div>
        </div>
        <div class="col-lg-5">
            <form id="myForm" @submit.prevent="submitForm">
                <fieldset> Registration Form
                    <div class="generalInfo mt-2">General Information
                        <div class="mb-1 d-flex GI">
                            <div>
                                <label for="firstname" class="form-label" id="firstname">First Name</label>
                                <input type="text" v-model="form.firstName" class="form-control"
                                    placeholder="Enter First Name" required>
                            </div>
                            <div>
                                <label for="lastname" class="form-label" id="lastname">Last Name</label>
                                <input type="text" v-model="form.lastName" class="form-control"
                                    placeholder="Enter Last Name" required>
                            </div>
                        </div>
                        <div class="mb-1 d-flex GI2">
                            <div>
                                <label for="email" class="form-label" id="email">Email</label>
                                <input type="email" v-model="form.email" class="form-control" placeholder="" required>
                                <p>example@example.com</p>
                            </div>
                            <div>
                                <label for="phonenumber" class="form-label" id="phonenumber">Phone Number</label>
                                <input type="phonenumber" v-model="form.phoneNumber" class="form-control" placeholder=""
                                    required>
                                <p>Please enter a valid phone number</p>
                            </div>
                        </div>
                        <hr>
                    </div>
                    <div class="personalInfo mt-1">Personal Information
                        <div class="d-flex PI">
                            <div>
                                <label for="age" class="form-label mb-2">Age</label>
                                <input type="text" v-model="form.age" placeholder="Enter Your Age" id="age" required>
                            </div>
                            <div>
                                <label for="gender" id="gender">Gender</label>
                                <select name="gender" id="gender" v-model="form.gender" required>
                                    <option value="" disabled selected>Please Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div>
                                <label for="education" id="education">Education</label>
                                <select name="education" id="education" v-model="form.education" required>
                                    <option value="" disabled selected>Please Select Your Education Level</option>
                                    <option value="Seconary">12+ Years of Education</option>
                                    <option value="Primary">19+ Years of Education</option>
                                    <option value="Bachelors">Bachelor's Degree</option>
                                </select>
                            </div>
                        </div>
                        <div class="d-flex PI2">
                            <div>
                                <label for="dob" class="form-label" id="dob">Date of Birth</label>
                                <input type="date" v-model="form.dob" class="form-control" placeholder="" required>
                            </div>
                            <div>
                                <label for="cnic" class="form-label" id="cnic">CNIC</label>
                                <input type="text" v-model="form.cnic" class="form-control" placeholder="Enter Your CNIC"
                                    required>
                                <p>e.g xxxxx-xxx-xxxx-x</p>
                            </div>
                        </div>
                        <div class="d-flex PI3">
                            <div>
                                <label for="address" class="form-label" id="address">Present Address</label>
                                <input type="text" v-model="form.address" class="form-control mb-2"
                                    placeholder="Address line 1" required>
                                <input type="text" v-model="form.street2" class="form-control" placeholder="Address line 2">
                            </div>
                        </div>
                        <div class="d-flex PI4">
                            <div>
                                <label for="city" class="form-label mb-2" id="city">City</label>
                                <input type="text" v-model="form.city" class="form-control">
                            </div>
                            <div>
                                <label for="state" class="form-label" id="state">State/Province</label>
                                <select name="state" id="state" v-model="form.state">
                                    <option value="" disabled selected>Please Select Your Province</option>
                                    <option value="Seconary">Punjab</option>
                                    <option value="Primary">Sindh</option>
                                    <option value="Bachelors">Balochistan</option>
                                    <option value="Bachelors">Khyber PakhtunKhuwa</option>
                                </select>
                            </div>
                        </div>
                        <div class="mb-2 PI5">
                            <label for="zipcode" class="form-label" id="zipcode">Zip Code</label>
                            <input type="text" v-model="form.zipcode" class="form-control">
                        </div>
                        <hr>
                        <div class="mb-2 PI6">
                            <label for="cv" class="form-label">Upload your CV</label>
                            <input type="file" @change="uploadCV" id="cv" accept=".pdf,.jpeg,.jpg,.png" required>
                            <p v-if="fileSizeExceeded"></p>
                        </div>
                        <hr>
                        <div class="mb-2 PI7">
                            <label for="coverLetter">Add a Cover Letter</label><br>
                            <textarea v-model="form.coverLetter" id="coverLetter">
                            </textarea>
                        </div>
                    </div>
                    <button type="submit" class="btn">Submit</button>
                </fieldset>
            </form>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import router from '@/router'; // Make sure the router import is valid
import VueAxios from 'vue-axios';
import Vue from 'vue';

Vue.use(VueAxios, axios);

export default {
    name: "Registration",
    data() {
        return {
            maxFileSize: 2000000, // The value should be in bytes (2MB)
            fileSizeExceeded: false,
            form: {
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                cnic: '',
                dob: '',
                age: '',
                address: '',
                coverLetter: '',
                education: '',
                gender: '',
                cv: null,
            },
        };
    },
    methods: {
        async submitForm() {
            const formData = new FormData();
            formData.append('user_file', this.form.cv); // Use this.form.cv instead of this.cv
            formData.append('firstName', this.form.firstName);
            formData.append('lastName', this.form.lastName);
            formData.append('email', this.form.email);
            formData.append('education', this.form.education);
            formData.append('phoneNumber', this.form.phoneNumber);
            formData.append('age', this.form.age);
            formData.append('cnic', this.form.cnic);
            formData.append('gender', this.form.gender);
            formData.append('dateOfBirth', this.form.dob);
            formData.append('address', this.form.address);

            try {
                const response = await Vue.axios.post('http://192.168.11.212:8080/users/register', formData);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
            router.push("/Login")
        },
        uploadCV(event) {
            this.form.cv = event.target.files[0]; // Use this.form.cv instead of this.cv
            if (this.form.cv.size > this.maxFileSize) {
                this.fileSizeExceeded = true;
                return; // do not process the file if it exceeds the size limit
            }
            this.fileSizeExceeded = false;
        }
    }
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
    .background {
        display: none;
    }
}

body {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

#background {
    background: linear-gradient(to right, #182f58, #234fa6);
    /* overflow: scroll; */
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

#logo {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: #182f58;
    position: relative;
    cursor: pointer;
    transition: transform 0.5s;
}

#logo:before,
#logo:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.5s, height 0.5s;
}

#logo:before {
    width: 30%;
    height: 30%;
    border-radius: 50%;
    background: white;
}

#logo:after {
    width: 60%;
    height: 2px;
    background: #234fa6;
}

#logo:hover {
    transform: scale(1.2);
}

#logo:hover:before {
    width: 40%;
    height: 40%;
}

#logo:hover:after {
    width: 70%;
}


.Login-template fieldset {
    /* color: white; */
    font-weight: 900;
    font-size: 30px;
}

.Login-template {
    justify-content: space-between;
}

#myForm {
    height: 95vh;
    padding: 30px;
    border-radius: 20px;
    margin: 20px auto;
    color: black;
    background-color: rgba(255, 255, 255, 0.9);
    overflow: scroll;
    box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.5);
}

#myForm button {
    background: linear-gradient(to right, #182f58, #234fa6);
    color: white;
    border: none;
    font-weight: bold;
}

#myForm button:hover {
    background: linear-gradient(to left, #182f58, #234fa6);
    border: none;
    font-weight: bold;
}

#myForm input {
    text-decoration: none;
    outline: none;
}

#myForm input:hover {
    outline: auto;
    outline-color: #234fa6b5;
}

.generalInfo {
    text-align: start;
    font-weight: 500;
    font-size: 25px;
}

.GI,
.GI2,
.PI4 {
    justify-content: space-between;
    align-items: center;

}

.generalInfo input {
    width: 100%;
    height: 25px;
}

.generalInfo p {
    font-size: 9px;
}

.generalInfo input::placeholder {
    font-size: 10px;
    color: rgba(129, 127, 127, 0.82);
}

.personalInfo {
    text-align: start;
    font-weight: 500;
    font-size: 25px;
}

.PI,
.PI2 {
    justify-content: space-between;
}

.personalInfo input {
    width: 100%;
    height: 25px;
}

#gender,
#state,
#age {
    width: 90%;
    height: 25px;
    font-size: 10px;
}

#education {
    width: 60%;
    font-size: 10px;
    height: 25px;
    text-align: end;
}

#dob,
#cnic {
    width: 100%;
    height: 25px;
    font-size: 10px;
}

#city,
#state {
    width: 100%;
    height: 25px;
    font-size: 10px;
}

#cv {
    width: 100%;
    height: 25px;
    font-size: 12px;
}

#cv:hover {
    outline: none !important;
    text-decoration: none !important;
}

.personalInfo label {
    font-size: 15px !important;
}

.personalInfo p {
    font-size: 9px;
}

.personalInfo input::placeholder {
    font-size: 10px;
    color: rgba(129, 127, 127, 0.82);
}

#firstname,
#lastname {
    font-size: 15px;

}

#email,
#phonenumber {
    font-size: 15px;

}

.PI3 input {
    width: 255%;
}

.PI5 input {
    width: 100% !important;
}

.PI6,
.PI7 {
    text-align: center;
}

.PI7 {
    text-align: center;

}

.PI7 textarea {
    width: 100%;

}
</style>
  