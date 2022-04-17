import React from 'react';
import { Accordion, Container, Tabs, Tab, Row, Col, Image } from 'react-bootstrap';

import { useAppSelector } from '../../hooks';
import ContentWrapper from '../../layout/ContentWrapper';
import DrinkInfo from '../../components/DrinkInfo';
import DrinkRecipe from '../../components/DrinkRecipe';
import DrinkNotes from '../../components/DrinkNotes';

const Collection: React.FC = () => {
  const drinks = useAppSelector((state) => state.user.drinks);

  return (
    <Container>
      <ContentWrapper>
        {drinks.length > 0 ? (
          <Accordion defaultActiveKey={drinks[0]._id} alwaysOpen>
            {drinks.map((drink, index) =>
              drink && index === undefined ? null : (
                <Accordion.Item eventKey={drink._id} key={drink._id}>
                  <Accordion.Header>{drink.strDrink}</Accordion.Header>
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
  );
};

export default Collection;
