// src/components/TaskItem.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TaskItem({ task, toggleDone, deleteTask }) {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => toggleDone(task.id)}>
        <Text style={[styles.text, task.done && styles.done]}>
          {task.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => deleteTask(task.id)}>
        <Text style={styles.delete}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
  done: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  delete: {
    fontSize: 18,
  },
});
