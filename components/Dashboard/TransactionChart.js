import dynamic from 'next/dynamic'

import React, { useState } from 'react'
const Chart = dynamic(
    () => {
        return import('react-apexcharts')
    },
    { ssr: false }
)
import { Box } from '@material-ui/core'

const TransactionChart = () => {
    const [ chartOptions, setChartOptions ] = useState(
        {
            series: [{
              name: 'series1',
              data: [31, 40, 28, 51, 42, 109, 100]
            }],
            options: {
                chart: {
                    width: '100%',
                    height: 350,
                    type: 'area',
                    toolbar: {
                        show: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'datetime',
                    categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
                },
                yaxis: {
                    show: false
                },
                tooltip: {
                    x: {
                    format: 'dd/MM/yy HH:mm'
                    },
                },
                grid: {
                    show: false
                }
                
            },
        }
    )

    return (
        <>
            <Box width={"100%"}>
                <Chart 
                options={chartOptions.options}
                series={chartOptions.series}
                type="area" 
                height={350}
                width={"100%"}
                />
            </Box>
        </>
    )
}

export default TransactionChart
