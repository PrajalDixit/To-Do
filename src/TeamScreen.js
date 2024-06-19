import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet } from 'react-native';
import { teams, ID } from './appwriteConfig';

const TeamScreen = () => {
  const [teamId, setTeamId] = useState('');
  const [email, setEmail] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamList, setTeamList] = useState([]);

  const createTeam = async () => {
    try {
      const response = await teams.create(ID.unique(), teamName);
      setTeamId(response.$id);
      fetchTeams();
    } catch (error) {
      console.log(error);
    }
  };

  const inviteMember = async () => {
    try {
      await teams.createMembership(teamId, ['guests'], email);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await teams.list();
      setTeamList(response.teams);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Team Name"
        value={teamName}
        onChangeText={setTeamName}
      />
      <Button
        title="Create Team"
        onPress={createTeam}
        color="#4682B4" // Steel Blue color
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button
        title="Invite Member"
        onPress={inviteMember}
        color="#20B2AA" // Light Sea Green color
      />
      <FlatList
        style={styles.list}
        data={teamList}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.name}</Text>
          </View>
        )}
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default TeamScreen;
