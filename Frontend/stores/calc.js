export const useCalcRiskStore = defineStore('calc', () => {
  const type_risk_landshaft = ref('base')
  const worth = ref([
    {
      name: 'конфиденциальности',
      value: 1

    },
    {
      name: 'целостности',
      value: 1

    },
    {
      name: 'доступности',
      value: 1

    },

  ])
  
const worth_2 = ref([
  {
      name: 'Среднестатистическое время простоя',
      value: 1

  },
  {
      name: 'Стоимость единицы времени',
      value: 1

  },

])

  return { type_risk_landshaft, worth, worth_2 }
})