import { useState } from 'react';
import Chart from 'react-apexcharts';
import getIcon from '../utils/iconUtils';

const ReportCard = ({
  timeframe,
  activeTab,
  data,
  revenueBreakdownOptions,
  expenseBreakdownOptions,
  monthlyTrendOptions
}) => {
  const [showTable, setShowTable] = useState(false);
  
  // Define icons
  const TableIcon = getIcon('Table');
  const ChartIcon = getIcon('BarChart');
  
  // Function to format currency
  const formatCurrency = (amount) => {
    return `$${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  // Generate monthly data series for the line chart
  const monthlyDataSeries = [
    {
      name: 'Revenue',
      data: data.monthlyBreakdown?.map(month => month.revenue) || []
    },
    {
      name: 'Expenses',
      data: data.monthlyBreakdown?.map(month => month.expenses) || []
    }
  ];

  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden">
      <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
        <div>
          {activeTab === 'overview' && <h2 className="text-xl font-semibold text-surface-900 dark:text-white">Financial Overview</h2>}
          {activeTab === 'revenue' && <h2 className="text-xl font-semibold text-surface-900 dark:text-white">Revenue Analysis</h2>}
          {activeTab === 'expenses' && <h2 className="text-xl font-semibold text-surface-900 dark:text-white">Expense Analysis</h2>}
        </div>
        <div className="flex items-center gap-2">
          <button 
            className={`p-1.5 rounded-md ${!showTable ? 'bg-primary text-white' : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300'}`}
            onClick={() => setShowTable(false)}
            title="Show as chart"
          >
            <ChartIcon className="w-4 h-4" />
          </button>
          <button 
            className={`p-1.5 rounded-md ${showTable ? 'bg-primary text-white' : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300'}`}
            onClick={() => setShowTable(true)}
            title="Show as table"
          >
            <TableIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {!showTable ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-4">Monthly Trend</h3>
                  <Chart
                    options={monthlyTrendOptions}
                    series={monthlyDataSeries}
                    type="line"
                    height={300}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-4">Revenue vs Expenses</h3>
                  <Chart
                    options={{
                      ...monthlyTrendOptions,
                      chart: {
                        ...monthlyTrendOptions.chart,
                        type: 'bar',
                      },
                      plotOptions: {
                        bar: {
                          borderRadius: 4,
                          columnWidth: '60%',
                        }
                      }
                    }}
                    series={[
                      {
                        name: 'Revenue',
                        data: [data.revenue?.total || 0]
                      },
                      {
                        name: 'Expenses',
                        data: [data.expenses?.total || 0]
                      }
                    ]}
                    type="bar"
                    height={300}
                  />
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Month</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Revenue</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Expenses</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Profit</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Margin</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
                    {data.monthlyBreakdown?.map((month, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-surface-900 dark:text-white">{month.month}</td>
                        <td className="px-4 py-3 text-sm text-right text-surface-900 dark:text-white">{formatCurrency(month.revenue)}</td>
                        <td className="px-4 py-3 text-sm text-right text-surface-900 dark:text-white">{formatCurrency(month.expenses)}</td>
                        <td className="px-4 py-3 text-sm text-right text-surface-900 dark:text-white">{formatCurrency(month.revenue - month.expenses)}</td>
                        <td className="px-4 py-3 text-sm text-right text-surface-900 dark:text-white">
                          {month.revenue ? `${((month.revenue - month.expenses) / month.revenue * 100).toFixed(1)}%` : '0.0%'}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-surface-50 dark:bg-surface-700">
                      <td className="px-4 py-3 text-sm font-medium text-surface-900 dark:text-white">Total</td>
                      <td className="px-4 py-3 text-sm font-medium text-right text-surface-900 dark:text-white">{formatCurrency(data.revenue?.total || 0)}</td>
                      <td className="px-4 py-3 text-sm font-medium text-right text-surface-900 dark:text-white">{formatCurrency(data.expenses?.total || 0)}</td>
                      <td className="px-4 py-3 text-sm font-medium text-right text-surface-900 dark:text-white">{formatCurrency(data.profit || 0)}</td>
                      <td className="px-4 py-3 text-sm font-medium text-right text-surface-900 dark:text-white">
                        {data.revenue?.total ? `${(data.profit / data.revenue.total * 100).toFixed(1)}%` : '0.0%'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Revenue Tab */}
        {activeTab === 'revenue' && (
          <>
            {!showTable ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-4">Revenue by Category</h3>
                  <Chart
                    options={revenueBreakdownOptions}
                    series={Object.values(data.revenue?.byCategory || {})}
                    type="donut"
                    height={300}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-4">Revenue by Client</h3>
                  <Chart
                    options={{
                      ...revenueBreakdownOptions,
                      labels: Object.keys(data.revenue?.byClient || {})
                    }}
                    series={Object.values(data.revenue?.byClient || {})}
                    type="donut"
                    height={300}
                  />
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Category</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Amount</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
                    {Object.entries(data.revenue?.byCategory || {}).map(([category, amount], index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-surface-900 dark:text-white">{category}</td>
                        <td className="px-4 py-3 text-sm text-right text-surface-900 dark:text-white">{formatCurrency(amount)}</td>
                        <td className="px-4 py-3 text-sm text-right text-surface-900 dark:text-white">
                          {data.revenue?.total ? `${(amount / data.revenue.total * 100).toFixed(1)}%` : '0.0%'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Expenses Tab */}
        {activeTab === 'expenses' && (
          <>
            {!showTable ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-4">Expenses by Category</h3>
                  <Chart
                    options={expenseBreakdownOptions}
                    series={Object.values(data.expenses?.byCategory || {})}
                    type="donut"
                    height={300}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-4">Monthly Expense Trend</h3>
                  <Chart
                    options={{
                      ...monthlyTrendOptions,
                      colors: ['#7209b7']
                    }}
                    series={[{
                      name: 'Expenses',
                      data: data.monthlyBreakdown?.map(month => month.expenses) || []
                    }]}
                    type="line"
                    height={300}
                  />
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Category</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Amount</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
                    {Object.entries(data.expenses?.byCategory || {}).map(([category, amount], index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-surface-900 dark:text-white">{category}</td>
                        <td className="px-4 py-3 text-sm text-right text-surface-900 dark:text-white">{formatCurrency(amount)}</td>
                        <td className="px-4 py-3 text-sm text-right text-surface-900 dark:text-white">
                          {data.expenses?.total ? `${(amount / data.expenses.total * 100).toFixed(1)}%` : '0.0%'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReportCard;