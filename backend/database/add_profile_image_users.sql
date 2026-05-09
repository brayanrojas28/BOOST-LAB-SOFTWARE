-- Script para agregar campo profileImage a la tabla users
-- Ejecutar en MySQL: mysql -u root -p123456 boostSoft < add_profile_image_users.sql

-- Verificar si la columna ya existe
SET @column_exists = (
    SELECT COUNT(*) 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = 'boostSoft' 
    AND TABLE_NAME = 'users' 
    AND COLUMN_NAME = 'profileImage'
);

-- Solo agregar la columna si no existe
SET @sql = IF(@column_exists = 0, 
    'ALTER TABLE users ADD COLUMN profileImage VARCHAR(255) NULL AFTER bio;',
    'SELECT "La columna profileImage ya existe en la tabla users."'
);

-- Preparar y ejecutar el SQL
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE;

-- Mostrar resultado
SELECT @sql AS resultado;
