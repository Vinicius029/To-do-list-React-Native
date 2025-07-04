import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import TaskItem from '../components/TaskItem';

import AsyncStorage from '@react-native-async-storage/async-storage';



export default function HomeScreen() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const loadTasks = async () => {
          try {
            const storedTasks = await AsyncStorage.getItem('@tasks');
            if (storedTasks) {
              setTasks(JSON.parse(storedTasks));
            }
          } catch (e) {
            console.error('Erro ao carregar tarefas', e);
          }
        };
      
        loadTasks();
      }, []);
      

    useEffect(() => {
        const saveTasks = async () => {
            try {
                await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
            } catch (e) {
                console.error('Erro ao salvar tarefas', e);
            }
        };

        saveTasks();
    }, [tasks]);

    const addTask = () => {
        if (task.trim() === '') return;

        const newTask = {
            id: Date.now().toString(),
            title: task,
            done: false,
        };

        setTasks([...tasks, newTask]);
        setTask('');
    };

    const toggleDone = (id) => {
        const updatedTasks = tasks.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t
        );
        setTasks(updatedTasks);
    };

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter((t) => t.id !== id);
        setTasks(updatedTasks);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📝 To-Do List</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite uma tarefa..."
                    value={task}
                    onChangeText={setTask}
                />
                <TouchableOpacity style={styles.button} onPress={addTask}>
                    <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={tasks}
                keyEx tractor={(item) => item.id}
                ListEmptyComponent={<Text>Sem tarefas ainda!</Text>}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        toggleDone={toggleDone}
                        deleteTask={deleteTask}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        gap: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 40,
    },
    button: {
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
