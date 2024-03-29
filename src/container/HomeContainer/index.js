// @flow
import * as React from "react";
import { connect } from "react-redux";
import Home from "../../stories/screens/Home";
import datas from "./data";
import { fetchList } from "./actions";
import { endPoint } from "../../App.js";

export interface Props {
	navigation: any,
	data: Object,
}
export interface State {}

class HomeContainer extends React.Component<Props, State> {

	constructor(props){
		super(props);
		this.state = {
			metrics:[]
		}
		this.refreshInterval = setInterval(this.fetchData, 2000);
	}

	fetchData = () => {
		this.fetchMetrics("username", "device2");
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchMetrics = (username, deviceId) => {
		const url = endPoint + 'user/' + username + '/currentmetric/' + deviceId;
		console.log(url);
		fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      this.setState({
				metrics: responseJson
			});
    })
    .catch(error => {
      console.error(error);
    });
	}

	render() {
		return <Home navigation={this.props.navigation} metrics={this.state.metrics} />;
	}
}

const mapStateToProps = state => ({
	data: state.homeReducer.list,
	isLoading: state.homeReducer.isLoading,
});
export default connect(mapStateToProps)(HomeContainer);
