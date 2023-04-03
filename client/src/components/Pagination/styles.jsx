import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  ul: {
    display: "flex",
    justifyContent: "center",
    margin: "0px 10px",
    "& .MuiPaginationItem-root": {
      margin: "0 10px", // Update the margin of the li elements here
    },
  },
}));

export default useStyles;
