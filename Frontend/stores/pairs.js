import { watchEffect } from 'vue';

export const usePairsStore = defineStore('pairs', () => {
  const pairs = ref([])

  // Load pairs from localStorage when store is initialized
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('pairs')) {
      pairs.value = JSON.parse(localStorage.getItem('pairs'));
    }
  }

  function check(pair) {
    return pairs.value.find((p) => {
      return p?.cveId === pair?.cveId && p?.capecId === pair?.capecId
    })
  }

  function checkBoolean(pair) {
    if (pairs.value.indexOf(pairs.value.find(p => p?.cveId === pair?.cveId && p?.capecId === pair?.capecId)) === -1) {
      return false
    } else {
      return true
    }
  }

  function removePair(pair) {
    pairs.value.splice(pairs.value.indexOf(pairs.value.find(p => p?.cveId === pair?.cveId && p?.capecId === pair?.capecId)), 1)
    if (typeof window !== 'undefined') {
      localStorage.setItem('pairs', JSON.stringify(pairs.value));
    }
  }
  function addPair(pair) {
    pairs.value.push(pair)
    if (typeof window !== 'undefined') {
      localStorage.setItem('pairs', JSON.stringify(pairs.value));
    }
  }

  function findAndRemovePair(pair) {
    const index = pairs.value.findIndex(p => p?.cveId === pair?.cveId && p?.capecId === pair?.capecId);
    if (index !== -1) {
      pairs.value.splice(index, 1);
      if (typeof window !== 'undefined') {
        localStorage.setItem('pairs', JSON.stringify(pairs.value));
      }
    }
  }

  function findAndAddPair(pair) {
    const exists = pairs.value.some(p => p?.cveId === pair?.cveId && p?.capecId === pair?.capecId);
    if (!exists) {
      pairs.value.push(pair);
      if (typeof window !== 'undefined') {
        localStorage.setItem('pairs', JSON.stringify(pairs.value));
      }
    }
  }

  function togglePair(pair) {
    const index = pairs.value.findIndex(p => p?.cveId === pair?.cveId && p?.capecId === pair?.capecId);
    if (index !== -1) {
      findAndRemovePair(pair);
    } else {
      findAndAddPair(pair);
    }
  }

  function togglePairs(pair) {
    const index = pairs.value.findIndex(p => p?.cveId === pair?.cveId && p?.capecId === pair?.capecId);
    if (index !== -1) {
      console.log(pair);
    } else {
      findAndAddPair(pair);
    }
  }

  // if (typeof window !== 'undefined') {
  //   //   localStorage.setItem('pairs', JSON.stringify(pairs.value));
  //   // }

  // Watch for changes in localStorage and update the store accordingly
  watchEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPairs = localStorage.getItem('pairs');
      pairs.value = JSON.parse(storedPairs);
    }
  });

  return { pairs, removePair, addPair, check, checkBoolean, findAndRemovePair, findAndAddPair, togglePair, togglePairs }
})