import { StyleSheet } from "react-native";

const styles: any = StyleSheet.create({
	container: {
	},
	greetingCard: {
		flex: 0,
		borderWidth: 0,
		marginTop: 0,
		marginBottom: 0,
		marginLeft: 0,
		marginRight: 0
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
		flexDirection: "column",
		flex: 1,
		color: "#7C8B9E",
		fontWeight: "bold"
	},
	greetingSubtitle: {
		color: "#7C8B9E",
		fontWeight: "bold"
	},
	metricCard: {
		borderWidth:0,
		marginTop: 0,
		marginBottom: 0,
		marginLeft: 0,
		marginRight: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderTopWidth: 0,
		borderBottomWidth: 0,
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
		textAlign:'right',
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
		color: "#7C8B9E"
	}
});
export default styles;
