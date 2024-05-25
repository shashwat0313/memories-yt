import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  chipInput:{
    marginTop:'1rem'
  },

  searchButton:{
    marginTop:'.7rem',
    backgroundColor:'#3f51b5',
    color:"white",
    width:"45%",
    alignSelf:'center'
  }

}));