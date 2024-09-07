"use client"; // Add this directive at the top

import { useState, useRef } from 'react';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

const defaultData = {
  labels: ['A', 'B', 'C'],
  datasets: [
    {
      label: 'Sample Data',
      data: [10, 20, 30],
      backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
      borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
      borderWidth: 1
    }
  ]
};

const ChartComponent: React.FC<{ type: 'bar' | 'pie' | 'line' | 'doughnut'; data: any; chartRef: React.RefObject<any>; title: string }> = ({ type, data, chartRef, title }) => {
  const Chart = type === 'bar' ? Bar : type === 'pie' ? Pie : type === 'line' ? Line : Doughnut;

  return <Chart data={data} ref={chartRef} options={{ plugins: { title: { display: true, text: title } }, maintainAspectRatio: false }} />;
};

const Home: React.FC = () => {
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'line' | 'doughnut'>('bar');
  const [labels, setLabels] = useState<string>('Label 1,Label 2,Label 3');
  const [data, setData] = useState<string>('10,20,30');
  const [title, setTitle] = useState<string>('Chart Title');
  const [chartData, setChartData] = useState<any>(null);
  const chartRef = useRef<any>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const labelsArray = labels.split(',').map(label => label.trim());
    const dataArray = data.split(',').map(value => parseFloat(value.trim()));

    if (labelsArray.length === dataArray.length && labelsArray.length > 0) {
      setChartData({
        labels: labelsArray,
        datasets: [
          {
            label: 'User Data',
            data: dataArray,
            backgroundColor: Array(labelsArray.length).fill('rgba(75, 192, 192, 0.2)'),
            borderColor: Array(labelsArray.length).fill('rgba(75, 192, 192, 1)'),
            borderWidth: 1
          }
        ]
      });
    } else {
      alert('Labels and data must have the same number of entries.');
      setChartData(null);
    }

    setChartType((document.getElementById('type') as HTMLSelectElement).value as 'bar' | 'pie' | 'line' | 'doughnut');
  };

  const handleDownload = () => {
    if (chartRef.current && chartRef.current.canvas) {
      const canvas = chartRef.current.canvas?.toDataURL('image/png');
      if (canvas) {
        const link = document.createElement('a');
        link.href = canvas;
        link.download = 'chart.png';
        document.body.appendChild(link); // Append to the body
        link.click();
        document.body.removeChild(link); // Remove from the body
      } else {
        console.error('Chart canvas not found.');
      }
    } else {
      console.error('Chart reference is not available.');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', padding: '20px' }}>
      <div style={{ flex: 1, paddingRight: '20px' }}>
        <div style={{ width: '400px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <h2>Chart Generator</h2>
          <p>Instructions for inputting data:</p>
          <ul>
            <li>Enter labels separated by commas (e.g., "Label 1, Label 2").</li>
            <li>Enter data values separated by commas (e.g., "10, 20, 30").</li>
            <li>Enter a title for the chart (e.g., "My Chart Title").</li>
          </ul>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="type">Chart Type</label>
              <select
                id="type"
                defaultValue="bar"
                onChange={(e) => setChartType(e.target.value as 'bar' | 'pie' | 'line' | 'doughnut')}
                style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
              >
                <option value="bar">Bar</option>
                <option value="pie">Pie</option>
                <option value="line">Line</option>
                <option value="doughnut">Doughnut</option>
              </select>
            </div>
            <div>
              <label htmlFor="labels">Labels</label>
              <input
                id="labels"
                type="text"
                value={labels}
                onChange={(e) => setLabels(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginBottom: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  color: '#000', // Text color
                  backgroundColor: '#f9f9f9' // Background color
                }}
              />
            </div>
            <div>
              <label htmlFor="data">Data</label>
              <input
                id="data"
                type="text"
                value={data}
                onChange={(e) => setData(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginBottom: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  color: '#000', // Text color
                  backgroundColor: '#f9f9f9' // Background color
                }}
              />
            </div>
            <div>
              <label htmlFor="title">Chart Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginBottom: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  color: '#000', // Text color
                  backgroundColor: '#f9f9f9' // Background color
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Generate Chart
            </button>
          </form>
        </div>
      </div>
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '600px', height: '800px', border: '1px solid #ddd', padding: '10px', position: 'relative', marginBottom: '10px' }}>
          {chartData && <ChartComponent type={chartType} data={chartData} chartRef={chartRef} title={title} />}
        </div>
        <button
          onClick={handleDownload}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Download as PNG
        </button>
      </div>
    </div>
  );
};

export default Home;
