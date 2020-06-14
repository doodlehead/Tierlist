import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    marginBottom: 10,
    fontWeight: 500,
  },
  stepContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "20px auto",
    justifyContent: "center",
  },
  card: {
    margin: "10px",
  },
  "@media only screen and (min-width: 768px)": {
    card: {
      minWidth: 200,
      marginRight: 12,
    },
    stepContainer: {
      flexDirection: "row",
    },
  },
});

const Homepage = (): JSX.Element => {
  const classes = useStyles();

  const renderCard = (title: string, body: JSX.Element): JSX.Element => {
    return (
      <Card className={classes.card} key={title}>
        <CardContent>
          <Typography variant="h4" className={classes.title}>
            {title}
          </Typography>
          {body}
        </CardContent>
      </Card>
    );
  };

  const step1 = <Typography>Pick a media type to search</Typography>;
  const step2 = <Typography>Search for your entry</Typography>;
  const step3 = <Typography>Create your own tierlist</Typography>;
  const step4 = <Typography>Download it and share it</Typography>;

  const steps = [
    { title: "Step 1", body: step1 },
    { title: "Step 2", body: step2 },
    { title: "Step 3", body: step3 },
    { title: "Step 4", body: step4 },
  ];

  return (
    <div>
      <h1>Make your own Tierlists!</h1>
      <h2>This page is a Work In Progress.</h2>
      <div className={classes.stepContainer}>
        {steps.map((step) => renderCard(step.title, step.body))}
      </div>
    </div>
  );
};

export default Homepage;
