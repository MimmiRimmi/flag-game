import {
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { flags } from "../assets/constants/flags";
import Result from "./Result";
import { useNavigation } from "@react-navigation/native";

const MAX_ROUNDS = 30;

export default function NewGame({ route }) {
  const { difficulty } = route.params;
  const [countryIndices, setCountryIndices] = useState([]);
  const [countryIndex, setCountryIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [round, setRound] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    updateCountry();
  }, []);

  useEffect(() => {
    updateWrongAnswer();
    updateAnswers();
  }, [countryIndex]);

  useEffect(() => {
    if (round > MAX_ROUNDS) {
      setShowResult(true);
    }
  }, [round]);

  const randomNumber = () => {
    const max = flags.length;
    return Math.floor(Math.random() * max);
  };

  const handleAnswerSelection = (selectedAnswer) => {
    if (selectedAnswer === flags[countryIndex].name) {
      setIsCorrect(true);
      setScore((prevScore) => prevScore + 1);
    } else {
      setIsCorrect(false);
    }

    setSelectedAnswer(selectedAnswer);

    setTimeout(async () => {
      await updateCountry();
      updateWrongAnswer();
      setSelectedAnswer(null);
      setRound((prevRound) => prevRound + 1);
    }, 600);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const updateCountry = async () => {
    const availableIndices = flags
      .map((_, index) => index)
      .filter((index) => !countryIndices.includes(index));
    if (availableIndices.length === 0) {
      setCountryIndices([]);
    }
    const randomIndex =
      availableIndices[Math.floor(Math.random() * availableIndices.length)];
    await setCountryIndices((prevIndices) => [...prevIndices, randomIndex]);
    await setCountryIndex(randomIndex);
    return;
  };

  const updateWrongAnswer = () => {
    const answers = [];
    for (let i = 0; i < difficulty; i++) {
      const availableAnswers = flags
        .map((flag) => flag.name)
        .filter(
          (name) => name !== flags[countryIndex].name && !answers.includes(name)
        );
      const answer = availableAnswers[randomNumber() % availableAnswers.length];
      answers.push(answer);
    }
    setWrongAnswers(answers);
  };

  const updateAnswers = () => {
    const shuffledAnswers = shuffleArray([
      ...wrongAnswers,
      flags[countryIndex].name,
    ]);
    setAnswers(shuffledAnswers);
  };

  const renderAnswers = () => {
    if (difficulty < 3) {
      return answers.map((answer, index) => (
        <TouchableHighlight
          key={`${countryIndex}_${index}`}
          style={[
            styles.playButton,
            selectedAnswer === answer && isCorrect && styles.correctAnswer,
            selectedAnswer === answer && !isCorrect && styles.wrongAnswer,
          ]}
          onPress={() => handleAnswerSelection(answer)}
        >
          <Text style={styles.playText}>{answer}</Text>
        </TouchableHighlight>
      ));
    } else {
      return (
        <View style={styles.answerContainer}>
          {answers.map((answer, index) => (
            <View
              style={styles.smallButtonContainer}
              key={`${countryIndex}_${index}`}
            >
              <TouchableHighlight
                style={[
                  styles.smallButton,
                  selectedAnswer === answer &&
                    isCorrect &&
                    styles.correctAnswer,
                  selectedAnswer === answer && !isCorrect && styles.wrongAnswer,
                ]}
                onPress={() => handleAnswerSelection(answer)}
              >
                <Text style={styles.smallText}>{answer}</Text>
              </TouchableHighlight>
            </View>
          ))}
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {showResult ? (
        <Result score={score} navigation={navigation} />
      ) : (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{round} / 30</Text>
            <Text style={styles.text}>Score: {score}</Text>
          </View>
          <Image
            source={flags[countryIndex].image}
            style={{ width: 350, height: 250, resizeMode: "contain" }}
          />
          {renderAnswers()}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#CBD0D6",
  },
  textContainer: {
    paddingTop: 15,
    paddingBottom: 30,
  },
  answerContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 20,
  },
  text: {
    fontSize: 20,
    paddingBottom: 10,
    alignItems: "center",
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
  smallButtonContainer: {
    flexBasis: "50%",
    height: 105,
    padding: 10,
  },
  smallButton: {
    flex: 1,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#000",
  },
  smallText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  correctAnswer: {
    backgroundColor: "green",
  },
  wrongAnswer: {
    backgroundColor: "#B30606",
  },
});
