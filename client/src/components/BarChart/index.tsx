import { CategoryScale, Chart, Colors, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js'
import { memo } from 'react'
import { Bar } from 'react-chartjs-2'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Colors)

interface BarChartProps {
  labels: string[]
  data: number[]
  backgroundColor: string[]
}

const BarChart = memo(({ data, labels, backgroundColor }: BarChartProps) => {
  return (
    <Bar
      data={{
        labels: labels,
        datasets: [
          {
            label: 'The number of employees',
            data: data,
            borderWidth: 0,
            backgroundColor: backgroundColor
          }
        ]
      }}
      options={{
        plugins: {
          title: {
            display: false
          },
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            display: true
          },
          y: {
            display: true
          }
        }
      }}
    />
  )
})

export default BarChart
