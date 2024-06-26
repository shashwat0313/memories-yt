import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        color: 'rgba(0,183,255, 1)',
    },
    image: {
        marginLeft: '15px',
    },
    [theme.breakpoints.down('sm')]:{
        mainContainer:{
            flexDirection: "column-reverse"
        }
    }
}));

// import { makeStyles } from '@material-ui/core/styles'
// import { deepPurple } from '@material-ui/core/colors'

// export default makeStyles((theme) => ({
//     appBar: {
//         borderRadius: 15,
//         margin: '30px 0',
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: '10px 50px',
//     },
//     heading: {
//         color: 'rgba(0,183,255, 1)',
//         textDecoration: 'none',
//     },
//     image: {
//         marginLeft: '15px',
//     },
//     toolbar: {
//         display: 'flex',
//         justifyContent: 'flex-end',
//         width: '400px',
//     },
//     profile: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         width: '400px',
//     },
//     userName: {
//         display: 'flex',
//         alignItems: 'center',
//     },
//     brandContainer: {
//         display: 'flex',
//         alignItems: 'center',
//     },
//     purple: {
//         color: theme.palette.getContrastText(deepPurple[500]),
//         backgroundColor: deepPurple[500],
//     },
// }
// ))

// when mui version is 5, use this instead

// import styled from '@emotion/styled'

// export const AppBar = styled('div')({
//     borderRadius: 15,
//     margin: '30px 0',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   });