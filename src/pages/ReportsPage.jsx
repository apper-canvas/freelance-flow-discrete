import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Chart from 'react-apexcharts';
import { format } from 'date-fns';
import getIcon from '../utils/iconUtils';
import ReportCard from '../components/ReportCard';
import { sampleReportData } from '../data/sampleReportData';

const ReportsPage = () => {
  const [timeframe, setTimeframe] = useState('quarterly');
  const [year, setYear] = useState(2023);
  const [quarter, setQuarter] = useState(4);
  const [activeTab, setActiveTab] = useState('overview');

  // Define icons
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const BarChartIcon = getIcon('BarChart');
  const LineChartIcon = getIcon('LineChart');
  const PieChartIcon = getIcon('PieChart');
  const DollarSignIcon = getIcon('DollarSign');
  const PercentIcon = getIcon('Percent');
  const TrendingUpIcon = getIcon('TrendingUp');
  const TrendingDownIcon = getIcon('TrendingDown');
  const ArrowUpIcon = getIcon('ArrowUp');
  const ArrowDownIcon = getIcon('ArrowDown');
  const CalendarIcon = getIcon('Calendar');

  // Filter data based on selected timeframe
  const filteredData = timeframe === 'quarterly' 
    ? sampleReportData.quarterly.filter(item => item.year === year && item.quarter === quarter)[0] || {}
    : sampleReportData.annual.filter(item => item.year === year)[0] || {};

  // Get previous period data for comparison
  const getPreviousPeriodData = () => {
    if (timeframe === 'quarterly') {
      const prevQuarter = quarter === 1 ? 4 : quarter - 1;
      const prevYear = quarter === 1 ? year - 1 : year;
      return sampleReportData.quarterly.find(item => 
        item.year === prevYear && item.quarter === prevQuarter
      ) || { revenue: { total: 0 }, expenses: { total: 0 }, profit: 0 };
    } else {
      return sampleReportData.annual.find(item => 
        item.year === year - 1
      ) || { revenue: { total: 0 }, expenses: { total: 0 }, profit: 0 };
    }
  };

  const previousPeriod = getPreviousPeriodData();

  // Calculate percentage changes
  const calculateChange = (current, previous) => {
    if (!previous) return 100;
    return ((current - previous) / previous) * 100;
  };

  const revenueChange = calculateChange(
    filteredData.revenue?.total || 0, 
    previousPeriod.revenue?.total || 0
  );
  
  const expensesChange = calculateChange(
    filteredData.expenses?.total || 0, 
    previousPeriod.expenses?.total || 0
  );
  
  const profitChange = calculateChange(
    filteredData.profit || 0, 
    previousPeriod.profit || 0
  );

  // Summary metrics
  const summaryMetrics = [
    {
      title: 'Total Revenue',
      value: filteredData.revenue?.total || 0,
      change: revenueChange,
      icon: DollarSignIcon,
      format: 'currency'
    },
    {
      title: 'Total Expenses',
      value: filteredData.expenses?.total || 0,
      change: expensesChange,
      icon: DollarSignIcon, 
      format: 'currency',
      changeDirection: 'inverse' // For expenses, down is good
    },
    {
      title: 'Net Profit',
      value: filteredData.profit || 0,
      change: profitChange,
      icon: DollarSignIcon,
      format: 'currency'
    },
    {
      title: 'Profit Margin',
      value: filteredData.revenue?.total ? 
        (filteredData.profit / filteredData.revenue.total) * 100 : 0,
      change: calculateChange(
        filteredData.revenue?.total ? (filteredData.profit / filteredData.revenue.total) * 100 : 0,
        previousPeriod.revenue?.total ? (previousPeriod.profit / previousPeriod.revenue.total) * 100 : 0
      ),
      icon: PercentIcon,
      format: 'percent'
    }
  ];

  // Revenue breakdown chart options
  const revenueBreakdownOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
    },
    colors: ['#4361ee', '#3f37c9', '#4895ef', '#4cc9f0'],
    labels: Object.keys(filteredData.revenue?.byCategory || {}),
    legend: {
      position: 'bottom'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  // Expense breakdown chart options
  const expenseBreakdownOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
    },
    colors: ['#560bad', '#7209b7', '#b5179e', '#f72585'],
    labels: Object.keys(filteredData.expenses?.byCategory || {}),
    legend: {
      position: 'bottom'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  // Monthly revenue trend chart options
  const monthlyTrendOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false
      },
      background: 'transparent',
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    colors: ['#4361ee', '#560bad'],
    xaxis: {
      categories: filteredData.monthlyBreakdown?.map(item => item.month) || []
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return `$${value.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          })}`;
        }
      }
    },
    tooltip: {
      y: {
        formatter: (value) => {
          return `$${value.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}`;
        }
      }
    },
    legend: {
      position: 'top'
    }
  };

  // Report tabs
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChartIcon },
    { id: 'revenue', label: 'Revenue Analysis', icon: LineChartIcon },
    { id: 'expenses', label: 'Expense Analysis', icon: PieChartIcon }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-surface-50 dark:bg-surface-900"
    >
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-surface-600 dark:text-surface-400 hover:text-primary mb-4">
            <ChevronLeftIcon className="w-4 h-4 mr-1" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white mb-2 md:mb-0">
              Financial Reports
            </h1>
            <div className="flex flex-wrap items-center space-x-3">
              <div className="inline-flex border border-surface-200 dark:border-surface-700 rounded-lg overflow-hidden">
                <button 
                  onClick={() => setTimeframe('quarterly')}
                  className={`px-3 py-1.5 text-sm font-medium ${
                    timeframe === 'quarterly' ? 
                    'bg-primary text-white' : 
                    'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300'
                  }`}
                >
                  Quarterly
                </button>
                <button 
                  onClick={() => setTimeframe('annual')}
                  className={`px-3 py-1.5 text-sm font-medium ${
                    timeframe === 'annual' ? 
                    'bg-primary text-white' : 
                    'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300'
                  }`}
                >
                  Annual
                </button>
              </div>
              
              {timeframe === 'quarterly' && (
                <div className="flex items-center space-x-2">
                  <select 
                    value={quarter}
                    onChange={(e) => setQuarter(parseInt(e.target.value))}
                    className="form-select rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-white py-1.5 pl-3 pr-8 text-sm"
                  >
                    <option value="1">Q1</option>
                    <option value="2">Q2</option>
                    <option value="3">Q3</option>
                    <option value="4">Q4</option>
                  </select>
                  
                  <select 
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    className="form-select rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-white py-1.5 pl-3 pr-8 text-sm"
                  >
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                  </select>
                </div>
              )}
              
              {timeframe === 'annual' && (
                <select 
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  className="form-select rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-white py-1.5 pl-3 pr-10 text-sm"
                >
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </select>
              )}
            </div>
          </div>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            <CalendarIcon className="w-4 h-4 inline mr-1" />
            {timeframe === 'quarterly' ? 
              `Q${quarter} ${year} (${format(new Date(year, (quarter - 1) * 3, 1), 'MMM')} - ${format(new Date(year, quarter * 3 - 1, 0), 'MMM yyyy')})` : 
              `Annual ${year} (Jan - Dec ${year})`
            }
          </p>
        </div>

        {/* Report Tabs */}
        <div className="mb-6 border-b border-surface-200 dark:border-surface-700">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary dark:text-primary-light'
                      : 'border-transparent text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {summaryMetrics.map((metric, index) => {
            const Icon = metric.icon;
            const TrendIcon = metric.change > 0 ? 
              (metric.changeDirection === 'inverse' ? TrendingDownIcon : TrendingUpIcon) : 
              (metric.changeDirection === 'inverse' ? TrendingUpIcon : TrendingDownIcon);
            
            const isPositive = metric.changeDirection === 'inverse' ? 
              metric.change < 0 : 
              metric.change > 0;
            
            return (
              <div 
                key={index} 
                className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-surface-500 dark:text-surface-400 text-sm font-medium">
                    {metric.title}
                  </span>
                  <Icon className="w-5 h-5 text-primary dark:text-primary-light" />
                </div>
                <div className="flex items-baseline">
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white">
                    {metric.format === 'currency' 
                      ? `$${metric.value.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}` 
                      : `${metric.value.toFixed(1)}%`}
                  </h3>
                  <span className={`ml-2 text-xs font-medium flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.abs(metric.change).toFixed(1)}%
                    {isPositive ? (
                      <ArrowUpIcon className="w-3 h-3 ml-0.5" />
                    ) : (
                      <ArrowDownIcon className="w-3 h-3 ml-0.5" />
                    )}
                  </span>
                </div>
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                  {timeframe === 'quarterly' ? 
                    `Compared to Q${quarter === 1 ? 4 : quarter - 1} ${quarter === 1 ? year - 1 : year}` : 
                    `Compared to ${year - 1}`}
                </p>
              </div>
            );
          })}
        </div>

        {/* Active Tab Content */}
        <ReportCard 
          timeframe={timeframe}
          activeTab={activeTab}
          data={filteredData}
          revenueBreakdownOptions={revenueBreakdownOptions}
          expenseBreakdownOptions={expenseBreakdownOptions}
          monthlyTrendOptions={monthlyTrendOptions}
        />
      </div>
    </motion.div>
  );
};

export default ReportsPage;