import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import { CoinList } from '../config/api';
import { useNavigate } from 'react-router-dom';
import { Container, LinearProgress, TableContainer, TextField, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const CoinsTable = () => {

    const navigate = useNavigate();

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1);

    const fetchCoins = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(CoinList())
            setCoins(data);
            setLoading(false)
            setError(null)
        } catch (err) {
            setError(err)
        }
    }

    useEffect(() => {
        fetchCoins()
    }, [])

    const handleSearch = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        );
    };

    const useStyles = makeStyles({
        row: {
            backgroundColor: "#16171a",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#131111",
            },
            fontFamily: "Bakbak",
        },
        pagination: {
            "& .MuiPaginationItem-root": {
                color: "gold",
            },
        },
    });

    const classes = useStyles();

    if (error) {
        return (
            <div>
                Oh no! Something went wrong {error.message}
                <button onClick={() => fetchCoins()}>Try Again</button>
            </div>
        )
    }

    return (

        <Container style={{ textAlign: 'center' }} data-testid="coins">
            <Typography
                variant='h4'
                style={{
                    margin: 18,
                    fontFamily: 'Bakbak'
                }}>
                Cryptocurrency Prices by Market Cap
            </Typography>

            <TextField
                label="Search for a Cryptocurrency"
                variant='outlined'
                style={{
                    marginBottom: 20,
                    width: "100%",
                    color: 'white',
                }}
                onChange={(e) => setSearch(e.target.value)}>

            </TextField>

            <TableContainer>
                {loading ? (
                    <LinearProgress style={{ backgroundColor: "black" }} />
                ) : (
                    <Table>
                        <TableHead style={{ backgroundColor: 'white' }}>
                            <TableRow>
                                {['Coin', "Price", "24h Change", "Market Cap"].map((head) => (
                                    <TableCell
                                        style={{
                                            color: 'black',
                                            fontWeight: '700',
                                            fontFamily: 'Bakbak'
                                        }}
                                        key={head}
                                        align={head === "Coin" ? "" : "right"}
                                    >
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {handleSearch()
                                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                .map((row) => {
                                    const profit = row.price_change_percentage_24h > 0;
                                    return (
                                        <TableRow
                                            onClick={() => navigate(`/coins/${row.id}`)}
                                            className={classes.row}
                                            key={row.name}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                style={{
                                                    display: "flex",
                                                    gap: 15,
                                                }}
                                            >
                                                <img
                                                    src={row?.image}
                                                    alt={row.name}
                                                    height="50"
                                                    style={{ marginBottom: 10 }}
                                                />
                                                <div
                                                    style={{ display: "flex", flexDirection: "column" }}
                                                >
                                                    <span
                                                        style={{
                                                            textTransform: "uppercase",
                                                            fontSize: 22,
                                                            color: 'white'
                                                        }}
                                                    >
                                                        {row.symbol}
                                                    </span>
                                                    <span style={{ color: "white" }}>
                                                        {row.name}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell align="right"
                                                style={{
                                                    color: 'white'
                                                }}>
                                                ${" "}
                                                {numberWithCommas(row?.current_price)}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                style={{
                                                    color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {profit && "+"}
                                                {row?.price_change_percentage_24h}%
                                            </TableCell>
                                            <TableCell align="right"
                                                style={{
                                                    color: 'white'
                                                }}>
                                                ${" "}
                                                {numberWithCommas(
                                                    row?.market_cap.toString().slice(0, -6)
                                                )}
                                                M
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
            <Pagination
                count={(handleSearch()?.length / 10).toFixed(0)}
                style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
                classes={{ ul: classes.pagination }}
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 450);
                }}
            />
        </Container>
    )
}
