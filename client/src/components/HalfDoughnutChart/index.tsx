import { memo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Colors } from 'chart.js'

interface HalfDoughnutChartProps {
  data?: number[]
  labels?: string[]
  backgroundColor?: string[]
}

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Colors)

const HalfDoughnutChart = memo(({ data = [0], labels = [''], backgroundColor = ['#000'] }: HalfDoughnutChartProps) => {
  return (
    <>
      <Doughnut
        data={{
          labels: labels,
          datasets: [
            {
              label: 'Popularity of projects',
              data: data,
              borderWidth: 0,
              backgroundColor: backgroundColor,
              borderColor: ['rgba(255, 255, 255 ,1)', 'rgba(255, 255, 255 ,1)'],
              hoverOffset: 1
            }
          ]
        }}
        options={{
          responsive: true,
          rotation: -90,
          circumference: 180,
          cutout: '90%',
          aspectRatio: 2,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          }
        }}
      />
    </>
  )
})

export default HalfDoughnutChart
