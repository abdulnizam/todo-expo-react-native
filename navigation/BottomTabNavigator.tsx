import { MaterialIcons} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ViewScreen from '../screens/ViewScreen';
import { BottomTabParamList, AllParamList, ActiveParamList, CompletedParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="All"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="All"
        component={AllNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="format-list-bulleted" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Active"
        component={ActiveNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="filter-center-focus" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Completed"
        component={CompletedNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="playlist-add-check" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof MaterialIcons>['name']; color: string }) {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const AllStack = createStackNavigator<AllParamList>();

function AllNavigator() {
  return (
    <AllStack.Navigator>
      <AllStack.Screen
        name="All"
        component={ViewScreen}
        options={{ headerShown : false }}
      />
    </AllStack.Navigator>
  );
}

const ActiveStack = createStackNavigator<ActiveParamList>();

function ActiveNavigator() {
  return (
    <ActiveStack.Navigator>
      <ActiveStack.Screen
        name="Active"
        component={ViewScreen}
        options={{ headerShown : false }}
      />
    </ActiveStack.Navigator>
  );
}

const CompletedStack = createStackNavigator<CompletedParamList>();

function CompletedNavigator() {
  return (
    <CompletedStack.Navigator>
      <CompletedStack.Screen
        name="Completed"
        component={ViewScreen}
        options={{ headerShown : false }}
        
        
      />
    
    </CompletedStack.Navigator>
  );
}
