import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../components/Home';
import List from '../components/List';
import ApiResults from '../components/ApiResults';
import SecondAddNewTask from '../components/SecondAddNewTask';
import Tranche from '../components/Tranche';
import Intro from '../components/Intro';
import Xperimental from '../components/Xperimental';

const screens = {

  Intro: {
    screen: Intro,
    navigationOptions: {
      headerShown: false
    },
  },

  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false
    },
  },
  SecondAddNewTask: {
    screen: SecondAddNewTask,
    navigationOptions: {
      headerShown: false
    },
  },
  List: {
    screen: List,
    navigationOptions: {
      headerShown: false
    },
  },
  ApiResults: {
    screen: ApiResults,
    navigationOptions: {
      headerShown: false
    },
  },
  Tranche: {
    screen: Tranche,
    navigationOptions: {
      headerShown: false
    }
  },
  Xperimental: {
    screen: Xperimental,
  }
}
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);