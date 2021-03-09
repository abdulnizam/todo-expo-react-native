import React from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { View, Body, CheckBox } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

interface propTypes {
  todo?: {
    title: string,
    completed: boolean,
    createdAt: number,
  },
  onAdd?: Function,
  onCancelDelete?: Function,
  onBlur?: Function,
}

const defaultProps: propTypes = {
  todo: {
    title: '',
    completed: false,
    createdAt: 0,
  },
}

const AddTodo: React.FunctionComponent<propTypes> = (props: any) => {

  const { title, completed, createdAt } = props.todo;

  const [titles, settitles] = React.useState(title)
  const [completedd, setcompleted] = React.useState(completed)
  const [createdAtt, setcreatedAt] = React.useState(createdAt)

  const onSubmit = () => {
    
    if (titles.length > 0) props.onAdd({
      titles,
      completedd,
      createdAtt,
    });
    return null;
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
        paddingBottom: 5,
        paddingTop: 5,
      }}
    >
      <CheckBox checked={completedd} onPress={() => setcompleted(!completedd)} />
      <Body
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          paddingLeft: 25,
        }}
      >
        <TextInput
          style={{ width: '90%' }}
          placeholder="What needs to be done?"
          autoFocus
          // underLineColorAndroid="transparent"
          // underlineColor="transparent"
          blurOnSubmit
          onSubmitEditing={onSubmit}
          onChangeText={changedTitle => settitles(changedTitle)}
          value={titles}
          autoCorrect={false}
          autoCapitalize="none"
          onBlur={props.onBlur}
        />
      </Body>
      <TouchableOpacity
        onPress={() => props.onCancelDelete}
        style={{ paddingLeft: 25, paddingRight: 15 }}
      >
        <Ionicons
          name="ios-trash-outline"
          color={`${titles.length > 0 ? 'black' : 'grey'}`}
          size={23}
        />
      </TouchableOpacity>
    </View>
  );
}

AddTodo.defaultProps = defaultProps;

export default AddTodo;
