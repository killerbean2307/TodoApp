import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";
import SplashScreen from "./screens/SplashScreen";
import AddTodoScreen from "./screens/AddTodoScreen";
import Home from "./screens/Home";

const HomeStack = createStackNavigator(
  {
    Home: Home,
    AddTodo: AddTodoScreen
  },
  {
    headerMode: "screen"
  }
);

const AppFlow = createSwitchNavigator({
  Splash: SplashScreen,
  Home: HomeStack
});

export default createAppContainer(AppFlow);
