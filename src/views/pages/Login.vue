<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link
            to="/"
            class="d-flex align-center"
          >
            <v-img
              :src="require('@/assets/images/logos/logo.svg')"
              max-height="30px"
              max-width="30px"
              alt="logo"
              contain
              class="me-3 "
            ></v-img>

            <h2 class="text-2xl font-weight-semibold">
              Valeting System
            </h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">Best Car service</p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form v-model="formValidity">
            <v-text-field
              v-model="email"
              outlined
              label="Email"
              placeholder="john@example.com"
              :rules="emailValidation"
              hide-details="auto"
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details="auto"
              :rules="commonValidation"
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <v-checkbox
                label="Remember Me"
                hide-details
                class="me-3 mt-1"
              >
              </v-checkbox>
            </div>

            <v-btn
              block
              color="primary"
              class="mt-6"
              :disabled="!formValidity"
              @click="signinUser"
            >
              Login
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2">
            New on our platform?
          </span>
          <router-link :to="{name:'pages-register'}">
            Create an account
          </router-link>
        </v-card-text>
      </v-card>
      <v-snackbar v-model="snackbar" timeout="2000">
        {{snackBarText}}
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark':'light'}.png`)"
    >

    <!-- tree -->
    <v-img
      class="auth-tree"
      width="247"
      height="185"
      src="@/assets/images/misc/tree.png"
    ></v-img>

    <!-- tree  -->
    <v-img
      class="auth-tree-3"
      width="377"
      height="289"
      src="@/assets/images/misc/tree-3.png"
    ></v-img>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import {emailValidation,commonValidation} from '../../utils/commonutils'
import { useState, useMutations } from 'vuex-composition-helpers/dist'


export default {
  setup() {
    const isPasswordVisible = ref(false)
    const email = ref('')
    const password = ref('')
    let formValidity = false
    let { users } = useState(['users'])
    let snackbar = ref(false)
    let snackBarText = ref('')

    const signinUser = () => {
      let userObj = users.value.get(email.value)
      if (userObj == undefined) {
        snackbar.value = true
        snackBarText.value = "Email ID/User not found"
      } else if (userObj['password'] == password.value) {
        snackbar.value = true
        snackBarText.value = "Log in Successful"
      } else {
        snackbar.value = true
        snackBarText.value = "Password Incorrect"
      }
    }

    return {
      isPasswordVisible,
      email,
      password,
      emailValidation,
      commonValidation,
      formValidity,
      signinUser,
      snackbar,
      snackBarText,

      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
