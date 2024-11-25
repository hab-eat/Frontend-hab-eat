import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const UserInfoScreen: React.FC = () => {
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [purpose, setPurpose] = useState('');

  const handlePurposeSelect = (selectedPurpose: string) => {
    setPurpose(selectedPurpose);
  };

  const handleSubmit = () => {
    if (!height || !weight || !gender || !purpose) {
      Alert.alert(
        '앗!',
        '입력하지 않은 정보가 존재해요!',
        [
          {
            text: '다시 입력하기',
            onPress: () => console.log('Alert closed'),
          },
        ]
      );
    } else {
      Alert.alert(
        '성공!',
        `키: ${height}cm\n몸무게: ${weight}kg\n성별: ${gender}\n사용 목적: ${purpose}`,
        [
          {
            text: '좋아요!',
            onPress: () => console.log('Confirmed'),
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>사용자 정보 입력</Text>
      <Text style={styles.description}>
        키, 몸무게, 성별, 사용 목적을 입력해주세요.
      </Text>

      {/* 키 입력 */}
      <Text style={styles.label}>키 (cm)</Text>
      <TextInput
        style={styles.input}
        placeholder="예: 170"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />

      {/* 몸무게 입력 */}
      <Text style={styles.label}>몸무게 (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="예: 60"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />

      {/* 성별 선택 */}
      <Text style={styles.label}>성별</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === '남성' && styles.selectedGenderButton,
          ]}
          onPress={() => setGender('남성')}
        >
          <Text
            style={[
              styles.genderText,
              gender === '남성' && styles.selectedGenderText,
            ]}
          >
            남성
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === '여성' && styles.selectedGenderButton,
          ]}
          onPress={() => setGender('여성')}
        >
          <Text
            style={[
              styles.genderText,
              gender === '여성' && styles.selectedGenderText,
            ]}
          >
            여성
          </Text>
        </TouchableOpacity>
      </View>

      {/* 사용 목적 선택 */}
      <Text style={styles.label}>사용 목적</Text>
      <View style={styles.purposeContainer}>
        <TouchableOpacity
          style={[
            styles.purposeButton,
            purpose === '다이어트' && styles.selectedPurposeButton,
          ]}
          onPress={() => handlePurposeSelect('다이어트')}
        >
          <Text
            style={[
              styles.purposeText,
              purpose === '다이어트' && styles.selectedPurposeText,
            ]}
          >
            다이어트
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.purposeButton,
            purpose === '벌크업' && styles.selectedPurposeButton,
          ]}
          onPress={() => handlePurposeSelect('벌크업')}
        >
          <Text
            style={[
              styles.purposeText,
              purpose === '벌크업' && styles.selectedPurposeText,
            ]}
          >
            벌크업
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.purposeButton,
            purpose === '체중유지' && styles.selectedPurposeButton,
          ]}
          onPress={() => handlePurposeSelect('체중유지')}
        >
          <Text
            style={[
              styles.purposeText,
              purpose === '체중유지' && styles.selectedPurposeText,
            ]}
          >
            체중유지
          </Text>
        </TouchableOpacity>
      </View>

      {/* 제출 버튼 */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>등록 완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#1F2937',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 20,
    lineHeight: 22,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#4B5563',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  genderButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
  },
  selectedGenderButton: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  genderText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  selectedGenderText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  purposeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  purposeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  selectedPurposeButton: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  purposeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  selectedPurposeText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default UserInfoScreen;
