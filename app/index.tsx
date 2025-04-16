import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const AboutMe = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.h1}>Работу выполнил:</Text>
        <Text style={styles.bio}>Студент Борисоглебского техникума промышленных и информационных технологий (БТПИТ).</Text>
        <Text style={styles.bio}>Специальности 09.02.07 3-курс (3.2 ИСиП-3)</Text>
        <Text style={styles.name}>Филиппович Иван</Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  h1: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'

  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    // fontWeight: 'bold',
    marginTop: 10,
  },
  bio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 5,
  },
});

export default AboutMe;