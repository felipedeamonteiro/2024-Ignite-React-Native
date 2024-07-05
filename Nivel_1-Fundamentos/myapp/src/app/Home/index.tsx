import React, {useState} from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";

import { Participant } from "@/components/Participant";

import { styles } from "./styles";

export function Home() {
  const [newParticipant, setNewParticipant] = useState<string>('');
  const [participants, setParticipants] = useState<string[]>(['Pirocudo', 'Bucetuda', 'Rabuda de Celta', 'Ser de Luz', 'Branquinha de Neve', 'Safada', 'Giga Chad', 'Normie', 'Soyboy', 'Feminazi', 'Macho Alpha']);

  const handleParticipantsRemove = (name: string) => {
    Alert.alert('Remover Participante', `Deseja remover o participante ${name} da lista?`, [
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'Remover',
        onPress: () => {
          setParticipants(prevState => prevState.filter(participant => participant !== name));
        }
      }
    ]);
  }

  const handleParticipantsAdd = (name: string) => {
    if (!name) {
      return Alert.alert('Campo Vazio', 'Por favor, preencha o campo de nome do participante');
    }
    if (participants.includes(name)) {
      return Alert.alert('Participante Existe', `${name} já está na lista de participantes`);
    }
    Alert.alert('Participante Adicionado(a)!', `${name} foi adicionado(a) a lista de participantes!`);
    setParticipants(prevState => [...prevState, name]);
    setNewParticipant('');
  }

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.eventName}>
        Nome do Evento
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 4 de Novembro de 2025
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Nome do participante'
          placeholderTextColor="#6b6b6b"
          onChangeText={(value) => setNewParticipant(value)}
          value={newParticipant}
        />

        <TouchableOpacity style={styles.button} onPress={() => handleParticipantsAdd(newParticipant)}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        showsVerticalScrollIndicator={false}
        data={participants}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Participant 
            key={item} 
            name={item} 
            onRemove={() => handleParticipantsRemove(item)}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.</Text>
        )}
      />

    </View>
  );
}