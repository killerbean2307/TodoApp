import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableNativeFeedback
} from "react-native";
import { Button } from "react-native-elements";
import Todo from "./Todo";
import { sortTodoList } from "../actions";
import { connect } from "react-redux";
import moment from "moment";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  componentDidMount() {
    console.log(this.props.todo);
  }

  _onRefresh = async () => {
    console.log("refreshing");
    this.setState({ refreshing: true });
    this.setState({ refreshing: false });
    this.props.sortTodoList()
  };

  _renderItem = ({ item }) => <Todo todo={item} />;

  render() {
    console.log("flatlist render");
    return (
      <View>
        <FlatList
          data={this.props.todo.list}
          renderItem={this._renderItem}
          keyExtractor={item => item.id.toString()}
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
          extraData={this.state}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          removeClippedSubviews
          style={{
            marginVertical: 10
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    todo: state.todo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sortTodoList: () => {
      dispatch(sortTodoList());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
