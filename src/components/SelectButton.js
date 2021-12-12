import { makeStyles } from "@material-ui/core/styles";
import React from 'react'

export const SelectButton = ({ children, selected, onClick }) => {
    const useStyles = makeStyles({
        selectbutton: {
            border: "1px solid black",
            borderRadius: 5,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily: "Bakbak",
            cursor: "pointer",
            backgroundColor: selected ? "white" : "",
            color: selected ? "black" : "",
            fontWeight: selected ? 700 : 500,
            "&:hover": {
                backgroundColor: "white",
                color: "black",
            },
            width: "22%",
        },
    });
    const classes = useStyles();
    return (
        <span
            className={classes.selectbutton}
            onClick={onClick}>
            {children}
        </span>
    )
}
