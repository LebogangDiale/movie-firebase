import React from 'react';
import {useParams} from 'react-router-dom';

//config movies
import {IMAGE_BASE_URL, POSTER_SIZE} from '../config';
//components
import BreadCrumb from './BreadCrumb';
import Grid from './Grid';
import Spinner from './Spinner';
//hook
import {useMovieFecth} from '../hooks/useMovieFetch';

//image
import NoImage from '../pictures/no_image.jpeg';

import MovieInfo from './MovieInfo';

import MovieInfoBar from './MovieInfoBar'
import Actor from './Actor'





const Movie = () => {
    const {movieId} = useParams();

    const{cool: movie, loading,error} = useMovieFecth(movieId)
    
    if(loading) return <Spinner/>
    if(error) return <div>Something didn't work...</div>
   
    return(
        <>
        <BreadCrumb movieTitle={movie.original_title}/> 
        <MovieInfo movie={movie}/>
        <MovieInfoBar
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />
      <Grid header='Actors'>
        {movie.actors.map(actor => (
          <Actor
            key={actor.credit_id}
            name={actor.name}
            character={actor.character}
            imageUrl={
              actor.profile_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                : NoImage
            }
          />
        ))}
      </Grid>
        </>

    ); 
};

export default Movie;