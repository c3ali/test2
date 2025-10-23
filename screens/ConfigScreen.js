import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OdooClient from '../services/OdooClient';

const ConfigScreen = ({ navigation }) => {
  const [url, setUrl] = useState('');
  const [database, setDatabase] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const savedUrl = await AsyncStorage.getItem('odoo_url');
      const savedDb = await AsyncStorage.getItem('odoo_database');
      const savedUser = await AsyncStorage.getItem('odoo_username');
      const savedPass = await AsyncStorage.getItem('odoo_password');

      if (savedUrl) setUrl(savedUrl);
      if (savedDb) setDatabase(savedDb);
      if (savedUser) setUsername(savedUser);
      if (savedPass) setPassword(savedPass);

      // Si tous les paramètres sont sauvegardés, rediriger vers le chat
      if (savedUrl && savedDb && savedUser && savedPass) {
        navigation.replace('Chat');
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la configuration:', error);
    } finally {
      setLoadingConfig(false);
    }
  };

  const testConnection = async () => {
    if (!url || !database || !username || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs avant de tester la connexion');
      return;
    }

    setTesting(true);

    try {
      const client = new OdooClient(url, database, username, password);

      // Tester l'authentification
      await client.authenticate();

      Alert.alert(
        'Connexion réussie !',
        `Vous êtes connecté à Odoo en tant que ${username}.\n\nVous pouvez maintenant enregistrer la configuration.`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert(
        'Échec de la connexion',
        error.message || 'Impossible de se connecter à Odoo. Vérifiez vos paramètres.',
        [{ text: 'OK' }]
      );
    } finally {
      setTesting(false);
    }
  };

  const saveConfig = async () => {
    if (!url || !database || !username || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);

    try {
      // Sauvegarder la configuration
      await AsyncStorage.setItem('odoo_url', url);
      await AsyncStorage.setItem('odoo_database', database);
      await AsyncStorage.setItem('odoo_username', username);
      await AsyncStorage.setItem('odoo_password', password);

      Alert.alert(
        'Succès',
        'Configuration enregistrée avec succès !',
        [
          {
            text: 'OK',
            onPress: () => navigation.replace('Chat'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de sauvegarder la configuration');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loadingConfig) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#714B67" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Configuration Odoo SaaS</Text>
          <Text style={styles.subtitle}>
            Connectez-vous à votre instance Odoo en ligne
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>ℹ️ Pour Odoo Online (SaaS)</Text>
          <Text style={styles.infoBoxText}>
            • URL : https://votre-domaine.odoo.com{'\n'}
            • Base de données : souvent le même nom que votre domaine{'\n'}
            • Utilisez vos identifiants Odoo habituels
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>URL Odoo *</Text>
            <TextInput
              style={styles.input}
              placeholder="https://votre-instance.odoo.com"
              value={url}
              onChangeText={setUrl}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
            />
            <Text style={styles.helperText}>
              L'URL complète de votre instance Odoo SaaS
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Base de données *</Text>
            <TextInput
              style={styles.input}
              placeholder="nom_de_la_base"
              value={database}
              onChangeText={setDatabase}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.helperText}>
              Le nom de votre base de données Odoo
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom d'utilisateur *</Text>
            <TextInput
              style={styles.input}
              placeholder="votre@email.com"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
            <Text style={styles.helperText}>
              Votre email de connexion Odoo
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mot de passe *</Text>
            <TextInput
              style={styles.input}
              placeholder="Votre mot de passe"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.helperText}>
              Votre mot de passe Odoo
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.testButton, testing && styles.buttonDisabled]}
            onPress={testConnection}
            disabled={testing || loading}
          >
            {testing ? (
              <ActivityIndicator color="#714B67" />
            ) : (
              <Text style={styles.testButtonText}>🔌 Tester la connexion</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={saveConfig}
            disabled={loading || testing}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>✓ Enregistrer et continuer</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.infoText}>
            🔒 Vos informations sont stockées localement et en sécurité sur votre appareil.
            Elles ne sont partagées qu'avec votre instance Odoo.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#714B67',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#E8F4FD',
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  infoBoxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  infoBoxText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  helperText: {
    fontSize: 13,
    color: '#888',
    marginTop: 5,
    fontStyle: 'italic',
  },
  testButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#714B67',
  },
  testButtonText: {
    color: '#714B67',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#714B67',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText: {
    marginTop: 20,
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ConfigScreen;
