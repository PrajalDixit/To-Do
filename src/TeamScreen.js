import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { teams, ID } from './appwriteConfig';

const TeamScreen = () => {
  const [teamName, setTeamName] = useState('');
  const [teamList, setTeamList] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [email, setEmail] = useState('');
  const [invitations, setInvitations] = useState({});

  const createTeam = async () => {
    try {
      const response = await teams.create(ID.unique(), teamName);
      fetchTeams();
      setSelectedTeam(response.$id);
      setTeamName('');
    } catch (error) {
      console.log(error);
    }
  };

  const addLocalMember = () => {
    if (email && selectedTeam) {
      setInvitations((prev) => ({
        ...prev,
        [selectedTeam]: [...(prev[selectedTeam] || []), email],
      }));
      setEmail('');
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

  const renderTeamItem = ({ item }) => (
    <View style={styles.listItem}>
      <TouchableOpacity onPress={() => setSelectedTeam(item.$id)}>
        <Text style={styles.teamName}>{item.name}</Text>
      </TouchableOpacity>
      {selectedTeam === item.$id && (
        <View style={styles.invitationContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <Button
            title="Add Member"
            onPress={addLocalMember}
            color="#20B2AA" // Light Sea Green color
          />
          <FlatList
            data={invitations[item.$id] || []}
            keyExtractor={(email, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.email}>{item}</Text>
            )}
          />
        </View>
      )}
    </View>
  );

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
      <FlatList
        style={styles.list}
        data={teamList}
        keyExtractor={(item) => item.$id}
        renderItem={renderTeamItem}
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
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  invitationContainer: {
    marginTop: 10,
    paddingLeft: 20,
  },
  email: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default TeamScreen;
