import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Image,
  Card,
  Pagination,
  Header,
  Input,
  Icon,
} from "semantic-ui-react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Example from "./Background";
import ButtonExampleInverted from "./Button";
import logo from "./allo.png";
import logos from "./video.mp4";
import Footer from "./footer";
import LoaderExampleText from "./Telechargement";

const NavBar = styled.div`
  position: fixed;
  width: 100%;
  z-index: 5;
  top: 2%;
  // background: #CACACA;
`;
const Conteneur = styled.p`
  width: 75%;
  margin-left: 12.5%;
  padding-top: 30%;
  text-align: center;
  background: black;
`;
const Con = styled.h2`
  color: #fcc707;
  font-size: 15px;
  text-align: center;
`;
const P = styled.p`
  padding-top: 10%;
  text-align: center;
  color: white;
`;

function PagePopulaire() {
  const [videos, setVideos] = useState([]);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(1);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=74dc0d8675d9c35ed25ec9e90a2cc597&language=en-US&page=${pages}`
      )
      .then((res) => {
        setData(res.data);
        setVideos(res.data.results);
        setLoad(true);
      })
      .catch((e) => console.log(e));
  }, [pages]);
  console.log(data);

  const recherche = (search) => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=74dc0d8675d9c35ed25ec9e90a2cc597&query=${search}`
      )
      .then((res) => {
        setData(res.data);
        setVideos(res.data.results);
        setLoad(true);
        console.log(videos);
      })
      .catch((e) => console.log(e));
  };
  if (load == false) {
    return <LoaderExampleText />;
  }
  return (
    <>
      <NavBar>
        <Header as="h2" floated="right"></Header>
        <Header as="h2" floated="left">
          <Image
            src={logo}
            style={{ left: "13%", width: "25%", marginTop: "0%" }}
          />
        </Header>

        <Example />

        <Grid.Column key={16}>
          <P>
            <ButtonExampleInverted />
            <br />
            <Input
              icon={<Icon name="search" inverted circular link />}
              type="text"
              placeholder="Recherce"
              onChange={(e) => recherche(e.target.value)}
            />

            <h1>
              <b>Découvrez des milliers de Films gratuites.</b>
            </h1>
          </P>
        </Grid.Column>
      </NavBar>

      <Conteneur>
        <Grid>
          {videos.map((e) => {
            return (
              <>
                <Grid.Column mobile={8} tablet={4} computer={4}>
                  {load === false ? (
                    <LoaderExampleText />
                  ) : (
                    <div style={{ height: "350px", backgroundColor: "black" }}>
                      <Link to={"/detail/" + e.id}>
                        <Image
                          src={
                            e.poster_path === null
                              ? "https://qph.fs.quoracdn.net/main-thumb-221356592-200-zyhrpkhlegkmkbjildezexzodkngkjec.jpeg"
                              : "https://image.tmdb.org/t/p/w500/" +
                                e.poster_path
                          }
                          alt="..."
                          style={{ height: "250px", width: "250px" }}
                        />
                      </Link>
                      <Card.Content>
                        <Con>
                          <Card.Header>{e.title}</Card.Header>
                        </Con>
                        <Card.Meta
                          style={{ textAlign: "center", color: "white" }}
                        >
                          <span>
                            <Icon color="green" name="check" />{" "}
                            {e.popularity == "" ? "null" : e.popularity} votes
                          </span>
                        </Card.Meta>
                      </Card.Content>
                    </div>
                  )}
                </Grid.Column>
              </>
            );
          })}
        </Grid>
        <br />
        <Pagination
          boundaryRange={0}
          defaultActivePage={1}
          activePage={pages}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          totalPages={data.total_pages}
          onPageChange={(e, { activePage }) => {
            setPages(activePage);
          }}
          style={{ textAlign: "center" }}
        />
      </Conteneur>

      <Footer />
    </>
  );
}

export default PagePopulaire;
