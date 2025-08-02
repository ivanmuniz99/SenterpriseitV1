-- Crear tabla de registros para SENTERPRISEIT
CREATE TABLE IF NOT EXISTS registrations (
    id BIGSERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    telefono BIGINT,
    empresa TEXT,
    solucion TEXT NOT NULL,
    mensaje TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'online'
);

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_solucion ON registrations(solucion);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);

-- Configurar políticas de seguridad (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserción anónima
CREATE POLICY "Enable insert for anonymous users" ON registrations
FOR INSERT WITH CHECK (true);

-- Política para permitir lectura anónima
CREATE POLICY "Enable read access for anonymous users" ON registrations
FOR SELECT USING (true);

-- Política para permitir eliminación anónima
CREATE POLICY "Enable delete for anonymous users" ON registrations
FOR DELETE USING (true);

-- Insertar datos de ejemplo (SIN especificar el ID) - Solo si no existen
INSERT INTO registrations (nombre, email, telefono, empresa, solucion, mensaje, status) 
SELECT * FROM (VALUES
    ('Usuario de Prueba', 'test@senterpriseit.com', 6564376040, 'SENTERPRISEIT', 'Conmutador', 'Registro de prueba para verificar la tabla', 'online'),
    ('María González', 'maria@empresa.com', 6561234567, 'Empresa ABC', 'TPV', 'Interesada en terminales punto de venta', 'online'),
    ('Carlos Rodríguez', 'carlos@negocio.com', 6569876543, 'Negocio XYZ', 'Asistencia', 'Necesito sistema de control de asistencia', 'online')
) AS v(nombre, email, telefono, empresa, solucion, mensaje, status)
WHERE NOT EXISTS (
    SELECT 1 FROM registrations WHERE registrations.nombre = v.nombre
); 