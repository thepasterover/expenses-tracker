import dynamic from 'next/dynamic'

import React, { useState, useEffect } from 'react'
const Chart = dynamic(
    () => {
        return import('react-apexcharts')
    },
    { ssr: false }
)
import { Box } from '@material-ui/core'

import { axiosInstance } from '../../axios'

const TransactionChart = ({session, date}) => {
    const [ chartOptions, setChartOptions ] = useState(
        {
            series: [{
                name: 'expenses',
                data: []
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
                colors: ['#ff3378'],
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'datetime',
                },
                yaxis: {
                    show: false
                },
                tooltip: {
                    x: {
                    format: 'dd/MM/yy HH:mm'
                    },
                    marker: false
                },
                grid: {
                    show: true
                }
                
            },
        }
    )


    useEffect(async() => {
        try{
            const {data} = await axiosInstance.post('/user/transactions', {
                date: date
            }, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': session.token,
                }
            })
            const formattedData = data.map(d => [d.date, d.amount])
            setChartOptions({...chartOptions, 
                series: [{
                    name: 'expense',
                    data: [...formattedData]
                }]
            })
        }catch(err) {
            console.log(err)
        }
    }, [date])


    return (
        <>
            <Box width={"100%"} mt={2}>
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
