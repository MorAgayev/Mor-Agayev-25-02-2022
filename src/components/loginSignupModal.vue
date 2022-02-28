<template>
<div class="modal-background" @click.self="closeModal">
    <section class="login-signup-modal flex column align-center p20">
    <form @submit.prevent="loginSignup" class="flex column">
        <h1 v-if="!isSignup">Login</h1>
        <h1 v-else>Sign Up</h1>
        <input v-model="user.username" type="text" placeholder="Username" required>
        <input v-model="user.password" type="password" placeholder="Password" required>
        <button v-if="!isSignup">Login</button>
        <button v-else>Sign Up</button>
    </form>
    <hr>
    <small v-if="isSignup" @click="isSignup=false">Login</small>
    <small v-else @click="isSignup=true">Sign Up</small>
    <small @click="closeModal">Close</small>
    </section>
</div>
</template>

<script>
import { showMsg } from '../services/event-bus.service';

export default {
    name: 'loginSignup',

    data() {
        return {
            isSignup: false,
            user: {
                username: '',
                password: ''
            }
        }
    },

    methods: {
        async loginSignup() {
            try {
                if(this.isSignup) await this.$store.dispatch({type: 'signup', user: this.user});
                else await this.$store.dispatch({type: 'login', user: this.user});
                this.$emit('getUser');
                this.closeModal();
            } catch(e) {
                showMsg('Login / Signup faild', 'error');
            }
        },
        closeModal() {
            this.$emit('closeModal')
        }
    }
}
</script>
