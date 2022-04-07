import React from 'react';
import { Row, Col, Collapse, Tabs, Input } from 'antd';

import { useAppSelector } from '../../hooks';
import ContentWrapper from '../../layout/ContentWrapper';
import DrinkRecipe from '../../components/DrinkRecipe';

const { Panel } = Collapse;
const { TabPane } = Tabs;
const { TextArea } = Input;

const handleChange = (event) => {
  event.preventDefault();
};

const MyDrinks: React.FC = () => {
  const drinks = useAppSelector((state) => state.user.drinks);

  return (
    <ContentWrapper>
      {drinks.length > 0 ? (
        drinks.map((drink, index) =>
          drink && index === undefined ? (
            <p>Data missing!</p>
          ) : (
            <Collapse defaultActiveKey={drinks[0]._id} onChange={(event) => handleChange(event)}>
              <Panel header={drink.strDrink} key={drink._id}>
                <Tabs defaultActiveKey="1" onChange={(event) => handleChange(event)}>
                  <TabPane tab="Info" key="1">
                    <Row>
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
                          <Col span={16}>{drink.strTags}</Col>
                        </Row>
                      </Col>

                      <Col span={12}>
                        <ContentWrapper>
                          <img src={drink.strDrinkThumb} />
                        </ContentWrapper>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tab="Recipe" key="2">
                    <DrinkRecipe data={drink} />
                  </TabPane>
                  <TabPane tab="Notes" key="3">
                    <TextArea rows={6} placeholder="enter text" />
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
