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

  getChartColorByName(metricName){
    if(metricName == 'Heart Rate'){
      return "#ce406e";
    }
    if(metricName == 'Temperature'){
      return "#7c562a";
    } else {
      return "#497b99";
    }
  }

  render() {
    const items = this.props.metrics;

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
         <Text style={styles.greetingTitle}>
            Welcome Back, Mukul
         </Text>
         <Text style={styles.greetingSubtitle}>
          Things look alright
        </Text>
          <List dataArray={items} contentContainerStyle={styles.contentContainerStyle}
                      renderRow={(item) => {
                        const chartColor = this.getChartColorByName(item.metricsName)
                        return <Card style={styles.metricCard}>
                          <Left style={styles.metricCardTitle}>
                            <Text style={styles.metricValue}>{item.metricsValue} {item.metricsUnit}</Text>
                          </Left>
                          <Body style={styles.metricName}>
                            <Text style={styles.metricNameText}>{item.metricsName}</Text>
                          </Body>
                          <Right style={styles.metricChart}>
                            <VictoryLine
                              style={{
                                data: {
                                  stroke: chartColor
                                }
                              }}
                              width={300}
                              height={150}
                              interpolation="natural"
                              data={
                                item.historicalDataPoints.map(
                                  (point, index) => {
                                    return {
                                      x: new Date(point.timeStamp),
                                      y: point.value
                                    }
                                  }
                                )
                              }
                            />
                          </Right>
                        </Card>
                      }
              }>
          </List>

        </Content>
      </Container>
    );
  }
}

export default Home;
