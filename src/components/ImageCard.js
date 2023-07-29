import { useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TripGallery from "./TripGallery";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ClearIcon from '@mui/icons-material/Clear';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const ImageCard = () => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const items = [
        'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1600',
        'https://images.pexels.com/photos/635279/pexels-photo-635279.jpeg?auto=compress&cs=tinysrgb&w=1600',
        'https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=1600'


    ]


    return (
        <Card >
            {/* <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                // action={
                //   <IconButton aria-label="settings">
                //     <MoreVertIcon />
                //   </IconButton>
                // }
                title="Hawaii"
                subheader="September 14, 2016"
            /> */}
            {/* <CardMedia
        
      /> */}
            {/* <TripGallery items={items} /> */}
            
            <CardContent sx={{
                display: 'flex',
                position: 'relative',
                justifyContent: 'center',
                width: '100%',
                height: '450px',
                backgroundImage: `url(${items[0]})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                
            }}

            >
                <Typography variant="body2" color="text.secondary" sx={{
                  color: "blue",
                  position: "absolute",
                  bottom: "10px",
                  left: "5px",
                  fontSize: "18px",
                  fontWeight: "bold"
                }}>
                    Trip description
                </Typography>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardContent>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Trip details:</Typography>
                    <Typography paragraph>
                        More details
                    </Typography>
                    <Typography paragraph>
                        ksdgbmldfmnghmnglhnm
                    </Typography>

                </CardContent>
            </Collapse>
            <CardActions sx={{ display: 'flex', justifyContent: "space-around", width: '100%' }}>
                <IconButton aria-label="add to declined">
                    <ClearIcon />
                </IconButton>
                <IconButton aria-label="add to wishlist">
                    <BookmarksIcon />
                </IconButton>
                <IconButton aria-label="add to intresting">
                    <FavoriteIcon />
                </IconButton>



            </CardActions>
        </Card>
    );
}


export default ImageCard