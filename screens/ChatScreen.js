import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OdooClient from '../services/OdooClient';

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [odooClient, setOdooClient] = useState(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    initializeOdooClient();
    addWelcomeMessage();
  }, []);

  const initializeOdooClient = async () => {
    try {
      const url = await AsyncStorage.getItem('odoo_url');
      const database = await AsyncStorage.getItem('odoo_database');
      const username = await AsyncStorage.getItem('odoo_username');
      const password = await AsyncStorage.getItem('odoo_password');

      if (!url || !database || !username || !password) {
        navigation.replace('Config');
        return;
      }

      const client = new OdooClient(url, database, username, password);
      setOdooClient(client);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger la configuration');
      navigation.replace('Config');
    }
  };

  const addWelcomeMessage = () => {
    const welcomeMessage = {
      id: Date.now().toString(),
      text: "Bonjour ! Je suis votre assistant Odoo. Posez-moi n'importe quelle question sur vos données Odoo.\n\nExemples de questions :\n• Affiche-moi les 5 derniers clients\n• Quelles sont les commandes de cette semaine ?\n• Liste les produits disponibles\n• Montre-moi les factures en brouillon",
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  };

  const sendMessage = async () => {
    if (!inputText.trim() || !odooClient) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      // Authentification si nécessaire
      if (!odooClient.uid) {
        await odooClient.authenticate();
      }

      // Exécuter la requête
      const result = await odooClient.executeQuery(inputText);

      // Formater les résultats
      const formattedResponse = odooClient.formatResults(result.results, result.model);

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: formattedResponse,
        sender: 'bot',
        timestamp: new Date(),
        data: result,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de la requête:', error);

      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: `Désolé, une erreur s'est produite : ${error.message}.\n\nVeuillez vérifier votre connexion Odoo et réessayer.`,
        sender: 'bot',
        timestamp: new Date(),
        isError: true,
      };

      setMessages(prev => [...prev, errorMessage]);

      // Si erreur d'authentification, proposer de reconfigurer
      if (error.message.includes('authentification')) {
        Alert.alert(
          'Erreur d\'authentification',
          'Voulez-vous reconfigurer vos paramètres Odoo ?',
          [
            { text: 'Annuler', style: 'cancel' },
            {
              text: 'Reconfigurer',
              onPress: () => navigation.replace('Config')
            },
          ]
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const resetConfig = () => {
    Alert.alert(
      'Réinitialiser la configuration',
      'Voulez-vous vraiment réinitialiser votre configuration Odoo ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.multiRemove([
              'odoo_url',
              'odoo_database',
              'odoo_username',
              'odoo_password',
            ]);
            navigation.replace('Config');
          },
        },
      ]
    );
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.sender === 'user' ? styles.userMessageText : styles.botMessageText,
          item.isError && styles.errorMessageText,
        ]}
      >
        {item.text}
      </Text>
      <Text
        style={[
          styles.timestamp,
          item.sender === 'user' ? styles.userTimestamp : styles.botTimestamp,
        ]}
      >
        {item.timestamp.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Odoo Assistant</Text>
        <TouchableOpacity onPress={resetConfig} style={styles.configButton}>
          <Text style={styles.configButtonText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        onLayout={() => flatListRef.current?.scrollToEnd()}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Posez votre question..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
          editable={!loading}
        />
        <TouchableOpacity
          style={[styles.sendButton, loading && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={loading || !inputText.trim()}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.sendButtonText}>➤</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#714B67',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  configButton: {
    padding: 5,
  },
  configButtonText: {
    fontSize: 24,
  },
  messagesList: {
    padding: 15,
    paddingBottom: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 15,
    borderRadius: 15,
    padding: 12,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#714B67',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#fff',
  },
  botMessageText: {
    color: '#333',
  },
  errorMessageText: {
    color: '#d32f2f',
  },
  timestamp: {
    fontSize: 11,
    marginTop: 5,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  botTimestamp: {
    color: '#999',
    textAlign: 'left',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#714B67',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
