-- Script para insertar datos de ejemplo en tabla existente
-- Solo ejecuta este script si ya tienes la tabla 'registrations' creada

-- Limpiar datos existentes (opcional - descomenta si quieres empezar limpio)
-- DELETE FROM registrations;

-- Insertar datos de ejemplo solo si no existen
INSERT INTO registrations (nombre, email, telefono, empresa, solucion, mensaje, status) 
SELECT * FROM (VALUES
    ('Usuario de Prueba', 'test@senterpriseit.com', 6564376040, 'SENTERPRISEIT', 'Conmutador', 'Registro de prueba para verificar la tabla', 'online'),
    ('María González', 'maria@empresa.com', 6561234567, 'Empresa ABC', 'TPV', 'Interesada en terminales punto de venta', 'online'),
    ('Carlos Rodríguez', 'carlos@negocio.com', 6569876543, 'Negocio XYZ', 'Asistencia', 'Necesito sistema de control de asistencia', 'online')
) AS v(nombre, email, telefono, empresa, solucion, mensaje, status)
WHERE NOT EXISTS (
    SELECT 1 FROM registrations WHERE registrations.nombre = v.nombre
);

-- Verificar que se insertaron los datos
SELECT COUNT(*) as total_registros FROM registrations; 