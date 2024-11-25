import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const NutritionPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [isAddMealVisible, setAddMealVisible] = useState(false); // 토글 상태
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [meals, setMeals] = useState<{ name: string; calories: number; carbs: number; protein: number; fat: number }[]>([]);
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [carbs, setCarbs] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');

  const handleAddMeal = () => {
    if (!mealName || !calories || !carbs || !protein || !fat) {
      Alert.alert('입력 오류', '모든 값을 입력해주세요.');
      return;
    }

    const newMeal = {
      name: mealName,
      calories: parseFloat(calories),
      carbs: parseFloat(carbs),
      protein: parseFloat(protein),
      fat: parseFloat(fat),
    };

    setMeals((prevMeals) => [...prevMeals, newMeal]);
    setMealName('');
    setCalories('');
    setCarbs('');
    setProtein('');
    setFat('');
    setAddMealVisible(false); // 추가 후 섹션 닫기
  };

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
    setCalendarVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* 상단 날짜 및 달력 버튼 */}
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>선택된 날짜: {selectedDate}</Text>
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={() => setCalendarVisible(true)}
        >
          <Text style={styles.calendarButtonText}>달력</Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isCalendarVisible}
        mode="date"
        onConfirm={handleDateChange}
        onCancel={() => setCalendarVisible(false)}
      />

      {/* 영양 섭취 요약 */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          일일 누적 칼로리: {totalCalories} / 목표 칼로리: {calorieGoal}
        </Text>
        <Text style={styles.summaryText}>
          탄수화물: {totalCarbs}g | 단백질: {totalProtein}g | 지방: {totalFat}g
        </Text>
      </View>

      {/* 음식 추가 토글 버튼 */}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setAddMealVisible((prev) => !prev)}
      >
        <Text style={styles.toggleButtonText}>
          {isAddMealVisible ? '음식 추가 닫기' : '음식 추가 열기'}
        </Text>
      </TouchableOpacity>

      {/* 음식 추가 섹션 */}
      {isAddMealVisible && (
        <View style={styles.addMealContainer}>
          <TextInput
            style={styles.input}
            placeholder="음식 이름"
            value={mealName}
            onChangeText={setMealName}
          />
          <TextInput
            style={styles.input}
            placeholder="칼로리 (kcal)"
            value={calories}
            onChangeText={setCalories}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="탄수화물 (g)"
            value={carbs}
            onChangeText={setCarbs}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="단백질 (g)"
            value={protein}
            onChangeText={setProtein}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="지방 (g)"
            value={fat}
            onChangeText={setFat}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddMeal}>
            <Text style={styles.addButtonText}>음식 추가</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 추가된 음식 리스트 */}
      <FlatList
        data={meals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.mealItem}>
            <Text style={styles.mealText}>{item.name}</Text>
            <Text style={styles.mealText}>
              {item.calories}kcal | 탄: {item.carbs}g | 단: {item.protein}g | 지: {item.fat}g
            </Text>
          </View>
        )}
      />

      {/* 하단 네비게이션 버튼 */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerText}>식단</Text>
        </TouchableOpacity>
        {/* 카메라 버튼 */}
        <TouchableOpacity style={styles.cameraButton}>
          <Image
            source={require('../assets/camera.png')} // 카메라 이미지
            style={styles.cameraImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerText}>습관</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  calendarButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#3B82F6',
  },
  calendarButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  summaryContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
  },
  toggleButton: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  addMealContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  mealItem: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    elevation: 1,
  },
  mealText: {
    fontSize: 16,
    color: '#374151',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#1E40AF',
  },
  cameraButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  cameraText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  cameraImage: {
    width: 30, // 이미지 너비
    height: 30, // 이미지 높이
    resizeMode: 'contain', // 이미지 비율 유지
  },
});

export default NutritionPage;
