import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  Image,
  Button,
  Rating,
  Item,
  Header,
  Icon,
  Modal
} from "semantic-ui-react";
import styled from "styled-components";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Footer from "./footer";
import Youtube from "react-youtube";

const Div = styled.div`
  background: #010326;
  margin-top: 7%;
  margin-left: 5%;
  margin-right:5%;
  color: white;
  font-family: Lucida Console;
  color: white;
  // height: 420px;
`;
const H1 = styled.h1`
  color: white;
`;
const P = styled.p`
  color: white;
  font-size: 20px;
`;
const H4 = styled.h1`
  color: white;
  font-size: 20px;
`;

const Detail = () => {
  let { id } = useParams();
  const params = { id };
  console.log(params.id);

  const [videos, setVideos] = useState([]);
  const [detail, setDetail] = useState([]);
  const [film, setFilm] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=74dc0d8675d9c35ed25ec9e90a2cc597&language=fr`
      )
      .then((res) => {
        setVideos(res.data);
        setDetail(res.data.detail);
      })
      .catch((e) => console.log(e));

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=74dc0d8675d9c35ed25ec9e90a2cc597&language=fr`
      )
      .then((res) => {
       
        setFilm(res.data.results);
        console.log("lol" + JSON.stringify(res.data.results));
      })
      .catch((e) => console.log(e));
  }, []);
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
                        : "https://image.tmdb.org/t/p/w500/" +
                          videos.poster_path
                    }
                    alt="..."
                    style={{ height: "390px", width: "400px",left:"2%"}}
                  /><br/><h5>Langue:{videos.original_language } </h5>
                            </Grid.Column> 
    <Grid.Column mobile={8} tablet={8} computer={8}>  
    <H1>{videos.title}</H1>(réalisé en {videos.release_date})
    <Item>
    <Item.Extra>
    <Icon color='green' name='check' />{videos.vote_count} Votes
        </Item.Extra>
        </Item><br /> <br />
    <H1>Détail</H1>{videos.overview})<br/>      <br /> <br />
    <Modal
      trigger={<Button
        inverted color='red'
        content="ANNONCE"
        icon={<Icon name='youtube' /> }
        labelPosition="left"

      />}
      header='Annonce du Film'
      content= {<Youtube videosId={film.key} autoplay/>}
      actions={[ { key: 'done', content: 'Retour', negative: true }]}
    />




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
