import { StyleSheet } from "react-native";

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#f8f8f9",
	},
	contentContainerStyle:{
		backgroundColor: "#f8f8f9",
		padding: 20
	},
	greetingCard: {
		flex: 0,
		borderWidth: 0,
		marginTop: 0,
		marginBottom: 0,
		marginLeft: 0,
		marginRight: 0,
		borderWidth: 1,
	 	borderRadius: 2,
	 	borderColor: '#FFF',
	 	borderBottomWidth: 0,
	 	shadowColor: '#000',
	 	shadowOffset: { width: 0, height: 2 },
	 	shadowOpacity: 0.2,
	 	shadowRadius: 2,
	 	elevation: 1,
	 	marginLeft: 5,
	 	marginRight: 5,
	 	marginTop: 10,
		backgroundColor: "red"
	},
	greetingCardItem: {
		height: 100,
		alignItems: "flex-end",
		flexDirection: "row"
	},
	greetingCardBody: {
		height: 50,
		flex: 0
	},
	greetingTitle: {
		flexDirection: "row",
		flex: 0,
		color: "#7C8B9E",
		fontWeight: "bold",
		padding: 20,
		paddingBottom: 10
	},
	greetingSubtitle: {
		color: "#7C8B9E",
		fontWeight: "bold",
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 0
	},
	metricCard: {
		backgroundColor:"#fff",
		borderWidth: 1,
	 	borderRadius: 2,
	 	borderColor: '#FFF',
	 	borderBottomWidth: 0,
	 	shadowColor: '#000',
	 	shadowOffset: { width: 0, height: 2 },
	 	shadowOpacity: 0.2,
	 	shadowRadius: 2,
	 	elevation: 1,
	 	marginLeft: 5,
	 	marginRight: 5,
	 	marginTop: 10,
		flexDirection: "column",
		alignItems: "center"
	},
	metricCardTitle: {
		flex: 1,
		alignSelf: "stretch",
		alignItems: "center",
		flexDirection: "row",
	},
	metricValue: {
		flex: 1,
		textAlign:'center',
		color: "#3C5073",
		fontSize: 30,
		fontWeight: "400"
	},
	metricUnit: {
		flex: 1,
		textAlign:'left',
		paddingLeft: 10,
		fontWeight: "bold",
		color: "#7C8B9E",
		fontSize: 20
	},
	metricNameText: {
		color: "#7C8B9E",
		flex: 1
	}
});
export default styles;
