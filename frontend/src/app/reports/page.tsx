"use client";

import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChartLine, 
  faChartPie, 
  faChartBar,
  faCalendar,
  faDownload,
  faArrowTrendUp,
  faArrowTrendDown
} from "@fortawesome/free-solid-svg-icons";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  ZAxis
} from 'recharts';
import "./page.css";

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("30days");

  // Performance Over Time Data
  const performanceData = [
    { date: 'Jan 1', impressions: 45000, clicks: 1800, conversions: 120, spend: 850 },
    { date: 'Jan 5', impressions: 52000, clicks: 2100, conversions: 145, spend: 920 },
    { date: 'Jan 10', impressions: 48000, clicks: 1950, conversions: 132, spend: 880 },
    { date: 'Jan 15', impressions: 61000, clicks: 2450, conversions: 168, spend: 1050 },
    { date: 'Jan 20', impressions: 58000, clicks: 2300, conversions: 155, spend: 990 },
    { date: 'Jan 25', impressions: 67000, clicks: 2680, conversions: 185, spend: 1150 },
    { date: 'Jan 30', impressions: 72000, clicks: 2900, conversions: 205, spend: 1280 },
    { date: 'Feb 5', impressions: 78000, clicks: 3150, conversions: 225, spend: 1420 }
  ];

  // Platform Distribution Data
  const platformData = [
    { name: 'Meta', value: 35, campaigns: 12 },
    { name: 'Google', value: 28, campaigns: 8 },
    { name: 'Instagram', value: 18, campaigns: 7 },
    { name: 'Facebook', value: 10, campaigns: 3 },
    { name: 'Youtube', value: 6, campaigns: 2 },
  ];

  // Campaign Performance Comparison
  const campaignComparisonData = [
    { name: 'Summer Fashion', impressions: 125000, clicks: 4850, conversions: 320 },
    { name: 'Spring Sale', impressions: 89500, clicks: 3200, conversions: 245 },
    { name: 'Tech Gadgets', impressions: 45000, clicks: 1250, conversions: 98 },
    { name: 'Holiday Special', impressions: 67800, clicks: 2890, conversions: 210 },
    { name: 'Premium Drive', impressions: 52000, clicks: 2100, conversions: 165 }
  ];

  // Hourly Performance Distribution
  const hourlyData = [
    { hour: '00:00', impressions: 2500, clicks: 85 },
    { hour: '03:00', impressions: 1800, clicks: 62 },
    { hour: '06:00', impressions: 3200, clicks: 110 },
    { hour: '09:00', impressions: 8500, clicks: 340 },
    { hour: '12:00', impressions: 12000, clicks: 480 },
    { hour: '15:00', impressions: 10500, clicks: 420 },
    { hour: '18:00', impressions: 14000, clicks: 560 },
    { hour: '21:00', impressions: 9500, clicks: 380 }
  ];

  // Device Distribution
  const deviceData = [
    { name: 'Mobile', value: 58 },
    { name: 'Desktop', value: 32 },
    { name: 'Tablet', value: 10 }
  ];

  // Age Group Distribution
  const ageGroupData = [
    { age: '18-24', male: 4500, female: 5200 },
    { age: '25-34', male: 8900, female: 9500 },
    { age: '35-44', male: 6700, female: 7100 },
    { age: '45-54', male: 4200, female: 4800 },
    { age: '55+', male: 2800, female: 3400 }
  ];

  // Platform Engagement (Dot Plot Data)
  const platformEngagementData = [
    { platform: 'Meta', engagement: 85, reach: 35000 },
    { platform: 'Google', engagement: 78, reach: 28000 },
    { platform: 'Instagram', engagement: 92, reach: 18000 },
    { platform: 'Facebook', engagement: 65, reach: 10000 },
    { platform: 'Youtube', engagement: 88, reach: 6000 },
    
  ];

  const COLORS = ['#eb723a', '#dc0ae4', '#22C55E', '#3B82F6', '#A78BFA', '#F59E0B'];

  return (
    <DashboardLayout>
      <div className="reports-page">
        {/* Header */}
        <div className="reports-header">
          <div>
            <h1 className="reports-title">Analytics & Reports</h1>
            <p className="reports-subtitle">Comprehensive insights into your campaign performance</p>
          </div>
          <div className="reports-actions">
            <select 
              className="reports-date-select"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="custom">Custom Range</option>
            </select>
            <button className="reports-download-btn">
              <FontAwesomeIcon icon={faDownload} /> Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics Summary */}
        <div className="reports-metrics-grid">
          <div className="metric-card">
            <div className="metric-icon" style={{ background: 'rgba(235, 114, 58, 0.1)' }}>
              <FontAwesomeIcon icon={faChartLine} style={{ color: '#eb723a' }} />
            </div>
            <div className="metric-content">
              <p className="metric-label">Total Impressions</p>
              <h3 className="metric-value">481,000</h3>
              <p className="metric-change positive">
                <FontAwesomeIcon icon={faArrowTrendUp} /> +12.5% from last period
              </p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
              <FontAwesomeIcon icon={faChartBar} style={{ color: '#22C55E' }} />
            </div>
            <div className="metric-content">
              <p className="metric-label">Total Clicks</p>
              <h3 className="metric-value">19,290</h3>
              <p className="metric-change positive">
                <FontAwesomeIcon icon={faArrowTrendUp} /> +8.3% from last period
              </p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
              <FontAwesomeIcon icon={faChartPie} style={{ color: '#3B82F6' }} />
            </div>
            <div className="metric-content">
              <p className="metric-label">Conversion Rate</p>
              <h3 className="metric-value">4.2%</h3>
              <p className="metric-change negative">
                <FontAwesomeIcon icon={faArrowTrendDown} /> -0.8% from last period
              </p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon" style={{ background: 'rgba(250, 204, 21, 0.1)' }}>
              <FontAwesomeIcon icon={faCalendar} style={{ color: '#FACC15' }} />
            </div>
            <div className="metric-content">
              <p className="metric-label">Total Spend</p>
              <h3 className="metric-value">$8,590</h3>
              <p className="metric-change positive">
                <FontAwesomeIcon icon={faArrowTrendUp} /> ROI: 285%
              </p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="reports-charts-grid">
          {/* Performance Over Time - Area Chart */}
          <div className="chart-card chart-card--large">
            <div className="chart-card-header">
              <h3>Performance Over Time</h3>
              <div className="chart-legend-custom">
                <span><span className="legend-dot" style={{background: '#eb723a'}}></span>Impressions</span>
                <span><span className="legend-dot" style={{background: '#22C55E'}}></span>Clicks</span>
                <span><span className="legend-dot" style={{background: '#3B82F6'}}></span>Conversions</span>
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#eb723a" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#eb723a" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2933" />
                  <XAxis dataKey="date" stroke="#A0A7B4" />
                  <YAxis stroke="#A0A7B4" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#141821', 
                      border: '1px solid #1F2933',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }} 
                  />
                  <Area type="monotone" dataKey="impressions" stroke="#eb723a" strokeWidth={2} fillOpacity={1} fill="url(#colorImpressions)" />
                  <Area type="monotone" dataKey="clicks" stroke="#22C55E" strokeWidth={2} fillOpacity={1} fill="url(#colorClicks)" />
                  <Area type="monotone" dataKey="conversions" stroke="#3B82F6" strokeWidth={2} fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Platform Distribution - Pie Chart */}
          <div className="chart-card">
            <div className="chart-card-header">
              <h3>Traffic by Platform</h3>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#141821', 
                      border: '1px solid #1F2933',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }}
                    itemStyle={{
                      color: '#FFFFFF'
                    }}
                    labelStyle={{
                      color: '#FFFFFF',
                      fontWeight: 600
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Platform Engagement - Dot Plot (Scatter) */}
          <div className="chart-card">
            <div className="chart-card-header">
              <h3>Platform Engagement Score</h3>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2933" />
                  <XAxis 
                    type="category" 
                    dataKey="platform" 
                    name="Platform" 
                    stroke="#A0A7B4"
                  />
                  <YAxis 
                    type="number" 
                    dataKey="engagement" 
                    name="Engagement" 
                    stroke="#A0A7B4"
                    domain={[0, 100]}
                  />
                  <ZAxis 
                    type="number" 
                    dataKey="reach" 
                    range={[100, 1000]} 
                    name="Reach"
                  />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ 
                      backgroundColor: '#141821', 
                      border: '1px solid #1F2933',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }}
                    itemStyle={{
                      color: '#FFFFFF'
                    }}
                    labelStyle={{
                      color: '#FFFFFF',
                      fontWeight: 600
                    }}
                    formatter={(value: any, name?: string) => {
                      if (name === 'Engagement') return [`${value}%`, 'Engagement Score'];
                      if (name === 'Reach') return [value.toLocaleString(), 'Reach'];
                      return [value, name || ''];
                    }}
                  />
                  <Scatter 
                    data={platformEngagementData} 
                    fill="#eb723a"
                  >
                    {platformEngagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* div>
          </div>

          {/* Campaign Comparison - Bar Chart */}
          <div className="chart-card chart-card--large">
            <div className="chart-card-header">
              <h3>Top Campaigns Performance</h3>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={campaignComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2933" />
                  <XAxis dataKey="name" stroke="#A0A7B4" />
                  <YAxis stroke="#A0A7B4" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#141821', 
                      border: '1px solid #1F2933',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="impressions" fill="#eb723a" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="clicks" fill="#22C55E" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="conversions" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Hourly Distribution - Line Chart */}
          <div className="chart-card">
            <div className="chart-card-header">
              <h3>Hourly Performance</h3>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2933" />
                  <XAxis dataKey="hour" stroke="#A0A7B4" />
                  <YAxis stroke="#A0A7B4" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#141821', 
                      border: '1px solid #1F2933',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }} 
                  />
                  <Legend />
                  <Line type="monotone" dataKey="impressions" stroke="#eb723a" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="clicks" stroke="#22C55E" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Device Distribution - Pie Chart */}
          <div className="chart-card">
            <div className="chart-card-header">
              <h3>Device Distribution</h3>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#141821', 
                      border: '1px solid #1F2933',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }}
                    itemStyle={{
                      color: '#FFFFFF'
                    }}
                    labelStyle={{
                      color: '#FFFFFF',
                      fontWeight: 600
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Age & Gender Distribution - Histogram */}
          <div className="chart-card chart-card--large">
            <div className="chart-card-header">
              <h3>Audience Demographics (Age & Gender)</h3>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ageGroupData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2933" />
                  <XAxis dataKey="age" stroke="#A0A7B4" />
                  <YAxis stroke="#A0A7B4" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#141821', 
                      border: '1px solid #1F2933',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="male" fill="#3B82F6" radius={[8, 8, 0, 0]} name="Male" />
                  <Bar dataKey="female" fill="#A78BFA" radius={[8, 8, 0, 0]} name="Female" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
