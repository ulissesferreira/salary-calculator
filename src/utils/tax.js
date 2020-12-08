const IRSTable = new Map([
  [659, [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]],
  [686, [0.1, 0.0, 0.0, 0.0, 0.0, 0.0]],
  [718, [4.2, 0.8, 0.0, 0.0, 0.0, 0.0]],
  [739, [7.3, 2.8, 0.2, 0.0, 0.0, 0.0]],
  [814, [8.2, 4.6, 1.1, 0.0, 0.0, 0.0]],
  [922, [10.4, 6.9, 3.6, 0.0, 0.0, 0.0]],
  [1005, [11.6, 8.2, 5.8, 1.5, 0.0, 0.0]],
  [1065, [12.4, 9.1, 6.7, 3.4, 0.0, 0.0]],
  [1143, [13.5, 11.0, 8.6, 5.2, 2.8, 0.3]],
  [1225, [14.5, 12.1, 9.6, 6.2, 3.7, 1.3]],
  [1321, [15.6, 13.2, 10.8, 7.2, 4.7, 2.3]],
  [1424, [16.6, 14.2, 11.7, 8.3, 6.7, 4.1]],
  [1562, [17.7, 15.2, 12.7, 10.3, 7.8, 5.1]],
  [1711, [19.1, 16.7, 15.2, 11.7, 9.2, 6.7]],
  [1870, [20.5, 18.7, 17.8, 14.9, 12.9, 12.0]],
  [1977, [21.5, 19.9, 18.7, 15.9, 14.9, 12.9]],
  [2090, [22.5, 20.8, 19.8, 16.8, 15.9, 13.9]],
  [2218, [23.5, 21.9, 20.9, 18.0, 16.9, 14.9]],
  [2367, [24.5, 22.9, 21.9, 19.0, 18.1, 15.9]],
  [2535, [25.5, 24.9, 22.9, 21.0, 19.0, 18.1]],
  [2767, [26.5, 25.8, 24.0, 22.0, 20.0, 19.0]],
  [3104, [27.8, 27.1, 25.2, 23.2, 21.2, 20.2]],
  [3534, [29.4, 29.1, 27.5, 25.9, 25.3, 23.7]],
  [4118, [30.5, 30.3, 28.5, 26.9, 26.3, 25.7]],
  [4650, [32.3, 31.8, 30.2, 28.4, 27.8, 27.2]],
  [5194, [33.3, 32.8, 32.2, 29.7, 28.8, 28.2]],
  [5880, [34.3, 33.8, 33.2, 30.6, 30.0, 29.2]],
  [6727, [36.3, 35.9, 35.1, 33.2, 32.8, 32.4]],
  [7939, [37.3, 36.9, 36.5, 35.2, 33.8, 33.4]],
  [9560, [39.3, 38.9, 38.5, 37.2, 36.8, 35.4]],
  [11282, [40.3, 39.9, 39.5, 38.6, 37.8, 36.4]],
  [18854, [41.3, 40.9, 40.5, 39.6, 39.2, 37.4]],
  [20221, [42.3, 41.9, 41.5, 40.6, 40.2, 38.4]],
  [22749, [43.1, 42.9, 42.5, 41.6, 41.2, 39.6]],
  [25276, [44.1, 43.9, 43.5, 42.6, 42.2, 40.8]],
  [25277, [45.1, 44.9, 44.5, 43.6, 43.2, 41.8]]
])

const CARD_MEAL_ALLOWANCE = 7.63
const CASH_MEAL_ALLOWANCE = 4.77

const incomeTax = (grossMonthlyIncome, dependents = 0) => {

  if (grossMonthlyIncome == null) {
    return 0
  }

  const dependentsIndex = dependents < 5 ? dependents : 5
  const irsLevels = [...IRSTable.keys()].reverse()

  for (let level of irsLevels) {
    if (grossMonthlyIncome > level) {
      return IRSTable.get(level)[dependentsIndex] * grossMonthlyIncome / 100
    }
  }

  return 0
}

const socialSecurityTax = (grossMonthlyIncome) => {

  if (grossMonthlyIncome == null) {
    return 0
  }

  return 0.11 * grossMonthlyIncome
}

const getMonthlyNetIncome = (grossMonthlyIncome, dependents = 0, workDays = 22, hasMealAllowance = false) => {
  
  if (grossMonthlyIncome == null) {
    return 0
  }

  const MONTHLY_MEAL_ALLOWANCE = CARD_MEAL_ALLOWANCE * workDays
  let taxableMonthlyIncome = grossMonthlyIncome

  /**
   * If the gross value is below the meal allowance nothing can be taxed
   */
  if (grossMonthlyIncome <= MONTHLY_MEAL_ALLOWANCE) {
    return grossMonthlyIncome
  }

  /**
   * Some of it won't be taxed
   */
  if (hasMealAllowance) {
    taxableMonthlyIncome -= MONTHLY_MEAL_ALLOWANCE
  }

  const socialSecurityPayoff = socialSecurityTax(taxableMonthlyIncome)
  const incomeTaxPayoff = incomeTax(taxableMonthlyIncome, dependents)

  return grossMonthlyIncome - socialSecurityPayoff - incomeTaxPayoff
}

const getAnnualNetIncome = (grossMonthlyIncome, dependents = 0, workDays = 22, hasMealAllowance = false) => {
  
  if (grossMonthlyIncome == null) {
    return 0
  }
  
  const MONTHLY_MEAL_ALLOWANCE = CARD_MEAL_ALLOWANCE * workDays
  let taxableMonthlyIncome = grossMonthlyIncome

  /**
   * If the gross value is below the meal allowance nothing can be taxed
   */
  if (grossMonthlyIncome <= MONTHLY_MEAL_ALLOWANCE) {
    return grossMonthlyIncome * 14
  }

  /**
   * Some of it won't be taxed
   */
  if (hasMealAllowance ) {
    taxableMonthlyIncome -= MONTHLY_MEAL_ALLOWANCE
  }

  const socialSecurityPayoff = socialSecurityTax(taxableMonthlyIncome)
  const incomeTaxPayoff = incomeTax(taxableMonthlyIncome, dependents)

  const netMonthlyIncome = grossMonthlyIncome - socialSecurityPayoff - incomeTaxPayoff
  let netAnnualIncome = netMonthlyIncome * 14

  /**
   * We need to remove one month of meal allowance because vacation
   * time is not elligeble
   */
  if (hasMealAllowance) {
    netAnnualIncome -= MONTHLY_MEAL_ALLOWANCE
  }

  return netAnnualIncome
}

const equal = (a, b, delta) =>  {
  return Math.abs(a - b - 1) <= delta
}

const getGrossMonthlySalary = (goalMonthlyNetSalary) => {
  
  if (goalMonthlyNetSalary == null) {
    return 0
  }

  let currentGrossMonthlySalary = goalMonthlyNetSalary -  1
  let stop = false
  while (!stop) {
    currentGrossMonthlySalary += 1
    const currentMonthlyNetSalary = getMonthlyNetIncome(currentGrossMonthlySalary, 0, 22, true)
    stop = equal(currentMonthlyNetSalary, goalMonthlyNetSalary, 1) || currentGrossMonthlySalary < goalMonthlyNetSalary
    // console.log('Current gross salary ', currentGrossMonthlySalary)
    // console.log('which means - ', currentMonthlyNetSalary)
    // console.log('---')
  }
  return currentGrossMonthlySalary
}


module.exports = {
  incomeTax,
  socialSecurityTax,
  getMonthlyNetIncome,
  getAnnualNetIncome,
  equal,
  getGrossMonthlySalary
}
