import React from 'react';
import { Accordion, Container, Tabs, Tab, Row, Col, Image } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { getVideos } from '../../store/userSlice';
import ContentWrapper from '../../layout/ContentWrapper';
import DrinkInfo from '../../components/DrinkInfo';
import DrinkRecipe from '../../components/DrinkRecipe';
import DrinkNotes from '../../components/DrinkNotes';
import DeleteDrinkButton from '../../components/DeleteDrinkButton';
import Youtube from '../../components/Youtube';

const Collection: React.FC = () => {
  const dispatch = useAppDispatch();
  const drinks = useAppSelector((state) => state.user.drinks);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    const parent = event.currentTarget.parentElement as HTMLButtonElement;
    const isValidParent = parent.classList.contains('accordion-header');

    if (!isValidParent) return;

    const drinkId = parent.getAttribute('data-id') as string;
    const youtubeIds = drinks.filter((drink) => drink._id === drinkId)[0].youtubeIds;

    // If video IDs found in saved drink, do nothing
    if (youtubeIds && youtubeIds.length > 0) return;

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
                    <Accordion.Header
                      data-id={drink._id}
                      onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)}
                    >
                      {drink.strDrink}
                    </Accordion.Header>
                    <Accordion.Body>
                      <Tabs defaultActiveKey="info">
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
                            <Col md={6}>
                              <ContentWrapper>
                                <Youtube ids={drink.youtubeIds} />
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
