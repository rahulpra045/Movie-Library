import React, { Fragment, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {AiFillPlayCircle, AiOutlineClose} from 'react-icons/ai'
import NoImg from './NoImg.jpg'
import '../Styles/Videos.css'
import { Container } from './NavBar'
import { TrailerTrending } from '../Trailers/TrailerTrending'

function Trends() {
  const { toggle, inputValue } = useContext(Container)
  const input = inputValue
  const [trendArray, setTrendArray] = useState([])
  const [trailer, setTrailer] = useState(true)
  const [trendTitle, setTrendTitle] = useState('')

  // const Shown = input ? 'search' : 'discover'
  const Api = 'https://api.themoviedb.org/3'
  const TrendsShown = '/trending/all/week'
  // const Api = 'https://api.themoviedb.org/3/trending/all/week'
  const Images = "https://image.tmdb.org/t/p/w500/"
  
  const Trends = async () => {

    const data = await axios.get(`${Api}${TrendsShown}`, {
      // const data = await axios.get(Api, {
      params: {
        api_key: 'b73c0c24a34970a26f93fc262383e7d4',
        // query: input
      }
    })
    const results = data.data.results
    setTrendArray(results)
  }

  useEffect(() => {
    setTimeout(() => {
      Trends()
      },100)
  }, [input])

  const TrendTitle = (trend) => {
    setTrendTitle(trend.title)
    setTrailer(!trailer)
  }

  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
      <div className="movies-container">
      {trendArray.map((trend) => {
        return (
          <Fragment>
            <div id={trailer ? 'container' : 'NoContainer'}>
              <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? "playIcon" : 'hide'} onClick={() => TrendTitle(trend)}/>
              <img src={trend.poster_path ? `${Images}${trend.poster_path}`:NoImg} alt='' onClick={() => TrendTitle(trend)}/>
              <h3 id= 'smaller-Text' className={toggle ? 'mainColor' : 'secondaryColor'}>{trend.title}</h3>

            </div>
          </Fragment>
        )
      })
          }
          {trailer ? console.log : <TrailerTrending TrendTitle={trendTitle} toggle={toggle} />}
          
      <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toggle ? 'DarkTheme' : 'LightThemeClose'} fontSize={55} cursor={'pointer'} onClick={() => setTrailer(true)}/>
      </div>
      </div>

      </Fragment>
  )
}

export default Trends