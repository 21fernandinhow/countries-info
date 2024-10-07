"use client"

import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { useEffect, useState } from 'react'
import { PopulationData } from '@/app/country-info/[countryName]/[countryCode]/page'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

interface ChartData {
    labels: number[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
    }[];
}

const PopulationChart = ({ populationData }: { populationData: PopulationData[] }) => {
    const [chartData, setChartData] = useState<ChartData | null>(null)

    useEffect(() => {
        if (populationData) {
            const labels = populationData.map((data) => data.year)
            const dataValues = populationData.map((data) => data.value)

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Population Growth',
                        data: dataValues,
                        borderColor: 'rgba(0,0,0, 1)',
                        backgroundColor: 'rgba(0,0,0, 1)',
                    },
                ],
            })
        }
    }, [populationData])

    return (
        <div className='max-w-lg mx-auto'>
            {chartData && <Line data={chartData} />}
        </div>
    )
}

export default PopulationChart
