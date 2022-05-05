import React, { useEffect } from 'react';
import { Accordion, Container, Tabs, Tab, Row, Col, Image } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store';
import { getVideos } from '../../store/userSlice';
import ContentWrapper from '../../layout/ContentWrapper';
import DrinkInfo from '../../components/DrinkInfo';
import DrinkRecipe from '../../components/DrinkRecipe';
import DrinkNotes from '../../components/DrinkNotes';
import DeleteDrinkButton from '../../components/DeleteDrinkButton';
import Youtube from '../../components/Youtube';

const Collection: React.FC = () => {
  const dispatch = useAppDispatch();

  const errorType = useAppSelector((state) => state.user.errorType);

  useEffect(() => {
    if (errorType === 'refreshToken' || errorType === 'accessToken' || errorType === 'role') {
      dispatch(logoutAction());
    }
  }, [errorType]);

  const drinks = useAppSelector((state) => state.user.drinks);

  const handleSelectTab = (key: string, drinkId: string): void => {
    if (key !== 'videos') return;

    const videos = drinks.filter((drink) => drink._id === drinkId)[0].youtubeVideos;

    // If videos found in saved drink, do nothing
    if (videos && videos.length > 0) return;

    dispatch(getVideos(drinkId));
  };

  return (
    <div className="Collection">
      <Container>
        <ContentWrapper>
          {drinks.length > 0 ? (
            <Accordion defaultActiveKey={drinks[0]._id} alwaysOpen>
              {drinks.map((drink, index) =>
                drink && index === undefined ? null : (
                  <Accordion.Item eventKey={drink._id} key={drink._id}>
                    <Accordion.Header>{drink.strDrink}</Accordion.Header>
                    <Accordion.Body>
                      <Tabs
                        defaultActiveKey="info"
                        onSelect={(key): void => handleSelectTab(key as string, drink._id as string)}
                      >
                        <Tab eventKey="info" title="Info">
                          <Row>
                            <Col md={6}>
                              <ContentWrapper>
                                <DrinkInfo data={drink} />
                              </ContentWrapper>
                            </Col>
                            <Col md={6}>
                              <ContentWrapper>
                                <Image width={250} height={250} src={drink.strDrinkThumb} fluid />
                              </ContentWrapper>
                            </Col>
                          </Row>
                        </Tab>
                        <Tab eventKey="recipe" title="Recipe">
                          <Row>
                            <Col md={6}>
                              <ContentWrapper>
                                <DrinkRecipe data={drink} />
                              </ContentWrapper>
                            </Col>
                            <Col md={6}>
                              <ContentWrapper>
                                <Image width={250} height={250} src={drink.strDrinkThumb} fluid />
                              </ContentWrapper>
                            </Col>
                          </Row>
                        </Tab>
                        <Tab eventKey="notes" title="Notes">
                          <Row>
                            <Col md={8}>
                              <ContentWrapper>
                                <DrinkNotes drinkId={drink._id} />
                              </ContentWrapper>
                            </Col>
                          </Row>
                        </Tab>
                        <Tab eventKey="videos" title="Videos">
                          <Row>
                            <Col>
                              <ContentWrapper>
                                <Youtube videos={drink.youtubeVideos} />
                              </ContentWrapper>
                            </Col>
                          </Row>
                        </Tab>
                        <Tab eventKey="options" title="Options">
                          <Row>
                            <Col md={6}>
                              <ContentWrapper>
                                <DeleteDrinkButton drinkId={drink._id} drinkName={drink.strDrink as string} />
                              </ContentWrapper>
                            </Col>
                          </Row>
                        </Tab>
                      </Tabs>
                    </Accordion.Body>
                  </Accordion.Item>
                )
              )}
            </Accordion>
          ) : (
            <span>
              Add drinks to your collection from the <a href="/search">Search</a> page.
            </span>
          )}
        </ContentWrapper>
      </Container>
    </div>
  );
};

export default Collection;
