<template>
  <component :is="resolveLayout">
    <router-view></router-view>
  </component>
</template>

<script>
import { computed } from '@vue/composition-api'
import { useRouter } from '@/utils'
import LayoutBlank from '@/layouts/Blank.vue'
import LayoutContent from '@/layouts/Content.vue'
import { useState, useMutations } from 'vuex-composition-helpers/dist'

export default {
  components: {
    LayoutBlank,
    LayoutContent
  },
  setup() {
    const { route } = useRouter()
    let { users } = useState(['users'])
    const {addDataToStore} = useMutations(['addDataToStore'])
    
    if (users.value.size == 0) {
      addDataToStore({data : localStorage.allUsers})
    }
    const resolveLayout = computed(() => {
      // Handles initial route
      if (route.value.name === null) return null

      if (route.value.meta.layout === 'blank') return 'layout-blank'

      return 'layout-content'
    })

    return {
      resolveLayout,
    }
  },
}
</script>
