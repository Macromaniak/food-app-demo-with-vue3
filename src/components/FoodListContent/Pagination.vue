<template>
  <div class="pagination" v-if="totalPages > 1">
    <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">Prev</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
      Next
    </button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const currentPage = computed(() => store.getters.getCurrentPage)
    const totalPages = computed(() => store.getters.totalPages)

    const changePage = (page) => {
      // alert(page)
      store.commit('SET_CURRENT_PAGE', page)
    }

    return { totalPages, currentPage, changePage }
  },
}
</script>
