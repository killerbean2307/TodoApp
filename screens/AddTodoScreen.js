import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard
} from "react-native";
import { Header, Input, Button } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import FontAwesome from "react-native-vector-icons/FontAwesome5";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { connect } from "react-redux";
import { addTodo } from "../actions";

class AddTodoScreen extends Component {
  static navigationOptions = {
    title: "Add todo",
    headerStyle: { backgroundColor: "dodgerblue" },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white"
  };

  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      title: "",
      titleError: "",
      datetime: moment().unix(),
      datetimeError: ""
    };
  }

  showDateTimePicker = () => {
    console.log("show dtp", this.state.isDateTimePickerVisible);
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    this.setState({
      datetime: moment(date).unix(),
      isDateTimePickerVisible: false
    });
  };

  handleTitleInputTextChange = text => {
    this.setState({ title: text });
  };

  handleAddTodo = () => {
    const { title, datetime } = this.state;
    if (!title) {
      this.setState({ titleError: "Please enter title" });
      return;
    }
    if (!moment(this.state.datetime).isValid()) {
      this.setState({ datetimeError: "Invalid time" });
      return;
    }

    Keyboard.dismiss();

    this.props.addTodo(title, datetime);

    this.props.navigation.goBack();
  };

  clearInput = () => {
    this.setState({ title: "", datetime: moment() });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Input
            placeholder="Enter todo title"
            label="Title"
            value={this.state.title}
            errorMessage={this.state.titleError}
            onChangeText={this.handleTitleInputTextChange}
            inputStyle={styles.input}
          />
          <TouchableOpacity onPress={this.showDateTimePicker}>
            <Input
              editable={false}
              value={moment(this.state.datetime, "X").format(
                "HH:mm DD-MM-YYYY"
              )}
              errorMessage={this.state.datetimeError}
              placeholder="Enter todo time"
              label="Time"
              inputStyle={styles.input}
              rightIcon={
                <FontAwesome
                  name="calendar"
                  size={25}
                  color="steelblue"
                  onPress={this.showDateTimePicker}
                />
              }
            />
          </TouchableOpacity>
        </View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode="datetime"
          datePickerModeAndroid="spinner"
          timePickerModeAndroid="spinner"
        />
        <Button
          title="Add todo"
          icon={{
            name: "check",
            type: "feather",
            color: "white"
          }}
          raised
          onPress={this.handleAddTodo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    color: "midnightblue"
  }
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: (title, time) => {
      dispatch(addTodo(title, time));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodoScreen);
