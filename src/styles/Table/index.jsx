const { makeStyles } = require("@material-ui/core");

export const useTableStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
    },
    title: {
        marginTop: theme.spacing(10),
    },
    tableCell: {
        maxWidth: theme.spacing(35),
    }
}));