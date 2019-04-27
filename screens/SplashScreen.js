import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

const deviveWidth = Dimensions.get("window").width;

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  _wait = ms => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  };

  bootstrapAsync = async () => {
    await this._wait(500);
    this.props.navigation.navigate("Home");
  };

  render() {
    return (
      <View style={styles.container}>
        <LottieView
          source={require("../lotties/142-loading-animation.json")}
          autoPlay
          loop
          style={{ width: deviveWidth, height: deviveWidth }}
          resizeMode="cover"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
