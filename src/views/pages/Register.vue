<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link to="/" class="d-flex align-center">
            <v-img
              :src="require('@/assets/images/logos/logo.svg')"
              max-height="30px"
              max-width="30px"
              alt="logo"
              contain
              class="me-3"
            ></v-img>

            <h2 class="text-2xl font-weight-semibold">Valeting System</h2>
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
              v-model="username"
              outlined
              label="Username"
              placeholder="JohnDoe"
              :rules="commonValidation"
              hide-details="auto"
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="email"
              outlined
              label="Email"
              :rules="emailValidation"
              placeholder="john@example.com"
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
              @click:append="isPasswordVisible = !isPasswordVisible"
              :rules="commonValidation"
            ></v-text-field>

            <v-checkbox hide-details class="mt-1" :rules="checkboxRequired">
              <template #label>
                <div class="d-flex align-center flex-wrap">
                  <span class="me-2">I agree to</span><a href="javascript:void(0)">privacy policy &amp; terms</a>
                </div>
              </template>
            </v-checkbox>

            <v-btn block color="primary" class="mt-6" @click="registerUser" :disabled="!formValidity"> Sign Up </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2"> Already have an account? </span>
          <router-link :to="{ name: 'pages-login' }"> Sign in instead </router-link>
        </v-card-text>
      </v-card>
      <v-snackbar v-model="snackbar" timeout="5000">
        Email ID already in use.

        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="190"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)"
    />

    <!-- tree -->
    <v-img class="auth-tree" width="247" height="185" src="@/assets/images/misc/tree.png"></v-img>

    <!-- tree  -->
    <v-img class="auth-tree-3" width="377" height="289" src="@/assets/images/misc/tree-3.png"></v-img>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import { emailValidation, commonValidation, checkboxRequired } from '../../utils/commonutils'
import { useState, useMutations } from 'vuex-composition-helpers/dist'

export default {
  setup() {
    const isPasswordVisible = ref(false)
    const username = ref('ddddd')
    const email = ref('fsdgas@ssfg.com')
    const password = ref('ddddd')
    let formValidity = false
    let { users } = useState(['users'])
    const { addNewUser } = useMutations(['addNewUser'])
    let snackbar = ref(false)

    const registerUser = () => {
      let id = email.value
      let user = {}
      if (!users.value.has(id)) {
        user[id] = {
          user: username.value,
          password: password.value,
        }
        addNewUser(user)
      } else {
        snackbar.value = true
      }
    }

    return {
      isPasswordVisible,
      username,
      email,
      password,
      registerUser,
      emailValidation,
      commonValidation,
      checkboxRequired,
      formValidity,
      snackbar,

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
