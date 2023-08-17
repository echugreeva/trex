import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import { KeyboardReturnOutlined } from '@mui/icons-material'


const TripGallery  = ({items})=> {
  return (
        <Carousel>
        {
            items.map( (item, i) => <img src={item} key={i} width='100%' heigth='600px'/> )
        }
        </Carousel>
    )
}

export default TripGallery