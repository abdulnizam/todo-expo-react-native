import React from 'react';
import { Header, Body, Title } from 'native-base';

import COLORS from '../constants/Colors';

const AppHeader = (props: any) => (
  <Header style={{ backgroundColor: COLORS.primary, marginTop: props.os }}>
    <Body
      style={{
        flex: 1,
        flexDirection: 'row',
      }}
    >
      <Title
        style={{
          color: 'white',
          paddingLeft: 7,
        }}
      >
        My Todos
      </Title>
    </Body>
  </Header>
);

export default AppHeader;