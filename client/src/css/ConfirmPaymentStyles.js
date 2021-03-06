import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  page: {
    width: '100%',
    textAlign: 'center',
  },
  header: {
    textAlign: 'center',
    marginTop: 0,
    paddingTop: 5,
  },
  divider: {
    display: 'flex',
    flewFlow: 'row nowrap',
    justifyContents: 'center',
    alignItems: 'center',
    width: '100%',
  },
  btnBase: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  paper: {
    borderRadius: 20,
    height: 190,
    width: 380,
    backgroundColor: theme.palette.secondary.main,
    margin: 0,
  },
  card: {
    padding: 20,
    textAlign: 'center',
    borderRadius: 20, // "20px"
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex start',
    alignItems: 'stretch',
    height: 150,
    width: 350,
    backgroundColor: theme.palette.primary.main,

  },
  middleSpace: {
    flex: '1 0 auto',
  },
  circles: {
    maxWidth: 100,
    maxHeight: 100,
    float: 'left',
  },
  link: {
    float: 'right',
    paddingRight: '10%',
    marginBottom: 15,
    marginTop: 5,
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    textAlign: 'center',
    marginTop: 10,
  },
}));

export default useStyles;
