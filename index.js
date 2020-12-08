const {
  getGrossMonthlySalary
} = require('./src/utils/tax')

for (let i = 0; i < 100000; i++) {
  console.log(i + ' ' + getGrossMonthlySalary(i))
}