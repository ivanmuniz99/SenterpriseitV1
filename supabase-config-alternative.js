// Supabase Configuration Alternative for SENTERPRISEIT
// This version uses script tags instead of ES6 modules

// Supabase Configuration - Replace with your actual values
const supabaseUrl = 'https://fvgywsxdvyedxbrsiagq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2Z3l3c3hkdnllZHhicnNpYWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwOTMxMTgsImV4cCI6MjA2OTY2OTExOH0.efrLLtwceaJS1jnHuc2g1EN45Ofx8gnQrws2Ly9b_3c'

// Initialize Supabase client (requires supabase script tag in HTML)
const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey)

class DatabaseService {
    constructor() {
        this.collectionName = 'registrations'
        this.isOnline = navigator.onLine
        this.pendingSync = []
        
        // Listen for online/offline status changes
        window.addEventListener('online', () => {
            this.isOnline = true
            this.syncPendingRegistrations()
        })
        
        window.addEventListener('offline', () => {
            this.isOnline = false
        })
    }

    async init() {
        try {
            // Test connection
            const { data, error } = await supabaseClient
                .from(this.collectionName)
                .select('count')
                .limit(1)
            
            if (error) {
                console.warn('Supabase connection failed, using local storage:', error)
                this.isOnline = false
            } else {
                this.isOnline = true
                console.log('Supabase connected successfully')
            }
        } catch (error) {
            console.warn('Supabase initialization failed, using local storage:', error)
            this.isOnline = false
        }
    }

    async saveRegistration(registrationData) {
        const timestamp = new Date().toISOString()
        const dataWithTimestamp = {
            ...registrationData,
            created_at: timestamp,
            status: this.isOnline ? 'online' : 'local'
        }

        try {
            if (this.isOnline) {
                // Save to Supabase
                const { data, error } = await supabaseClient
                    .from(this.collectionName)
                    .insert([dataWithTimestamp])
                    .select()

                if (error) throw error

                // Also save locally as backup
                this.storeLocally(dataWithTimestamp)
                
                return {
                    success: true,
                    message: 'Registro guardado exitosamente en la nube',
                    data: data[0]
                }
            } else {
                // Save locally when offline
                this.storeLocally(dataWithTimestamp)
                this.pendingSync.push(dataWithTimestamp)
                
                return {
                    success: true,
                    message: 'Registro guardado localmente (sin conexión)',
                    data: dataWithTimestamp
                }
            }
        } catch (error) {
            console.error('Error saving registration:', error)
            
            // Fallback to local storage
            this.storeLocally(dataWithTimestamp)
            
            return {
                success: false,
                message: 'Error al guardar en la nube, guardado localmente',
                data: dataWithTimestamp
            }
        }
    }

    async getAllRegistrations() {
        try {
            if (this.isOnline) {
                // Get from Supabase
                const { data, error } = await supabaseClient
                    .from(this.collectionName)
                    .select('*')
                    .order('created_at', { ascending: false })

                if (error) throw error

                // Also get local data and merge
                const localData = this.getLocalRegistrations()
                const mergedData = this.mergeData(data, localData)
                
                return mergedData
            } else {
                // Get from local storage when offline
                return this.getLocalRegistrations()
            }
        } catch (error) {
            console.error('Error getting registrations:', error)
            return this.getLocalRegistrations()
        }
    }

    async deleteRegistration(registrationId) {
        try {
            if (this.isOnline) {
                // Delete from Supabase
                const { error } = await supabaseClient
                    .from(this.collectionName)
                    .delete()
                    .eq('id', registrationId)

                if (error) throw error
            }
            
            // Always delete locally
            this.deleteLocalRegistration(registrationId)
            
            return { success: true }
        } catch (error) {
            console.error('Error deleting registration:', error)
            // Still delete locally
            this.deleteLocalRegistration(registrationId)
            return { success: false, error: error.message }
        }
    }

    async getRegistrationsBySolution(solution) {
        try {
            if (this.isOnline) {
                const { data, error } = await supabaseClient
                    .from(this.collectionName)
                    .select('*')
                    .eq('solucion', solution)
                    .order('created_at', { ascending: false })

                if (error) throw error
                return data
            } else {
                // Filter local data
                const localData = this.getLocalRegistrations()
                return localData.filter(reg => reg.solucion === solution)
            }
        } catch (error) {
            console.error('Error filtering registrations:', error)
            const localData = this.getLocalRegistrations()
            return localData.filter(reg => reg.solucion === solution)
        }
    }

    // Local storage helpers
    storeLocally(registrationData) {
        const localData = this.getLocalRegistrations()
        localData.unshift(registrationData)
        localStorage.setItem('senterpriseit_registrations', JSON.stringify(localData))
    }

    getLocalRegistrations() {
        const data = localStorage.getItem('senterpriseit_registrations')
        return data ? JSON.parse(data) : []
    }

    deleteLocalRegistration(registrationId) {
        const localData = this.getLocalRegistrations()
        const filteredData = localData.filter(reg => reg.id !== registrationId)
        localStorage.setItem('senterpriseit_registrations', JSON.stringify(filteredData))
    }

    // Merge online and local data
    mergeData(onlineData, localData) {
        const merged = [...onlineData]
        
        // Add local data that's not in online data
        localData.forEach(localReg => {
            const exists = merged.find(onlineReg => 
                onlineReg.email === localReg.email && 
                onlineReg.created_at === localReg.created_at
            )
            if (!exists) {
                merged.push(localReg)
            }
        })
        
        return merged.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }

    // Sync pending registrations when back online
    async syncPendingRegistrations() {
        if (this.pendingSync.length === 0) return

        console.log('Syncing pending registrations...')
        
        for (const registration of this.pendingSync) {
            try {
                const { error } = await supabaseClient
                    .from(this.collectionName)
                    .insert([registration])

                if (!error) {
                    console.log('Synced registration:', registration.email)
                }
            } catch (error) {
                console.error('Error syncing registration:', error)
            }
        }
        
        this.pendingSync = []
    }

    // Export to CSV
    async exportToCSV() {
        try {
            const registrations = await this.getAllRegistrations()
            
            if (registrations.length === 0) {
                return { success: false, message: 'No hay datos para exportar' }
            }

            // Create CSV content
            const headers = ['Nombre', 'Email', 'Teléfono', 'Empresa', 'Solución', 'Mensaje', 'Fecha', 'Estado']
            const csvContent = [
                headers.join(','),
                ...registrations.map(reg => [
                    `"${reg.nombre || ''}"`,
                    `"${reg.email || ''}"`,
                    `"${reg.telefono || ''}"`,
                    `"${reg.empresa || ''}"`,
                    `"${reg.solucion || ''}"`,
                    `"${reg.mensaje || ''}"`,
                    `"${reg.created_at || ''}"`,
                    `"${reg.status || 'local'}"`
                ].join(','))
            ].join('\n')

            // Create and download file
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
            const link = document.createElement('a')
            const url = URL.createObjectURL(blob)
            link.setAttribute('href', url)
            link.setAttribute('download', `senterpriseit_registrations_${new Date().toISOString().split('T')[0]}.csv`)
            link.style.visibility = 'hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            return { success: true, message: 'Exportación completada' }
        } catch (error) {
            console.error('Error exporting to CSV:', error)
            return { success: false, message: 'Error al exportar' }
        }
    }

    // Get statistics
    async getStatistics() {
        try {
            const registrations = await this.getAllRegistrations()
            
            const stats = {
                total: registrations.length,
                bySolution: {},
                onlineCount: 0,
                localCount: 0
            }

            registrations.forEach(reg => {
                // Count by solution
                const solution = reg.solucion || 'Sin especificar'
                stats.bySolution[solution] = (stats.bySolution[solution] || 0) + 1
                
                // Count by status
                if (reg.status === 'online') {
                    stats.onlineCount++
                } else {
                    stats.localCount++
                }
            })

            return stats
        } catch (error) {
            console.error('Error getting statistics:', error)
            return { total: 0, bySolution: {}, onlineCount: 0, localCount: 0 }
        }
    }
}

// Create and export instance
const databaseService = new DatabaseService()
window.databaseService = databaseService

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    databaseService.init()
}) 