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
  margin-top: 7%;
  margin-left: 5%;
  margin-right: 5%;
  color: white;
  font-family: Lucida Console;
  color: white;
  // height: 420px;
`;
const H1 = styled.h1`
  color: white;
`;


const Detail = () => {
  let { id } = useParams();
  const params = { id };
  console.log(params.id);

  const [videos, setVideos] = useState([]);
  const [film, setFilm] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=74dc0d8675d9c35ed25ec9e90a2cc597&language=fr`
      )
      .then((res) => {
        setVideos(res.data);
        setLoad(true);
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
              style={{ height: "390px", width: "400px", left: "2%" }}
            />
            <br />
            <h5>Langue:{videos.original_language} </h5>
          </Grid.Column>
          <Grid.Column mobile={8} tablet={8} computer={8}>
            <H1>{videos.title}</H1>(réalisé en {videos.release_date=== ""? "00/00/0000":videos.release_date})
            <Item>
              <Item.Extra>
                <Icon color="green" name="check" />
                {videos.vote_count===""?"0":videos.vote_count} Votes
              </Item.Extra>
            </Item>
            <br /> <br />
            <H1>Détail</H1>
            {videos.overview===""?"Rien à sifnaler":videos.overview}<br /> <br /> <br />
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
              content={film.map((e)=>{return (e=== ""?"https://www.youtube.com/watch?v=CxQdjwkjMuA":<Youtube videosId={e.key} autoplay />)}
                )}
              actions={[{ key: "done", content: "Retour", negative: true }]}
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
