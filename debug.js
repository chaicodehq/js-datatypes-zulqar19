 export function analyzeUPITransactions(transactions) {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return null
  }

  const isValidTransaction = transactions.filter(transaction => ((transaction.type === "debit" || transaction.type === "credit") && (transaction.amount > 0 && typeof transaction.amount === "number")))

  if (isValidTransaction.length === 0) {
    return null
  }

  const result = isValidTransaction.reduce((acc, transaction) => {
    const key = (transaction.type === "debit") ? "totalDebit" : "totalCredit"
    acc[key] += transaction.amount
    acc["totalCount"]++
    !acc.highestTransaction.amount || (transaction.amount > acc.highestTransaction.amount) ? acc.highestTransaction = {...transaction} : acc.highestTransaction

    const category = transaction.category    
    acc.categoryBreakdown[category] = (acc.categoryBreakdown[category] || 0) + transaction.amount

    const to = transaction.to
    acc.countContact[to] = (acc.countContact[to] || 0) + 1

        if (acc.countContact[to] > (acc.countContact[acc.frequentContact] || 0)) {
      acc.frequentContact = to;
    }

    


    return acc
    
  }, {totalCredit : 0 , totalDebit : 0, totalCount : 0 , highestTransaction :{},categoryBreakdown:{}, countContact : {} , frequentContact : "" } )

  const allAbove100 = isValidTransaction.every(value => value.amount >= 100)
  const hasLargeTransaction = isValidTransaction.some(value => value.amount >= 5000)
  
  return {totalCredit : result.totalCredit , totalDebit : result.totalDebit, netBalance: result.totalCredit -  result.totalDebit,totalCount : result.totalCount ,avgTransaction: Math.round((result.totalCredit + result.totalDebit) /  result.totalCount) ,highestTransaction : result.highestTransaction ,categoryBreakdown:result.categoryBreakdown,  frequentContact : result.frequentContact , allAbove100 : allAbove100,hasLargeTransaction : hasLargeTransaction }


}

 
 analyzeUPITransactions([
     { id: "T1", type: "credit", amount: 5000, to: "Salary", category: "income", date: "2025-01-01" },
     { id: "T2", type: "debit", amount: 200, to: "Swiggy", category: "food", date: "2025-01-02" },
     { id: "T3", type: "debit", amount: 10000, to: "Swiggy", category: "food", date: "2025-01-03" }])