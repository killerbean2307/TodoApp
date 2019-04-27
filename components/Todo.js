import React, { Component } from "react";
import {
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
  View
} from "react-native";
import { ListItem, Text } from "react-native-elements";
import { toggleTodoComplete, sortTodoList } from "../actions";
import { connect } from "react-redux";
import moment from "moment";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromNow: moment.unix(this.props.todo.time).fromNow()
    };
  }

  componentDidMount() {
    // this.tick = setInterval(() => {
    //   this.setState({ fromNow: moment.unix(this.props.todo.time).fromNow() });
    // }, 1000);
  }

  componentWillUnmount() {
    // clearInterval(this.tick);
  }

  _onTodoPress = () => {
    console.log("press");
    const { id } = this.props.todo;
    this.props.toggleTodoComplete(id);
    // this.props.sortTodoList();
  };

  render() {
    console.log("todo render", this.state);
    return (
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
          // hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);
