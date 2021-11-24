import React, {useState, useEffect, useParam}from 'react';
import {useLocation} from "react-router-dom";
import YouTube  from 'react-youtube';
import movieTrailer from "movie-trailer"
import Creditmember from "./Creditmember";



const imgurl ="https://image.tmdb.org/t/p/w1280";
const key= "af3abab3867f0ddb9831952933244908";
export const Moviedata = ({moviedata, fetchingdataa}) => {
    const [othermovieinfo, setothermovieinfo] = useState({});
    const [trailerURL, settrailerURL] = useState("");
    const location = useLocation();
    const pathid =location.pathname.split('/')[2];
    const [toggle, settoggle]= useState(true);
   // console.log(pathid);
   const data = moviedata.filter((data)=> data.id ==pathid);
    console.log(data[0]?.id);

    const fetchingdata = async ()=>{
      console.log(data[0]);
      const respond_from_api = await fetch(`https://api.themoviedb.org/3/${data[0]?.media_type}/${data[0]?.id}/credits?api_key=${key}&language=en-US`);
      const Mdatas = await respond_from_api.json();
   // console.log(Mdatas)
    setothermovieinfo(Mdatas);
      }
 
   useEffect(() => {
    fetchingdata(); 
    settoggle(false);
   },[location] )
  

  //console.log(othermovieinfo);
   // console.log(data[0]);
    const opts = {
        height: '640',
        width: '1040',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        },
      };
      useEffect(() => {
          settrailerURL("");
      
        movieTrailer(data[0]?.original_name || data[0]?.original_title|| "")
        .then(url =>{
            //console.log(url);
                    const urll = new URLSearchParams( new URL(url).search);
                  settrailerURL(urll.get("v"));
                   //console.log(trailerURL);

                }).catch((error)=> console.log(error));
              
         }, [])
       
    return (
        <div className="movie_info_box">

            <div className="classes">
            <img src={imgurl + data[0] ?.backdrop_path} />
            <div className="info">
            <h3>{data[0]?.original_title||data[0]?.original_name }</h3>
            <p><span>RELASE DATE:   </span>{data[0]?.release_date}</p>
            <p><span>ORIGINAL LANGUAGE:   </span>{data[0]?.original_language}</p>
            <p><span>MEDIA TYPE:   </span>{data[0]?.media_type}</p>
            <p><span>STORY:   </span>   {data[0]?.overview}</p>
            </div>
            </div>
           
            <h4>Trailer...</h4>
           { 
             trailerURL && <YouTube videoId={trailerURL} opts={opts} />
           }
           <h4>CAST....</h4> 
           <Creditmember othermovieinfo={othermovieinfo}/>
        
        </div>
    )
}
