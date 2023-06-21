import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

export default function Result({ score, navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Good Job!</Text>
      <View>
        <Text style={styles.textResult}>RESULTS: </Text>
        <Text style={styles.textScore}>{score}/30 </Text>
      </View>
      <View style={styles.playButtonContainer}>
        <TouchableHighlight
          style={styles.playButton}
          onPress={() => navigation.navigate("GameStart")}
        >
          <Text style={styles.playText}>PLAY AGAIN</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.playButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.playText}>MAIN MENU</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#B1D4D9",
    justifyContent: "space-between",
  },
  textResult: {
    fontSize: 20,
    fontWeight: "700",
  },
  textScore: {
    fontSize: 60,
    fontWeight: "700",
  },
  playButtonContainer: {
    marginBottom: 80,
  },
  playButton: {
    width: 350,
    height: 71,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  playText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#fff",
  },
  titleText: {
    marginTop: 102,
    paddingRight: 70,
    textAlign: "left",
    fontSize: 48,
    fontWeight: "bold",
    lineHeight: 70,
  },
});
