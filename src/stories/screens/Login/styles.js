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
		height:200,
		marginTop:50,
		backgroundColor: 'white',
		padding: 20,
		borderBottomColor: 'white'
	},
	content: {
		height: 300,
	},
	headerBody: {
		backgroundColor:'white',
		flex: 1.25
	},
	titleWrap: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		padding: 20,
		paddingBottom: 0,
		flex: 0.6
	},
	logo: {
		height: 100,
		width: 100,
		alignSelf: 'center'
	},
	title: {
		flexDirection: 'row',
		alignSelf: 'center',
		fontSize: 40,
		color: '#3C5073',
		padding: 0,
		margin: 0
	},
	subtitleRow: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		height: 25,
		flexGrow: 0.35,
		alignItems: 'center',
		marginLeft:20,
		marginRight: 20,
	},
	subtitle: {
		color: '#3C5073',
		fontWeight: 'bold',
		fontSize: 25,
	},
	subtitle2: {
		color: '#D5DAE2',
		fontWeight: 'bold',
		fontSize: 25,
	},
	subtitleExtra: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		flexGrow: 0.35,
		alignItems: 'center',
		marginLeft:20,
		marginRight: 20,
	},
	content: {
		backgroundColor: 'white',
		flexDirection:'column',
		flex: 0,
		overflow: 'hidden'
	},
	loginbtn: {
		backgroundColor: 'white',
		height: 40,
		alignItems: 'center',
		flexDirection: 'row'
	},
	loginbtnText: {
		color: '#A1D6EC',
		fontWeight: "bold",
		fontSize: 25,
		textAlign: 'center',
		lineHeight: 0
	},
	signupbtnWrap: {
		backgroundColor: 'white',
		alignSelf:'flex-end',
		height: 50,
		flexGrow: 0
	},
	signupbtn: {
		backgroundColor: 'white',
		alignItems: 'center',
		flexDirection:'column',
		flexGrow:1,
		alignSelf: 'flex-end'
	},
	signupbtnText: {
		color: '#3C5073',
		fontWeight: '300',
		textAlign: 'center',
	}
});
export default styles;
