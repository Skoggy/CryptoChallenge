
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { HistoricalChart } from '../config/api';
import { CircularProgress } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { chartDays } from '../config/data';
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
import { SelectButton } from './SelectButton';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export const CoinInfo = ({ coin }) => {

    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1)

    const fetchHistoricalData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days))

        setHistoricData(data.prices)
    };

    useEffect(() => {
        fetchHistoricalData()
    }, [days])

    const useStyles = makeStyles((theme) => ({
        container: {
            width: "75%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            padding: 40,
            [theme.breakpoints.down("md")]: {
                width: "100%",
                marginTop: 0,
                padding: 20,
                paddingTop: 0,
            },
        },
    }));

    const classes = useStyles();

    return (
        <div className={classes.container}>
            {
                !historicData ? (
                    <CircularProgress style={{ color: 'white' }}
                        size={250}
                        thickness={1} />
                ) : (
                    <>
                        <Line
                            data={{
                                labels: historicData.map((coin) => {
                                    let date = new Date(coin[0]);
                                    let time =
                                        date.getHours() > 12
                                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                            : `${date.getHours()}:${date.getMinutes()} AM`;
                                    return days === 1 ? time : date.toLocaleDateString();
                                }),

                                datasets: [
                                    {
                                        data: historicData.map((coin) => coin[1]),
                                        label: `Price ( Past ${days} Days ) in Aud`,
                                        borderColor: "white",

                                    },
                                ],
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 1,
                                    },
                                },
                                legend: {
                                    labels: {
                                        fontColor: "white",
                                        fontSize: 18
                                    }
                                },
                            }}
                        />
                        <div
                            style={{
                                display: 'flex',
                                marginTop: 20,
                                justifyContent: 'space-around',
                                width: '100%',

                            }}>
                            {chartDays.map(day => (
                                <SelectButton
                                    key={day.value}
                                    onClick={() => setDays(day.value)}
                                    selected={day.value === days}>
                                    {day.label}
                                </SelectButton>
                            ))}
                        </div>
                    </>
                )}
        </div>
    )
}
