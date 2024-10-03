import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Add this import
} from 'chart.js';
import { getTaskStatsApi } from '../../apis';
import { useSelector } from 'react-redux';

// Register required components including ArcElement
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Register ArcElement
);

function TaskStatistics({todo}) {
    const user = useSelector(state => state.user);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        async function fetchStats() {
            const res = await getTaskStatsApi(user._id);
            if (res?.success) {
                setStats(res.data);
            }
        }
        fetchStats();
    }, [user._id,todo]);

    if (!stats) return <div>Loading...</div>;

    const barData = {
        labels: ['Total Tasks', 'Completed Tasks', 'Overdue Tasks'],
        datasets: [
            {
                label: 'Task Statistics',
                backgroundColor: ['#4caf50', '#2196f3', '#f44336'],
                data: [stats.totalTasks, stats.completedTasks, stats.overdueTasks],
            },
        ],
    };

    const pieData = {
        labels: ['Completed', 'Overdue'],
        datasets: [
            {
                backgroundColor: ['#4caf50', '#f44336'],
                data: [stats.completedTasks, stats.overdueTasks],
            },
        ],
    };

    return (
        <div>
            <h2>Task Statistics</h2>
            <div>
                <Bar data={barData} />
                <Pie data={pieData} />
            </div>
        </div>
    );
}

export default TaskStatistics;