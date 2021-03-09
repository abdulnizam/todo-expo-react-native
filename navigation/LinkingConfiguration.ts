import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabAll: {
            screens: {
              TabAllScreen: 'All',
            },
          },
          TabActive: {
            screens: {
              TabActiveScreen: 'Active',
            },
          },
          TabCompleted: {
            screens: {
              TabCompletedScreen: 'Completed',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
