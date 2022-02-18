<template>
  <v-card id="account-setting-card">
    <!-- tabs -->
    <v-tabs v-model="tab" show-arrows>
      <v-tab v-for="tab in tabs" :key="tab.icon">
        <v-icon size="20" class="me-3">
          {{ tab.icon }}
        </v-icon>
        <span>{{ tab.title }}</span>
      </v-tab>
    </v-tabs>

    <!-- tabs item -->
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <account-settings-account
          v-on:updateAccountAccount="updateUser"
          :account-data="accountSettingData.account"
        ></account-settings-account>
      </v-tab-item>

      <v-tab-item>
        <account-settings-info v-on:updatePersonal="updateUserPersonal" :information-data="accountSettingData.information"></account-settings-info>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mdiAccountOutline, mdiLockOpenOutline, mdiInformationOutline } from '@mdi/js'

import AccountSettingsAccount from './AccountSettingsAccount.vue'
import AccountSettingsInfo from './AccountSettingsInfo.vue'

export default {
  components: {
    AccountSettingsAccount,
    AccountSettingsInfo,
  },
  data() {
    return {
      tab: '',
      tabs: [
        { title: 'Account', icon: mdiAccountOutline },
        { title: 'Info', icon: mdiInformationOutline },
      ],
      accountSettingData: {
        account: {
          avatarImg: require('@/assets/images/avatars/1.png'),
          username: 'johnDoe',
          name: 'john Doe',
          email: 'johnDoe@example.com',
          role: 'User',
          status: 'Active',
        },
        information: {
          birthday: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          phone: '954-006-0844',
          languages: ['English', 'Spanish'],
          gender: 'male',
        },
        icons: {
          mdiAccountOutline,
          mdiLockOpenOutline,
          mdiInformationOutline,
        },
      },
    }
  },

  created() {
    this.fillData()
  },
  watch: {
    // call again the method if the route changes
    '$route.params.id': 'fillData',
  },

  methods: {
    fillData: function () {
      let userData = this.$store.getters.getUser(this.$route.params.id)

      let tmpAccount = {
        username: userData.user,
        name: userData.user,
        email: this.$route.params.id,
        role: 'User',
        status: 'Active',
      }
      this.accountSettingData.account = { ...this.accountSettingData.account, ...tmpAccount }
    },
    updateUserPersonal: function (personalInfo) {
      let tmpPersonalAccount ={}
      tmpPersonalAccount[this.$route.params.id] = {
        birthday: personalInfo.birthday,
        gender: personalInfo.gender,
        email: this.$route.params.id,
        languages: personalInfo.languages,
        phone: personalInfo.phone,
      }
      this.$store.commit('updateUserInfo', tmpPersonalAccount)      
    },

    updateUser(updatedAccountaccount) {
      let accountData = {}
      accountData[updatedAccountaccount.email] = {
        user: updatedAccountaccount.username,
        name: updatedAccountaccount.name,
        status: updatedAccountaccount.status,
        username: updatedAccountaccount.username
      }
      
      this.$store.commit('updateUserInfo', accountData)
    }
  },
}
</script>