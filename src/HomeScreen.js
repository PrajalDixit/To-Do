import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet } from 'react-native';
import { databases } from './appwriteConfig';
import { account } from './appwriteConfig';


const HomeScreen = ({ navigation }) => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    const fetchTodos = async () => {
        try {
            const response = await databases.listDocuments('Todo', 'Todo');
            setTodos(response.documents);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);
    
    const deleteTodo = async (id) => {
        try {
            await databases.deleteDocument('Todo', 'Todo', id);
            fetchTodos();
        } catch (error) {
            console.log(error);
        }
    };



    const addTodo = async () => {
        try {
            await databases.createDocument('Todo', 'Todo', 'unique()', { todo: task });
            fetchTodos();
        } catch (error) {
            console.log(error);
        }
    };

    const team = () => {
        navigation.navigate('Team');
    }
    const logout = async () => {
        await account.deleteSession("current");
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="New Task"
                value={task}
                onChangeText={setTask}
            />
            <Button
                title="Add Task"
                onPress={addTodo}
                color="#6495ED" // Dodger Blue color
            />
            <Button
                title="Team"
                onPress={team}
                color="#FFD700" // Gold color
            />
            <FlatList
                style={styles.list}
                data={todos}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text>{item.todo}</Text>
                        <Button
                            title="Delete"
                            onPress={() => deleteTodo(item.$id)}
                            color="#DC143C" // Crimson color
                        />
                    </View>
                )}
            />
            <Button
                title="Logout"
                onPress={logout}
                color="#FF4500" // Orange Red color
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    list: {
        marginTop: 20,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default HomeScreen;
