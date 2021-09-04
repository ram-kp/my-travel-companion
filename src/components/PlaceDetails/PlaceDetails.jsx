import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

const PlaceDetails = ({ place, selected, refProp }) => {
    console.log(place);
    const classes = useStyles();

    if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    return(
        <Card elevation={6}>
            <CardMedia
                style={{ height: 350 }}
                image= {place.photo ? place.photo.images.large.url: 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                title= {place.name}
            />
            <CardContent>
                <Typography variant="h5" gutterBottom>{place.name}</Typography>
                <Box display="flex" justifyContent="space-between">
                    <Rating size="small" value={Number(place.rating)} readOnly />
                    <Typography gutterBottom variant="subtitle1">{place.rating} out of {place.num_reviews} reviews</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Price</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.price_level==""?place.price_level:place.price}</Typography>
                </Box>
                <Box my={3} display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">Ranking: </Typography>
                    <Typography gutterBottom size="small" variant="subtitle2">{place.ranking}</Typography>
                </Box>
                {place?.awards?.map((award) => (
                    <Box my={2} display="flex" justifyContent="space-between" alignItems='center'>
                        <img src={award.images.small} alt={award.display_name} />
                        <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                    </Box>
                ))}
                {place?.cuisine?.map(({ name }) => {
                    <Chip key={name} size="small" label={name} className={classes.chip} />
                })}
                {place?.location_string && (
                    <Typography gutterBottom size="small" color="textSecondary" className={classes.subtitle2}>
                        <LocationOnIcon my={10} /> {place.location_string}-{place.neighborhood_info? place.neighborhood_info[0].name:''}
                    </Typography>
                )}
                {place?.phone && (
                    <Typography my={20}gutterBottom size="small" color="textSecondary" className={classes.subtitle2}>
                        <PhoneIcon /> {place.phone}
                    </Typography>
                )}
                <CardActions>
                    <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
                        Trip Advisor
                    </Button>
                    <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                        Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default PlaceDetails;