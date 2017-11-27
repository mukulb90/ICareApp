import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles: any = StyleSheet.create({
	container: {
		height: deviceHeight,
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		backgroundColor: 'white',
	},
	header:{
		backgroundColor: 'white',
		borderBottomColor: 'white',
		marginRight: 50,
	},
	headerText: {
		color: '#3C5073',
		fontWeight: 'bold'
	},
	backIcon: {
		width: 50,
		flex: 0
	},
	item: {
		marginLeft: 20,
		marginRight: 20
	},
	signupbtn: {
		backgroundColor: '#7C8B9E',
		alignItems: 'center',
		flexDirection:'column',
		alignSelf: 'stretch',
		margin: 20
	},
	signupbtnText: {
		color: 'white',
		fontWeight: '900',
		textAlign: 'center',
		textAlignVertical: 'center',
		flex: 1
	}
});
export default styles;
