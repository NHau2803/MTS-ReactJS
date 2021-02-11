const { makeStyles } = require("@material-ui/core");

export const useSelectTopicStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      //maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 300,
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
    subHeader: {
      fontSize: "1.5rem",
    },
}));