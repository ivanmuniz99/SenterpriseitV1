# SENTERPRISEIT - Landing Page

Una landing page moderna y responsiva para SENTERPRISEIT, empresa especializada en soluciones tecnológicas empresariales.

## 🚀 Características

- **Diseño Moderno**: Interfaz limpia y profesional con gradientes y animaciones suaves
- **Totalmente Responsiva**: Optimizada para dispositivos móviles, tablets y desktop
- **Animaciones Interactivas**: Efectos visuales y transiciones fluidas
- **Logotipo Personalizado**: Diseño único con animaciones de brillo y resplandor
- **Mockups de Dispositivos**: Visualización realista de las aplicaciones móviles y web
- **Colores Tecnológicos**: Paleta de colores frescos relacionados con tecnología
- **Botón WhatsApp**: Contacto directo vía WhatsApp
- **Formulario de Registro**: Captura de leads con base de datos local
- **Panel de Administración**: Gestión de registros y exportación a Excel

## 🎨 Diseño

### Paleta de Colores
- **Azul Tecnológico**: `#1e40af` - Color principal
- **Cian**: `#0891b2` - Color secundario
- **Índigo**: `#6366f1` - Acentos
- **Verde**: `#10b981` - Botones de acción
- **Grises**: Para texto y fondos neutros

### Tipografía
- **Inter**: Fuente principal moderna y legible
- **Font Awesome**: Iconos para elementos de interfaz

## 📱 Servicios Destacados

1. **Conmutador en la Nube**: Sistema telefónico empresarial completo
   - Infraestructura en la nube
   - Gestión de extensiones
   - Aplicación móvil
   - Reportes y analytics
   - Transferencias y conferencias
   - IVR personalizable

2. **Terminales Punto de Venta (TPV)**: Soluciones de pago completas
   - TPV Fijo, Móvil y Virtual
   - Seguridad PCI DSS
   - Múltiples métodos de pago
   - Sincronización en tiempo real
   - Facturación automática

3. **Control de Asistencia**: Gestión integral de personal
   - Múltiples métodos de registro
   - Control de horarios flexibles
   - Gestión de vacaciones
   - Reportes automáticos
   - Integración con nómina

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con Tailwind CSS
- **JavaScript**: Interactividad y animaciones
- **Tailwind CSS**: Framework de utilidades CSS
- **Font Awesome**: Iconografía
- **Google Fonts**: Tipografía web
- **Supabase PostgreSQL**: Base de datos en la nube (recomendado)
- **LocalStorage**: Almacenamiento local como respaldo

## 📁 Estructura del Proyecto

```
Pagina Web/
├── index.html              # Página principal
├── admin.html              # Panel de administración
├── styles.css              # Estilos personalizados
├── script.js               # Funcionalidad JavaScript
├── supabase-config.js      # Configuración de Supabase
├── SUPABASE_SETUP.md       # Instrucciones de configuración
└── README.md               # Documentación
```

## 🚀 Instalación y Uso

1. **Clonar o descargar** el proyecto
2. **Abrir** `index.html` en un navegador web
3. **¡Listo!** La página está lista para usar

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para cargar CDNs)

## 🗄️ Base de Datos

### Opción 1: Solo LocalStorage (Por Defecto)
- Los datos se guardan localmente en el navegador
- No requiere configuración adicional
- Funciona offline
- Limitado al navegador actual

### Opción 2: Supabase PostgreSQL (Recomendado)
- Base de datos PostgreSQL real en la nube
- API REST automática
- Sincronización en tiempo real
- Acceso desde cualquier dispositivo
- Modo offline con sincronización automática
- Mejor rendimiento para consultas complejas

#### Configurar Supabase:
1. Sigue las instrucciones en `SUPABASE_SETUP.md`
2. Actualiza la configuración en `supabase-config.js`
3. Los datos se sincronizarán automáticamente

## ✨ Funcionalidades

### Navegación
- Menú de navegación con píldoras interactivas
- Botones de idioma (Español/Inglés)
- Botones de registro e inicio de sesión

### Sección Hero
- Título principal animado
- Descripción de servicios
- Botón de WhatsApp directo
- Mockups de dispositivos interactivos

### Servicios
- Grid centrado de 3 categorías principales
- Efectos hover y animaciones
- Secciones detalladas para cada servicio
- Características y beneficios específicos

### Formulario de Registro
- Modal de registro elegante
- Campos: Nombre, Empresa, Email, Teléfono, Solución, Mensaje
- Validación de formularios
- Almacenamiento en localStorage
- Notificaciones de éxito

### Contacto
- Información de contacto completa
- Funcionalidad de copiar al portapapeles
- Diseño de tarjeta moderna

### Panel de Administración
- Vista de todos los registros
- Estadísticas por solución
- Filtros y búsqueda
- Exportación a Excel (CSV)
- Gestión de registros (ver, eliminar)

### Animaciones
- Efectos de entrada escalonados
- Animaciones de hover
- Simulación de datos en tiempo real
- Efectos parallax

## 📱 Responsividad

La página está optimizada para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🎯 Información de Contacto

**Iván E. Muñiz**  
Presidente  
Corporativo EING  
📞 656-437-6040  
📧 ivan.muniz@corporativoeing.com

## 🔧 Personalización

### Cambiar Colores
Edita las variables CSS en `styles.css`:
```css
:root {
    --tech-blue: #1e40af;
    --tech-cyan: #0891b2;
    --tech-green: #10b981;
}
```

### Modificar Contenido
- Edita el texto en `index.html`
- Actualiza la información de contacto
- Modifica los servicios en las secciones detalladas

### Agregar Nuevas Secciones
1. Añade el HTML en `index.html`
2. Define los estilos en `styles.css`
3. Agrega la funcionalidad en `script.js`

## 🌟 Características Avanzadas

- **Lazy Loading**: Carga optimizada de recursos
- **Debouncing**: Optimización de eventos de scroll
- **Intersection Observer**: Animaciones basadas en visibilidad
- **Clipboard API**: Copia de información de contacto
- **CSS Grid & Flexbox**: Layouts modernos y flexibles
- **Supabase PostgreSQL**: Base de datos PostgreSQL real con sincronización en tiempo real
- **Modo Offline**: Funcionamiento sin conexión con sincronización automática
- **LocalStorage API**: Base de datos local como respaldo
- **CSV Export**: Exportación de datos a Excel con información de estado
- **WhatsApp Integration**: Contacto directo vía WhatsApp
- **Estados de Conexión**: Indicadores visuales de estado online/offline

## 📈 SEO y Rendimiento

- **Meta tags** optimizados
- **Estructura semántica** HTML5
- **Imágenes optimizadas** (SVG inline)
- **CSS y JS minificados** (CDN)
- **Carga rápida** con recursos externos

## 🔮 Futuras Mejoras

- [x] Base de datos en la nube (Firebase Firestore)
- [x] Modo offline con sincronización
- [ ] Integración con CRM real
- [ ] Chat en vivo
- [ ] Blog integrado
- [ ] Sistema de testimonios
- [ ] Analytics avanzado
- [ ] PWA (Progressive Web App)
- [ ] Notificaciones push
- [ ] Autenticación de usuarios
- [ ] Dashboard con gráficos

## 📄 Licencia

Este proyecto es propiedad de SENTERPRISEIT y Corporativo EING.

## 🤝 Contribuciones

Para contribuciones o sugerencias, contactar a:
- **Email**: ivan.muniz@corporativoeing.com
- **Teléfono**: 656-437-6040

## 📊 Panel de Administración

Para acceder al panel de administración:
1. Abrir `admin.html` en el navegador
2. Ver estadísticas de registros
3. Filtrar y buscar registros
4. Exportar datos a Excel
5. Gestionar registros individuales

### Funciones del Panel Admin:
- **Dashboard**: Estadísticas en tiempo real con estados de conexión
- **Filtros**: Por solución y búsqueda de texto
- **Tabla**: Vista completa de registros con indicadores de estado
- **Exportación**: Descarga en formato CSV/Excel con datos de Firebase
- **Gestión**: Ver detalles y eliminar registros
- **Sincronización**: Automática entre Firebase y localStorage
- **Estados**: Indicadores visuales de registros online/offline

---

**Desarrollado con ❤️ para SENTERPRISEIT** 