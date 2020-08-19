import React, { useEffect, useState } from "react";
import { Grid, Image, Button, Item, Icon, Modal } from "semantic-ui-react";
import styled from "styled-components";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Footer from "./footer";
import Youtube from "react-youtube";
import LoaderExampleText from "./Telechargement";

const Div = styled.div`
  background: #010326;
  margin-top: 2%;
  margin-left: 5%;
  margin-right: 5%;
  color: white;
  font-family: Lucida Console;
  color: white;
  font-family: 'Rancho', cursive;
  // height: 420px;
  .genre{
  font-family: 'Rancho', cursive;
  font-style: normal;
  }
`;
const H1 = styled.h1`
  color: white;
  text-decoration:underline white;
`;
const H5 = styled.h5`
  color:  #fcc707;
`;


const Detail = () => {
  let { id } = useParams();
  const params = { id };
  console.log(params.id);

  const [videos, setVideos] = useState([]);
  const [film, setFilm] = useState([]);
  const [load, setLoad] = useState(false);
  const [genres, setGenre] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=74dc0d8675d9c35ed25ec9e90a2cc597&language=fr`
      )
      .then((res) => {
        setVideos(res.data);
        setLoad(true);
        setGenre(res.data.genres)
      })
      .catch((e) => console.log(e));

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=74dc0d8675d9c35ed25ec9e90a2cc597&language=fr`
      )
      .then((res) => {
        setFilm(res.data.results[1]);
        console.log("lol" + JSON.stringify(res.data.results));
      })
      .catch((e) => console.log(e));
  }, []);
  if (load === false) {
    return <LoaderExampleText />;
  }
  return (
    <>
      <Link to="/">
        <Button
          inverted
          content="RETOUR"
          icon="left arrow"
          labelPosition="left"
          style={{ left: "5%", marginTop: "5%" }}
        />
      </Link>
      <Div>
        <Grid>
          <Grid.Column mobile={8} tablet={8} computer={8}>
            <Image
              size="tiny"
              src={
                videos.poster_path === null
                  ? "https://qph.fs.quoracdn.net/main-thumb-221356592-200-zyhrpkhlegkmkbjildezexzodkngkjec.jpeg"
                  : "https://image.tmdb.org/t/p/w500/" + videos.poster_path
              }
              alt="..."
              style={{ height: "390px", width: "400px", left: "15%" }}
            />
            <br />
            <H5>Langue : {videos.original_language} </H5>
          </Grid.Column>
          <Grid.Column mobile={8} tablet={8} computer={8}>
          <H1>{videos.title} </H1><br/>
          <H5 className="genre">Genre(s):{genres.map((genre) => genre.name).join(' / ')}</H5> 
            <h5>Sortie du film : Le {videos.release_date=== ""? "00/00/0000":videos.release_date}</h5>
            <Item>
              <Item.Extra>
              <H5><Icon color="green" name="check" />
                {videos.vote_count===""?"0":videos.vote_count} Votes</H5>
              </Item.Extra>
            </Item>
            <br />
            <h3>Détail</h3>
            {videos.overview===""?"Rien à signaler":videos.overview}<br /> <br /> <br />
            <Modal
              trigger={
                <Button
                  inverted
                  color="red"
                  content="VOIR ANNONCE"
                  icon={<Icon name="youtube" />}
                  labelPosition="left"
                />
              }              
              header="Annonce du Film"
            content={typeof film === 'undefined'?<Image src={ videos.poster_path === null? "https://qph.fs.quoracdn.net/main-thumb-221356592-200-zyhrpkhlegkmkbjildezexzodkngkjec.jpeg":"https://image.tmdb.org/t/p/w500/"+videos.backdrop_path}/>:<Youtube videoId={film.key} autoplay/>}
              actions={[{ key: "done", content: "Retour", negative: true }]}
              style={{height:"480px",left:"10%",top:"10%"}}/>
          </Grid.Column>
        </Grid>
      </Div>
      <br /> <br />
      <br /> <br />
      <Footer />
    </>
  );
};
export default Detail;
