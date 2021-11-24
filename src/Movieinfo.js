import React from 'react'
import {Link} from 'react-router-dom'
const imgurl ="https://image.tmdb.org/t/p/w500";
const Movieinfo = ({title,imgpath, vote,id,name}) => {

       

    return (
                        <Link to={`movie/${id}`}>
                        <div className="small_box"  >
                        <img alt={title} src={imgurl + imgpath}/>
                      
                        <div className="small_box_over">  <h6>{title || name}</h6></div>
                        <div className="smalll_box_over">  <h6>{vote}</h6></div>
                        </div>
                        </Link>
                      
     
    )
}

export default Movieinfo
