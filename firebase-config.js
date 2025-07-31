// Firebase Configuration for SENTERPRISEIT
// Configuración de Firebase para SENTERPRISEIT

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your web app's Firebase configuration
// Reemplaza con tu configuración de Firebase
const firebaseConfig = {
    apiKey: "tu-api-key-aqui",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "tu-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Database service class
class DatabaseService {
    constructor() {
        this.collectionName = 'registrations';
        this.isOnline = navigator.onLine;
        this.pendingRegistrations = [];
        
        // Listen for online/offline status
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.syncPendingRegistrations();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }

    // Initialize authentication
    async init() {
        try {
            await signInAnonymously(auth);
            console.log('Firebase authentication successful');
        } catch (error) {
            console.error('Firebase authentication failed:', error);
        }
    }

    // Save registration to Firebase
    async saveRegistration(registrationData) {
        try {
            if (!this.isOnline) {
                // Store locally if offline
                this.storeLocally(registrationData);
                return { success: true, message: 'Registro guardado localmente (modo offline)' };
            }

            // Add to Firebase
            const docRef = await addDoc(collection(db, this.collectionName), {
                ...registrationData,
                createdAt: new Date(),
                status: 'pending'
            });

            console.log('Registration saved to Firebase with ID:', docRef.id);
            return { success: true, id: docRef.id, message: 'Registro guardado exitosamente' };

        } catch (error) {
            console.error('Error saving registration:', error);
            
            // Fallback to localStorage
            this.storeLocally(registrationData);
            return { 
                success: false, 
                message: 'Error al guardar en la nube. Registro guardado localmente.',
                error: error.message 
            };
        }
    }

    // Get all registrations from Firebase
    async getAllRegistrations() {
        try {
            if (!this.isOnline) {
                return this.getLocalRegistrations();
            }

            const querySnapshot = await getDocs(collection(db, this.collectionName));
            const registrations = [];
            
            querySnapshot.forEach((doc) => {
                registrations.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            // Sort by creation date (newest first)
            registrations.sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate());
            
            return registrations;

        } catch (error) {
            console.error('Error getting registrations:', error);
            return this.getLocalRegistrations();
        }
    }

    // Delete registration from Firebase
    async deleteRegistration(registrationId) {
        try {
            if (!this.isOnline) {
                this.deleteLocalRegistration(registrationId);
                return { success: true, message: 'Registro eliminado localmente' };
            }

            await deleteDoc(doc(db, this.collectionName, registrationId));
            console.log('Registration deleted from Firebase');
            return { success: true, message: 'Registro eliminado exitosamente' };

        } catch (error) {
            console.error('Error deleting registration:', error);
            return { success: false, message: 'Error al eliminar registro', error: error.message };
        }
    }

    // Get registrations by solution
    async getRegistrationsBySolution(solution) {
        try {
            if (!this.isOnline) {
                const localRegistrations = this.getLocalRegistrations();
                return localRegistrations.filter(reg => reg.solucion === solution);
            }

            const q = query(
                collection(db, this.collectionName),
                where("solucion", "==", solution),
                orderBy("createdAt", "desc")
            );

            const querySnapshot = await getDocs(q);
            const registrations = [];
            
            querySnapshot.forEach((doc) => {
                registrations.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return registrations;

        } catch (error) {
            console.error('Error getting registrations by solution:', error);
            const localRegistrations = this.getLocalRegistrations();
            return localRegistrations.filter(reg => reg.solucion === solution);
        }
    }

    // Local storage fallback methods
    storeLocally(registrationData) {
        let registrations = JSON.parse(localStorage.getItem('senterpriseit_registrations') || '[]');
        registrations.push({
            ...registrationData,
            id: 'local_' + Date.now(),
            createdAt: new Date(),
            status: 'local'
        });
        localStorage.setItem('senterpriseit_registrations', JSON.stringify(registrations));
    }

    getLocalRegistrations() {
        return JSON.parse(localStorage.getItem('senterpriseit_registrations') || '[]');
    }

    deleteLocalRegistration(registrationId) {
        let registrations = this.getLocalRegistrations();
        registrations = registrations.filter(reg => reg.id !== registrationId);
        localStorage.setItem('senterpriseit_registrations', JSON.stringify(registrations));
    }

    // Sync pending registrations when back online
    async syncPendingRegistrations() {
        const localRegistrations = this.getLocalRegistrations();
        const pendingRegistrations = localRegistrations.filter(reg => reg.status === 'local');

        for (const registration of pendingRegistrations) {
            try {
                await this.saveRegistration(registration);
                this.deleteLocalRegistration(registration.id);
            } catch (error) {
                console.error('Error syncing registration:', error);
            }
        }
    }

    // Export to CSV with Firebase data
    async exportToCSV() {
        try {
            const registrations = await this.getAllRegistrations();
            
            if (registrations.length === 0) {
                return { success: false, message: 'No hay registros para exportar' };
            }

            const headers = ['ID', 'Nombre', 'Empresa', 'Email', 'Teléfono', 'Solución', 'Mensaje', 'Fecha', 'Estado'];
            const csvContent = [
                headers.join(','),
                ...registrations.map(reg => [
                    `"${reg.id || ''}"`,
                    `"${reg.nombre || ''}"`,
                    `"${reg.empresa || ''}"`,
                    `"${reg.email || ''}"`,
                    `"${reg.telefono || ''}"`,
                    `"${reg.solucion || ''}"`,
                    `"${reg.mensaje || ''}"`,
                    `"${reg.createdAt ? new Date(reg.createdAt.toDate ? reg.createdAt.toDate() : reg.createdAt).toLocaleDateString('es-ES') : ''}"`,
                    `"${reg.status || 'online'}"`
                ].join(','))
            ].join('\n');

            return { success: true, data: csvContent, filename: `registros_senterpriseit_${new Date().toISOString().split('T')[0]}.csv` };

        } catch (error) {
            console.error('Error exporting to CSV:', error);
            return { success: false, message: 'Error al exportar datos', error: error.message };
        }
    }

    // Get statistics
    async getStatistics() {
        try {
            const registrations = await this.getAllRegistrations();
            
            const stats = {
                total: registrations.length,
                conmutador: registrations.filter(r => r.solucion === 'conmutador').length,
                tpv: registrations.filter(r => r.solucion === 'tpv').length,
                asistencia: registrations.filter(r => r.solucion === 'asistencia').length,
                todas: registrations.filter(r => r.solucion === 'todas').length,
                online: registrations.filter(r => r.status !== 'local').length,
                offline: registrations.filter(r => r.status === 'local').length
            };

            return stats;

        } catch (error) {
            console.error('Error getting statistics:', error);
            return {
                total: 0,
                conmutador: 0,
                tpv: 0,
                asistencia: 0,
                todas: 0,
                online: 0,
                offline: 0
            };
        }
    }
}

// Create and export database service instance
const databaseService = new DatabaseService();

// Initialize database service
databaseService.init().then(() => {
    console.log('Database service initialized');
}).catch(error => {
    console.error('Failed to initialize database service:', error);
});

// Export for use in other files
window.DatabaseService = DatabaseService;
window.databaseService = databaseService; 