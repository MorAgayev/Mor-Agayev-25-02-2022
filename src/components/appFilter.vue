<template>
  <form class="city-filter" @submit.prevent="setFilter">
    <input type="text" placeholder="Search city" v-model="searchVal"/>
  </form>
</template>

<script>
export default {
  name: "cityFilter",
  
  data() {
    return {
      searchVal: ""
    };
  },

  methods: {
    setFilter() {
      this.$emit('setFilter', this.searchVal);
      this.searchVal=''
    }
  }
};
</script>
