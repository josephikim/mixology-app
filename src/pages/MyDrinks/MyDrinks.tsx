import React from 'react';
import { Row, Col, Collapse, Tabs, Image } from 'antd';

import { useAppSelector } from '../../hooks';

import ContentWrapper from '../../layout/ContentWrapper';
import DrinkRecipe from '../../components/DrinkRecipe';
import DrinkTags from '../../components/DrinkTags';
import DrinkNotes from '../../components/DrinkNotes';

import './MyDrinks.css';

const { Panel } = Collapse;
const { TabPane } = Tabs;

const MyDrinks: React.FC = () => {
  const drinks = useAppSelector((state) => state.user.drinks);

  return (
    <ContentWrapper>
      {drinks.length > 0 ? (
        drinks.map((drink, index) =>
          drink && index === undefined ? (
            <p>Data missing!</p>
          ) : (
            <Collapse className="MyDrinks" defaultActiveKey={drinks[0]._id} key={drink._id}>
              <Panel header={drink.strDrink} key={drink._id}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Info" key="1">
                    <Row className="infoWrapper">
                      <Col span={12}>
                        <Row>
                          <Col span={8}>
                            <strong>Name:</strong>
                          </Col>
                          <Col span={16}>{drink.strDrink}</Col>
                        </Row>

                        <Row>
                          <Col span={8}>
                            <strong>Category:</strong>
                          </Col>
                          <Col span={16}>{drink.strAlcoholic}</Col>
                        </Row>

                        <Row>
                          <Col span={8}>
                            <strong>Glass:</strong>
                          </Col>
                          <Col span={16}>{drink.strGlass}</Col>
                        </Row>

                        <Row>
                          <Col span={8}>
                            <strong>Tags:</strong>
                          </Col>
                          <Col span={16}>
                            <DrinkTags tags={drink.strTags as string[]} />
                          </Col>
                        </Row>
                      </Col>
                      <Col span={12}>
                        <Image
                          width={250}
                          height={250}
                          src={drink.strDrinkThumb}
                          fallback="../../assets/missingimage.png"
                        />
                      </Col>
                    </Row>
                  </TabPane>

                  <TabPane tab="Recipe" key="2">
                    <Row>
                      <Col span={12}>
                        <DrinkRecipe data={drink} />
                      </Col>
                      <Col span={12}>
                        <Image
                          width={250}
                          height={250}
                          src={drink.strDrinkThumb}
                          fallback="../../assets/missingimage.png"
                        />
                      </Col>
                    </Row>
                  </TabPane>

                  <TabPane tab="Notes" key="3">
                    <Row>
                      <Col span={12}>
                        <DrinkNotes drinkId={drink._id} />
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
              </Panel>
            </Collapse>
          )
        )
      ) : (
        <div>Data Loading...</div>
      )}
    </ContentWrapper>
  );
};

export default MyDrinks;
