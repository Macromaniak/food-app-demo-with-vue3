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
      store.commit('SET_CURRENT_PAGE', page)
    }

    return { totalPages, currentPage, changePage }
  },
}
</script>

<style scoped>
.pagination {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.pagination button {
  padding: 5px 10px;
  border: none;
  background: #ff5200;
  color: #000;
  cursor: pointer;
  border-radius: 5px;
}
.pagination button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
