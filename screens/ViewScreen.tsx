import * as React from 'react';
import {useContext} from 'react';
import { StyleSheet, FlatList, StatusBar, Platform } from 'react-native';
import AddTodoButton from '../components/AddTodoButton';
import { View } from '../components/Themed';
import AddTodo from '../components/AddTodo';
import TodoItem from '../components/TodoItem';
import Header from '../components/Header';

import CONSTANTS from '../constants';
import Utils from '../utils';
import COLORS from '../constants/Colors';
const context = require('../context/TodoContext');

function VirtualizedView(props: any) {
  return (
    <FlatList
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => "dummy"}
      renderItem={null}
      ListHeaderComponent={() => (
        <React.Fragment>{props.children}</React.Fragment>
      )}
    />
  );
}

export default function ViewScreen(props: any) {
  const { route } = props;
  const todoContext: any = useContext(context.TodoContext);
  const { todoList, addNewTodo, updateTodo, deleteTodo } = todoContext;
  const [addingTodo, setaddingTodo] = React.useState(false);

  const filterTodosData = (todosData: any) => {
    const screen = route.name;
    switch (screen) {
      case CONSTANTS.ALL:
        return todosData;
      case CONSTANTS.ACTIVE:
        return todosData.filter((todo: any) => !todo.completed);
      case CONSTANTS.COMPLETED:
        return todosData.filter((todo: any) => todo.completed);
    }

    return todosData;
  };

  const onList = (todos: any) => {
    const todosData = Utils.mergeTodos(todos);
    const filteredData = filterTodosData(todosData);

    return (
      <FlatList
        style={{ width: '100%', top: 15 }}
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item: todo }) => (
          <TodoItem key={todo.id} todo={todo} onUpdate={updateTodo} onDelete={deleteTodo} />
        )}
      />
    );
  };

  const isAndroid = Platform.OS === 'android';

  return (
    <View style={{ flex: 1 }}>
      <Header os={isAndroid ? 25 : 0} />
      {isAndroid ? (
          <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
        ) : (
          <StatusBar backgroundColor={COLORS.primary} barStyle="dark-content" />
        )}

      {addingTodo ? (
        <View style={styles.row}>
          <AddTodo
            onAdd={addNewTodo}
            onCancelDelete={() => setaddingTodo(false)}
            onBlur={() => setaddingTodo(false)}
          />
        </View>
      ) : (
        <VirtualizedView>
          <View style={{ flex: 1 }}>
            {todoList ? onList(todoList) : null}
          </View>
        </VirtualizedView>
      )}
      <AddTodoButton onPress={() => setaddingTodo(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  row: {
    top: 1,
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
