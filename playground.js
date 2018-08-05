
const bcrypt = require("bcrypt")
const ans = bcrypt.compareSync("j", "$2b$10$RKIFRJBxAz55tKlLQvnZouP.YyNkWsPzlEwBoZWI.T3TOpnMScQE.")
console.log(ans)
