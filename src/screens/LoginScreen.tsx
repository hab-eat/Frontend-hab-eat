// src/screens/LoginScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import KakaoLogins,{ login, logout, getProfile } from '@react-native-seoul/kakao-login';

const LoginScreen: React.FC = () => {
  // kakao 로그인
  const handleKakaoLogin = async () => {
    try {
      const token = await login();
      console.log('Kakao Token:', token);
      Alert.alert('로그인 성공', `Access Token: ${token.accessToken}`);
    } catch (error) {
      console.error('Kakao Login Error:', error);
      Alert.alert('로그인 실패', '카카오 로그인 중 오류가 발생했습니다.');
    }
  };

  const handleFacebookLogin = () => {
    console.log('Facebook Login Pressed');
  };

  return (
    <View style={styles.container}>
      {/* 로고 이미지 */}
      <Image source={require('../assets/full_logo.png')} style={styles.logo} />

      {/* Welcome 텍스트 */}
      <Text style={styles.title}>소셜 아이디로 로그인하기</Text>
      <Text style={styles.subtitle}>
        Google 또는 Facebook 아이디를 사용하여 간편하게 로그인하세요.
      </Text>

      <View style={styles.buttonContainer}>
        {/* kakao Login 버튼 */}
        <TouchableOpacity style={styles.button} onPress={handleKakaoLogin}>
          <Image
            source={require('../assets/kakao_login_medium_wide.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* Facebook Login 버튼 */}
        <TouchableOpacity style={styles.button} onPress={handleKakaoLogin}>
          <Image
            source={require('../assets/facebook-logo.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200, // 로고 너비
    height: 200, // 로고 높이
    marginBottom: 30, // 로고 아래 여백
    resizeMode: 'contain', // 이미지 비율 유지
  },
  title: {
    fontSize: 18, // 텍스트 크기 증가
    fontWeight: 'bold',
    marginBottom: 10, // 아래 여백 추가
    color: '#182B38', // 텍스트 색상 변경
    textAlign: 'center', // 텍스트 중앙 정렬
  },
  subtitle: {
    fontSize: 12, // 부제목 크기
    color: '#4F4F4F', // 부제목 색상
    marginBottom: 20, // 아래 여백
    textAlign: 'center', // 부제목 중앙 정렬
    paddingHorizontal: 20, // 좌우 여백
    lineHeight: 20, // 줄 간격
  },
  buttonContainer: {
    flexDirection: 'column', // 가로 배치
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row', // 아이콘과 텍스트를 가로로 배치
    alignItems: 'center', // 아이콘과 텍스트 수직 정렬
    justifyContent: 'center', // 내용 중앙 정렬
    backgroundColor: '#F5F5F5', // 버튼 배경색
    paddingVertical: 15, // 버튼 높이
    paddingHorizontal: 20, // 버튼 좌우 여백
    borderRadius: 10, // 버튼 둥근 모서리
    marginBottom: 15, // 버튼 간 간격
    width: '100%', // 버튼 가로 폭
    elevation: 3, // 그림자 효과 (Android)
    shadowColor: '#000', // 그림자 색상 (iOS)
    shadowOffset: { width: 0, height: 2 }, // 그림자 위치 (iOS)
    shadowOpacity: 0.2, // 그림자 투명도 (iOS)
    shadowRadius: 3, // 그림자 반경 (iOS)
  },
  icon: {
    width: '50%',
    height: 30,
    resizeMode: 'contain',
    
  },
});

export default LoginScreen;