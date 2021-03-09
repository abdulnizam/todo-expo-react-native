import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { View, CheckBox, Body } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
  },

  row: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});


interface propTypes {
  todo?: {
    title: string,
    completed: boolean,
    createdAt: number,
  },
  onUpdate?: Function,
  onDelete?: Function,
}


const TodoItem: React.FunctionComponent<propTypes> = (props: any) => { 

  const { todo, onUpdate, onDelete } = props;

  const [titles, settitles] = React.useState(todo.title)
  const [completedd, setcompleted] = React.useState(todo.completed)

  const onTodoItemToggle = (todo, propAction) => {
    propAction({
      ...todo,
      completed: !completedd,
    });
    setcompleted(!completedd)
  };
  
  return (
    <View style={styles.row}>
      <View
        style={{
          flex: 1,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingRight: 10,
          paddingVertical: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => onTodoItemToggle(todo, onUpdate)}
          style={{
            flex: 1,
            width: '100%',
            flexDirection: 'row',
          }}
        >
          <CheckBox
            checked={completedd ? true : false}
            onPress={() => onTodoItemToggle(todo, onUpdate)}
          />
          <Body
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingLeft: 25,
            }}
          >
            <Text
              style={{
                color: completedd ? 'grey' : 'black',
                textDecorationLine: completedd ? 'line-through' : 'none',
              }}
            >
              {titles}
            </Text>
          </Body>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(todo)}
          style={{ paddingLeft: 25, paddingRight: 15 }}
        >
          <Ionicons
            name="ios-trash-outline"
            color={`${ titles && titles.length > 0 ? 'black' : 'grey'}`}
            size={23}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

}

export default TodoItem;
