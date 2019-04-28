import React, { Component } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Text, Button, Icon, Header } from "react-native-elements";
import TodoList from "../components/TodoList";

export default class Home extends Component {
  static navigationOptions = {
    title: "Todo List",
    headerStyle: { backgroundColor: "dodgerblue" },
    headerTitleStyle: { color: "white" }
  };

  _handleAddTodoPress = () => {
    this.props.navigation.navigate("AddTodo");
  };

  render() {
    return (
      <View style={styles.container}>
        <TodoList />
        <Icon
          containerStyle={styles.floatingButton}
          name="plus"
          type="feather"
          reverse
          color="tomato"
          onPress={this._handleAddTodoPress}
          raised
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  floatingButton: {
    position: "absolute",
    right: 10,
    bottom: 10
  }
});
