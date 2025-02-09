<template>
  <div class="filters">
    <AreaFilter />
    <Sort />
    <button class="filter-btn">Fast Delivery</button>
    <button class="filter-btn">New on Swiggy</button>
    <button class="filter-btn">Ratings 4.0+</button>
    <button class="filter-btn">Pure Veg</button>
    <button class="filter-btn">Offers</button>
    <button class="filter-btn">Rs. 300-Rs. 600</button>
    <button class="filter-btn">Less than Rs. 300</button>
  </div>
</template>

<script>
import AreaFilter from '@/components/filterItems/AreaFilter.vue'
import Sort from './filterItems/Sort.vue'

export default {
  components: {
    AreaFilter,
    Sort,
  },
  setup() {},
}
</script>
