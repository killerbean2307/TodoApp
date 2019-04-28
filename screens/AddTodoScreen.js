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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { connect } from "react-redux";
import { addTodo } from "../actions";
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableNativeFeedback
} from "react-native-gesture-handler";

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
      this.titleInput.shake();
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
            ref={input => {
              this.titleInput = input;
            }}
            placeholder="Enter todo title"
            label="Title"
            labelStyle={{ color: "black" }}
            value={this.state.title}
            errorMessage={this.state.titleError}
            onChangeText={this.handleTitleInputTextChange}
            leftIcon={<FontAwesome5 name={"tags"} size={15} />}
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
            containerStyle={styles.containerOfInput}
            placeholderTextColor="gray"
          />
          <TouchableNativeFeedback onPress={this.showDateTimePicker}>
            <View pointerEvents="none">
              <Input
                editable={false}
                value={moment(this.state.datetime, "X").format(
                  "HH:mm DD-MM-YYYY"
                )}
                errorMessage={this.state.datetimeError}
                placeholder="Enter todo time"
                label="Time"
                labelStyle={{ color: "black" }}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
                containerStyle={styles.containerOfInput}
                leftIcon={
                  <FontAwesome5 name={"clock"} type="regular" size={15} />
                }
                rightIcon={
                  <FontAwesome
                    name="calendar"
                    size={25}
                    color="mediumseagreen"
                    onPress={this.showDateTimePicker}
                  />
                }
                rightIconContainerStyle={{
                  marginRight: 10
                }}
              />
            </View>
          </TouchableNativeFeedback>
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
          buttonStyle={styles.addButton}
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
    color: "black",
    paddingLeft: 10
  },
  inputContainer: {
    borderRadius: 30,
    backgroundColor: "#EFF7FD",
    elevation: 3
  },
  containerOfInput: {
    marginVertical: 10,
    marginBottom: 10
  },
  addButton: {
    borderRadius: 0
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
