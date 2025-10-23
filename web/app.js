/**
 * Application Web Odoo Assistant
 */

let odooClient = null;
let messages = [];

// Charger la configuration au démarrage
window.onload = function() {
    loadConfig();
};

function loadConfig() {
    const savedUrl = localStorage.getItem('odoo_url');
    const savedDb = localStorage.getItem('odoo_database');
    const savedUser = localStorage.getItem('odoo_username');
    const savedPass = localStorage.getItem('odoo_password');

    if (savedUrl) document.getElementById('url').value = savedUrl;
    if (savedDb) document.getElementById('database').value = savedDb;
    if (savedUser) document.getElementById('username').value = savedUser;
    if (savedPass) document.getElementById('password').value = savedPass;

    // Si tous les paramètres sont sauvegardés, aller au chat
    if (savedUrl && savedDb && savedUser && savedPass) {
        showChatScreen();
        initializeOdooClient(savedUrl, savedDb, savedUser, savedPass);
    }
}

function initializeOdooClient(url, database, username, password) {
    odooClient = new OdooClient(url, database, username, password);
    addWelcomeMessage();
}

function addWelcomeMessage() {
    const welcomeMsg = {
        text: "Bonjour ! Je suis votre assistant Odoo. Posez-moi n'importe quelle question sur vos données Odoo.\n\nExemples :\n• Affiche-moi les 5 derniers clients\n• Quelles sont les commandes de cette semaine ?\n• Liste les produits disponibles\n• Montre-moi les factures en brouillon",
        sender: 'bot',
        timestamp: new Date()
    };
    addMessage(welcomeMsg);
}

async function testConnection() {
    const url = document.getElementById('url').value;
    const database = document.getElementById('database').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!url || !database || !username || !password) {
        showError('Veuillez remplir tous les champs avant de tester la connexion');
        return;
    }

    setTestButtonLoading(true);
    hideError();

    try {
        const client = new OdooClient(url, database, username, password);
        await client.authenticate();

        alert(`✓ Connexion réussie !\n\nVous êtes connecté à Odoo en tant que ${username}.\n\nVous pouvez maintenant enregistrer la configuration.`);
    } catch (error) {
        showError(error.message || 'Impossible de se connecter à Odoo. Vérifiez vos paramètres.');
    } finally {
        setTestButtonLoading(false);
    }
}

function saveConfig() {
    const url = document.getElementById('url').value;
    const database = document.getElementById('database').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!url || !database || !username || !password) {
        showError('Veuillez remplir tous les champs');
        return;
    }

    setSaveButtonLoading(true);
    hideError();

    try {
        // Sauvegarder dans localStorage
        localStorage.setItem('odoo_url', url);
        localStorage.setItem('odoo_database', database);
        localStorage.setItem('odoo_username', username);
        localStorage.setItem('odoo_password', password);

        // Initialiser le client Odoo
        initializeOdooClient(url, database, username, password);

        // Afficher l'écran de chat
        setTimeout(() => {
            showChatScreen();
            setSaveButtonLoading(false);
        }, 500);
    } catch (error) {
        showError('Impossible de sauvegarder la configuration');
        setSaveButtonLoading(false);
    }
}

function resetConfig() {
    if (confirm('Voulez-vous vraiment réinitialiser votre configuration Odoo ?')) {
        localStorage.removeItem('odoo_url');
        localStorage.removeItem('odoo_database');
        localStorage.removeItem('odoo_username');
        localStorage.removeItem('odoo_password');

        messages = [];
        odooClient = null;

        showConfigScreen();
    }
}

async function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();

    if (!text || !odooClient) return;

    // Ajouter le message utilisateur
    const userMsg = {
        text: text,
        sender: 'user',
        timestamp: new Date()
    };
    addMessage(userMsg);
    input.value = '';

    // Désactiver le bouton d'envoi
    setSendButtonLoading(true);

    try {
        // Authentifier si nécessaire
        if (!odooClient.uid) {
            await odooClient.authenticate();
        }

        // Exécuter la requête
        const result = await odooClient.executeQuery(text);

        // Formater et afficher la réponse
        const formattedResponse = odooClient.formatResults(result.results, result.model);

        const botMsg = {
            text: formattedResponse,
            sender: 'bot',
            timestamp: new Date()
        };
        addMessage(botMsg);
    } catch (error) {
        console.error('Erreur:', error);

        const errorMsg = {
            text: `Désolé, une erreur s'est produite : ${error.message}\n\nVeuillez vérifier votre connexion Odoo et réessayer.`,
            sender: 'bot',
            timestamp: new Date(),
            isError: true
        };
        addMessage(errorMsg);

        // Si erreur d'authentification
        if (error.message.includes('authentification') || error.message.includes('Identifiants')) {
            if (confirm('Erreur d\'authentification. Voulez-vous reconfigurer vos paramètres Odoo ?')) {
                resetConfig();
            }
        }
    } finally {
        setSendButtonLoading(false);
    }
}

function addMessage(message) {
    messages.push(message);
    renderMessages();
}

function renderMessages() {
    const container = document.getElementById('messagesContainer');
    container.innerHTML = '';

    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.sender}`;

        const textDiv = document.createElement('div');
        textDiv.style.whiteSpace = 'pre-wrap';
        textDiv.textContent = msg.text;

        const timeDiv = document.createElement('div');
        timeDiv.className = 'timestamp';
        timeDiv.textContent = msg.timestamp.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });

        if (msg.isError) {
            messageDiv.style.background = '#ffebee';
            messageDiv.style.color = '#d32f2f';
        }

        messageDiv.appendChild(textDiv);
        messageDiv.appendChild(timeDiv);
        container.appendChild(messageDiv);
    });

    // Scroller vers le bas
    container.scrollTop = container.scrollHeight;
}

// Fonctions utilitaires
function showConfigScreen() {
    document.getElementById('configScreen').classList.remove('hidden');
    document.getElementById('chatScreen').classList.add('hidden');
}

function showChatScreen() {
    document.getElementById('configScreen').classList.add('hidden');
    document.getElementById('chatScreen').classList.remove('hidden');
}

function showError(message) {
    const errorDiv = document.getElementById('configError');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

function hideError() {
    const errorDiv = document.getElementById('configError');
    errorDiv.classList.add('hidden');
}

function setTestButtonLoading(loading) {
    const btn = document.querySelector('.button-secondary');
    const text = document.getElementById('testButtonText');
    const loader = document.getElementById('testLoader');

    btn.disabled = loading;
    if (loading) {
        text.classList.add('hidden');
        loader.classList.remove('hidden');
    } else {
        text.classList.remove('hidden');
        loader.classList.add('hidden');
    }
}

function setSaveButtonLoading(loading) {
    const buttons = document.querySelectorAll('.button');
    const text = document.getElementById('saveButtonText');
    const loader = document.getElementById('saveLoader');

    buttons.forEach(btn => btn.disabled = loading);
    if (loading) {
        text.classList.add('hidden');
        loader.classList.remove('hidden');
    } else {
        text.classList.remove('hidden');
        loader.classList.add('hidden');
    }
}

function setSendButtonLoading(loading) {
    const btn = document.getElementById('sendButton');
    const input = document.getElementById('messageInput');

    btn.disabled = loading;
    input.disabled = loading;

    if (loading) {
        btn.innerHTML = '<div class="loader"></div>';
    } else {
        btn.innerHTML = '➤';
    }
}
