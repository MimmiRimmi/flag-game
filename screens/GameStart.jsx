import {
  StyleSheet,
  Text,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import FlagBackground from "../assets/flag-background.gif";

const EASY = 1;
const MEDIUM = 3;
const HARD = 5;

export default function GameStart({ navigation }) {
  return (
    <ImageBackground style={styles.container} source={FlagBackground}>
      <TouchableHighlight
        style={styles.playButton}
        onPress={() => navigation.navigate("NewGame", { difficulty: EASY })}
      >
        <Text style={styles.playText}>EASY</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.playButton}
        onPress={() => navigation.navigate("NewGame", { difficulty: MEDIUM })}
      >
        <Text style={styles.playText}>MEDIUM</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.playButton}
        onPress={() => navigation.navigate("NewGame", { difficulty: HARD })}
      >
        <Text style={styles.playText}>HARD</Text>
      </TouchableHighlight>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  backgroundImage: {
    resizeMode: "cover",
  },
  playButton: {
    width: "90%",
    height: 71,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  playText: {
    fontSize: 24,
    color: "#fff",
  },
});
