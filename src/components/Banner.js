import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: "url(./banner.jpg)",
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around"
    },
    title: {
        display: 'flex',
        height: '40%',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center'
    }
}))

export const Banner = () => {

    const classes = useStyles();
    return (


        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.title}>
                    <Typography
                        variant='h2'
                        style={{
                            fontWeight: 'bold',
                            marginBottom: 15,
                            fontFamily: 'Bakbak',
                        }}>
                        Cryptocurrency
                    </Typography>
                </div>
            </Container >
        </div >
    )
}
