import { AppBar, Container, makeStyles, Toolbar, Typography } from '@material-ui/core'

import React from 'react'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    banner: {
        backgroundColor: 'black',
    },
    title: {
        flex: 1,
        color: 'white',
        fontFamily: "Bakbak",
        fontWeight: 'bold',
        cursor: 'pointer',
    }
}))

export const Header = () => {

    const navigate = useNavigate();


    const classes = useStyles()
    return (
        <AppBar color='transparent' position='static' className={classes.banner}>
            <Container>
                <Toolbar>
                    <Typography onClick={() => navigate("/")} className={classes.title}>
                        Cyryptocurrency
                    </Typography>
                </Toolbar>
            </Container>

        </AppBar>
    )
}
