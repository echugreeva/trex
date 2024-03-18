import Carousel from 'react-material-ui-carousel';

const TripGallery  = ({items})=> {
	return (
		<Carousel>
			{
				items.map( (item, i) => <img src={item} key={i} width='100%' heigth='600px'/> )
			}
		</Carousel>
	);
};

export default TripGallery;