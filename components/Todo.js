import React, { Component } from "react";
import {
  TouchableNativeFeedback,
  StyleSheet,
  View,
  BackHandler,
  Platform,
  Dimensions
} from "react-native";
import { ListItem, Text, Button } from "react-native-elements";
import Fontawesome5 from "react-native-vector-icons/FontAwesome5";
import { toggleTodoComplete, sortTodoList, deleteTodo } from "../actions";
import { connect } from "react-redux";
import moment from "moment";
import Modal from "react-native-modal";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromNow: moment.unix(this.props.todo.time).fromNow(),
      isMenuOpen: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    if (this.state.isMenuOpen) {
      this._hideMenu();
      return true;
    } else {
      console.log("back press");
      return;
    }
  };

  _openMenu = () => {
    this.setState({ isMenuOpen: true });
  };

  _hideMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  _onTodoPress = () => {
    const { id } = this.props.todo;
    this.props.toggleTodoComplete(id);
    // this.props.sortTodoList();
  };

  render() {
    console.log("todo render");
    return (
      <View
        style={{
          marginTop: this.props.index == 0 ? 15 : 0,
          marginBottom: this.props.index == this.props.dataLength - 1 ? 15 : 0
        }}
      >
        <View
          style={[
            styles.todoItem,
            {
              opacity: this.props.todo.isCompleted ? 0.5 : 1
            }
          ]}
        >
          <View style={[styles.left, styles.green]} />
          <TouchableNativeFeedback
            onPress={this._onTodoPress}
            background={TouchableNativeFeedback.Ripple("#2899CB", false)}
            useForeground={true}
            onLongPress={() => {
              console.log("ac");
              this._openMenu();
            }}
          >
            <ListItem
              key={this.props.todo.id}
              title={this.props.todo.title}
              subtitle={this.state.fromNow}
              titleStyle={[
                styles.todoText,
                this.props.todo.isCompleted ? styles.completedText : ""
              ]}
              checkBox={{
                checked: this.props.todo.isCompleted,
                checkedColor: "green",
                uncheckedColor: "red",
                onPress: this._onTodoPress
              }}
            />
          </TouchableNativeFeedback>
        </View>
        <Modal
          animationIn="tada"
          animationOut="zoomOut"
          isVisible={this.state.isMenuOpen}
          useNativeDriver
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
          hasBackdrop={true}
          hideModalContentWhileAnimating
          onBackdropPress={() => {
            this._hideMenu();
          }}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              justifyContent: "space-evenly",
              alignItems: "center",
              backgroundColor: "white",
              height: "20%",
              width: "70%",
              borderRadius: 10
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              Delete '{this.props.todo.title}'?
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center"
              }}
            >
              <Button
                title="Delete Todo"
                onPress={() => {
                  this.props.deleteTodo(this.props.todo.id);
                }}
                raised
                icon={
                  <Fontawesome5
                    name={"trash"}
                    type="regular"
                    color="white"
                    style={{ marginRight: 5 }}
                  />
                }
                containerStyle={styles.button}
              />
              <Button
                title="Cancel"
                onPress={this._hideMenu}
                type="outline"
                containerStyle={styles.button}
                raised
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  todoItem: {
    borderWidth: 0.5,
    borderColor: "lightgray",
    width: "90%",
    alignSelf: "center",
    marginVertical: 5,
    elevation: 3
  },
  todoText: {
    fontWeight: "500"
  },
  completedText: {
    textDecorationLine: "line-through"
  },
  left: {
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    zIndex: 1,
    width: 5
  },
  button: {
    marginHorizontal: 5
  },
  green: {
    backgroundColor: "green"
  },
  red: {
    backgroundColor: "red"
  },
  primary: {}
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    toggleTodoComplete: id => {
      dispatch(toggleTodoComplete(id));
    },
    sortTodoList: () => {
      dispatch(sortTodoList());
    },
    deleteTodo: id => {
      dispatch(deleteTodo(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);
