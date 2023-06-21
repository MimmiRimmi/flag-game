import {
  StyleSheet,
  Text,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import FlagBackground from "../assets/flag-background.gif";

export default function Home({ navigation }) {
  return (
    <ImageBackground style={styles.container} source={FlagBackground}>
      <Text style={styles.titleText}>The Most Incredible Flag Game.</Text>
      <TouchableHighlight
        style={styles.playButton}
        onPress={() => navigation.navigate("GameStart")}
      >
        <Text style={styles.playText}>PLAY</Text>
      </TouchableHighlight>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backgroundImage: {
    resizeMode: "cover",
  },
  titleText: {
    marginTop: 102,
    paddingRight: 70,
    textAlign: "left",
    fontSize: 48,
    fontWeight: "bold",
    lineHeight: 70,
  },
  playButton: {
    position: "absolute",
    bottom: 71,
    width: "90%",
    height: 71,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  playText: {
    fontSize: 24,
    color: "#fff",
  },
});
