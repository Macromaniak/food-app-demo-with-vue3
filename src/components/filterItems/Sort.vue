<template>
  <div class="filter-btn">
    <select id="sort-items" v-model="sortOrder" @change="updateSortOrder">
      <option value="asc">A-Z</option>
      <option value="desc">Z-A</option>
    </select>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    const sortOrder = computed(() => store.state.sortOrder)

    const updateSortOrder = (event) => {
      store.commit('SET_SORT_ORDER', event.target.value)
    }

    return { sortOrder, updateSortOrder }
  },
}
</script>

<style scoped>
select {
  padding: 0px;
  border: none;
  outline: 0px;
}
select:hover {
  cursor: pointer;
}
</style>
