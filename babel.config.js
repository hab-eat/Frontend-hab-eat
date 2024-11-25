module.exports = {
  presets: ['module:metro-react-native-babel-preset'], // React Native 프리셋
  plugins: [
    ['@babel/plugin-transform-class-properties', { loose: true }], // loose 모드 설정
    ['@babel/plugin-transform-private-methods', { loose: true }], // loose 모드 설정
    ['@babel/plugin-transform-private-property-in-object', { loose: true }], // loose 모드 설정
    ['react-native-reanimated/plugin'], // React Native Reanimated 플러그인
  ],
};
