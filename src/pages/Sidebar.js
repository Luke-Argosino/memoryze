import { makeStyles } from "@material-ui/core";
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";

const drawerWidth = 240;

const useStyles = makeStyles ({
    page: {
        background:'f9f9f9', 
        width: '100%'
    },
    drawer: {
        width: drawerWidth
    }
})

export default function Sidebar({children}) {
    const classes = useStyles()

    return (
        <div>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
            >
            </Drawer>
        </div>
    );
}