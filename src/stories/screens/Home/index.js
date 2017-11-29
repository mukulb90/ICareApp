import * as React from "react";
import {
  Container,
  Header,
  Title,
  Card,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  List,
  ListItem,
  CardItem
} from "native-base";

import {VictoryChart, VictoryLine} from 'victory-native';

import styles from "./styles";
export interface Props {
  navigation: any;
  list: any;
}
export interface State {}
class Home extends React.Component<Props, State> {
  render() {
    const items = [
        {
          metricName:"Temperature",
          metricUnit: "degree",
          value: 36.44,
          normalValue: 37,
          threshold: 5,
          historicalData:[{
            value: 12,
            timeStamp: new Date(),
          }, {
            value: 13,
            timeStamp: new Date()
          }]
        },
        {
          metricName:"Heart Rate",
          metricUnit: "bpm",
          value: 78,
          normalValue: 80,
          threshold: 3,
          historicalData: []
        },
        {
          metricName:"Heart Rate",
          metricUnit: "bpm",
          value: 78,
          normalValue: 80,
          threshold: 3,
          historicalData: []
        }
    ];

    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Button transparent>
              <Icon
                active
                name="menu"
                onPress={() => this.props.navigation.navigate("DrawerOpen")}
              />
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card style={styles.greetingCard}>
            <CardItem style={styles.greetingCardItem}>
              <Body style={styles.greetingCardBody}>
               <Text style={styles.greetingTitle}>
                  Welcome Back, Mukul
               </Text>
               <Text style={styles.greetingSubtitle}>
                Things look alright
               </Text>
             </Body>
            </CardItem>
          </Card>

          <List dataArray={items}
                      renderRow={(item) =>
                        <Card style={styles.metricCard}>
                          <Left style={styles.metricCardTitle}>
                            <Text style={styles.metricValue}>{item.value}</Text>
                            <Text style={styles.metricUnit}>{item.metricUnit}</Text>
                          </Left>
                          <Body style={styles.metricName}>
                            <Text style={styles.metricNameText}>{item.metricName}</Text>
                          </Body>
                          <Right style={styles.metricChart}>
                            <VictoryLine
                              style={{
                                data: { stroke: "#c43a31" }
                              }}
                              height={150}
                              interpolation="natural"
                              data={[
                                { x: 1, y: 2 },
                                { x: 2, y: 3 },
                                { x: 3, y: 5 },
                                { x: 4, y: 4 },
                                { x: 5, y: 7 }
                              ]}
                            />
                          </Right>
                        </Card>
                      }>
          </List>

        </Content>
      </Container>
    );
  }
}

export default Home;
