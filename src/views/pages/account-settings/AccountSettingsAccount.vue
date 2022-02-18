<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <v-card-text class="d-flex">
      <v-avatar
        rounded
        size="120"
        class="me-6"
      >
        <v-img :src="accountDataLocale.avatarImg"></v-img>
      </v-avatar>      
    </v-card-text>

    <v-card-text>
      <v-form class="multi-col-validation mt-6" v-model="formValidity">
        <v-row>
          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="accountDataLocale.username"
              label="Username"
              dense
              outlined
              :rules="commonValidation"
            ></v-text-field>
          </v-col>

          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="accountDataLocale.name"
              :rules="commonValidation"
              label="Name"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="accountDataLocale.email"
              label="E-mail"
              dense
              outlined
              :rules="emailValidation"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="accountDataLocale.role"
              dense
              label="Role"
              outlined
              :disabled=isAdmin
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-select
              v-model="accountDataLocale.status"
              dense
              outlined
              label="Status"
              :items="status"
            ></v-select>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
          </v-col>
          
          <v-col cols="12">
            <v-btn
              color="primary"
              class="me-3 mt-4"
              v-on:click="$emit('updateAccountAccount', accountDataLocale)"
              :disabled="!formValidity"
            >
              Save changes
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiAlertOutline, mdiCloudUploadOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import { emailValidation,commonValidation } from '../../../utils/commonutils'
import { useState, useMutations } from 'vuex-composition-helpers/dist'

export default {
  props: {
    accountData: {
      type: Object,
      default: () => {},
    }
  },
  setup(props) {
    const status = ['Active', 'Inactive', 'Pending', 'Closed']
    const accountDataLocale = ref(JSON.parse(JSON.stringify(props.accountData)))
    let formValidity = false
    let { role } = useState(['role'])
    let isAdmin = role.value == "Admin" ? false : true   

    return {
      status,
      accountDataLocale,
      emailValidation,
      commonValidation,
      formValidity,
      isAdmin,
      icons: {
        mdiAlertOutline,
        mdiCloudUploadOutline,
      },
    }
  },
}
</script>
