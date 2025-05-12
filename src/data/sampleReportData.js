// Sample data for financial reports
export const sampleReportData = {
  quarterly: [
    {
      year: 2023,
      quarter: 4,
      revenue: {
        total: 12450.75,
        byCategory: {
          'Web Development': 5825.00,
          'Design Services': 3260.50,
          'Consulting': 2750.00,
          'Content Creation': 615.25
        },
        byClient: {
          'TechCorp Inc.': 4580.00,
          'Design Studio': 3260.50,
          'StartupX': 2750.00,
          'Local Business': 1860.25
        }
      },
      expenses: {
        total: 4325.80,
        byCategory: {
          'Software Subscriptions': 925.45,
          'Office Supplies': 210.65,
          'Marketing': 1250.00,
          'Contractors': 1500.00,
          'Miscellaneous': 439.70
        }
      },
      profit: 8124.95,
      profitMargin: 65.25,
      monthlyBreakdown: [
        { month: 'Oct', revenue: 3950.25, expenses: 1425.30 },
        { month: 'Nov', revenue: 4250.50, expenses: 1500.50 },
        { month: 'Dec', revenue: 4250.00, expenses: 1400.00 }
      ]
    },
    {
      year: 2023,
      quarter: 3,
      revenue: {
        total: 10250.50,
        byCategory: {
          'Web Development': 4825.00,
          'Design Services': 2950.50,
          'Consulting': 1875.00,
          'Content Creation': 600.00
        },
        byClient: {
          'TechCorp Inc.': 3580.00,
          'Design Studio': 2950.50,
          'StartupX': 1875.00,
          'Local Business': 1845.00
        }
      },
      expenses: {
        total: 3825.75,
        byCategory: {
          'Software Subscriptions': 825.45,
          'Office Supplies': 190.65,
          'Marketing': 1150.00,
          'Contractors': 1250.00,
          'Miscellaneous': 409.65
        }
      },
      profit: 6424.75,
      profitMargin: 62.68,
      monthlyBreakdown: [
        { month: 'Jul', revenue: 3250.25, expenses: 1225.30 },
        { month: 'Aug', revenue: 3500.25, expenses: 1300.45 },
        { month: 'Sep', revenue: 3500.00, expenses: 1300.00 }
      ]
    }
  ],
  annual: [
    {
      year: 2023,
      revenue: {
        total: 43250.75,
        byCategory: {
          'Web Development': 19825.00,
          'Design Services': 11460.50,
          'Consulting': 8750.00,
          'Content Creation': 3215.25
        },
        byClient: {
          'TechCorp Inc.': 15580.00,
          'Design Studio': 11460.50,
          'StartupX': 8750.00,
          'Local Business': 7460.25
        }
      },
      expenses: {
        total: 16325.80,
        byCategory: {
          'Software Subscriptions': 3525.45,
          'Office Supplies': 810.65,
          'Marketing': 5250.00,
          'Contractors': 5500.00,
          'Miscellaneous': 1239.70
        }
      },
      profit: 26924.95,
      profitMargin: 62.25,
      monthlyBreakdown: [
        { month: 'Jan', revenue: 3250.25, expenses: 1325.30 },
        { month: 'Feb', revenue: 3450.50, expenses: 1300.50 },
        { month: 'Mar', revenue: 3650.00, expenses: 1400.00 },
        { month: 'Apr', revenue: 3450.25, expenses: 1325.30 },
        { month: 'May', revenue: 3550.50, expenses: 1300.50 },
        { month: 'Jun', revenue: 3750.00, expenses: 1400.00 },
        { month: 'Jul', revenue: 3250.25, expenses: 1225.30 },
        { month: 'Aug', revenue: 3500.25, expenses: 1300.45 },
        { month: 'Sep', revenue: 3500.00, expenses: 1300.00 },
        { month: 'Oct', revenue: 3950.25, expenses: 1425.30 },
        { month: 'Nov', revenue: 4250.50, expenses: 1500.50 },
        { month: 'Dec', revenue: 4250.00, expenses: 1400.00 }
      ]
    },
    {
      year: 2022,
      revenue: { total: 38450.50 },
      expenses: { total: 15250.75 },
      profit: 23199.75,
      profitMargin: 60.34,
      monthlyBreakdown: [
        { month: 'Jan', revenue: 3000.25, expenses: 1200.30 },
        { month: 'Feb', revenue: 3100.50, expenses: 1250.50 },
        { month: 'Mar', revenue: 3200.00, expenses: 1300.00 },
        // Rest of the months would be here
        { month: 'Dec', revenue: 3950.00, expenses: 1350.00 }
      ]
    }
  ]
};