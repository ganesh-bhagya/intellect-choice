import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2/promise';

export const DB_POOL = 'DB_POOL';

@Module({
  providers: [
    {
      provide: DB_POOL,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const pool = mysql.createPool({
          host: config.get('MYSQL_HOST', 'localhost'),
          port: Number(config.get('MYSQL_PORT', 3306)),
          user: config.get('MYSQL_USER', 'root'),
          password: config.get('MYSQL_PASSWORD', 'root'),
          database: config.get('MYSQL_DATABASE', 'intellect_choice'),
          waitForConnections: true,
          connectionLimit: 10,
        });

        await pool.query(`
          CREATE TABLE IF NOT EXISTS contacts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(100) DEFAULT NULL,
            message TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);
        await pool.query(`
          CREATE TABLE IF NOT EXISTS applications (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(100) DEFAULT NULL,
            position VARCHAR(255) NOT NULL,
            message TEXT DEFAULT NULL,
            cv_path VARCHAR(500) DEFAULT NULL,
            cv_original_name VARCHAR(255) DEFAULT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);
        // Backwards-compatible migrations for existing databases created
        // before CV columns were added.
        try {
          await pool.query(
            'ALTER TABLE applications ADD COLUMN cv_path VARCHAR(500) DEFAULT NULL',
          );
        } catch (_) {}
        try {
          await pool.query(
            'ALTER TABLE applications ADD COLUMN cv_original_name VARCHAR(255) DEFAULT NULL',
          );
        } catch (_) {}

        await pool.query(`
          CREATE TABLE IF NOT EXISTS jobs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            location VARCHAR(255) DEFAULT NULL,
            type VARCHAR(100) DEFAULT NULL,
            category VARCHAR(100) DEFAULT NULL,
            description TEXT DEFAULT NULL,
            is_active TINYINT(1) NOT NULL DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);
        try {
          await pool.query('ALTER TABLE jobs ADD COLUMN category VARCHAR(100) DEFAULT NULL');
        } catch (_) {}

        // Admin users table (for admin credentials instead of only env-based)
        await pool.query(`
          CREATE TABLE IF NOT EXISTS admins (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);

        // Seed a default admin user from env if no admins exist yet.
        const adminUsername = config.get('ADMIN_USERNAME', 'admin');
        const adminPassword = config.get('ADMIN_PASSWORD', 'change-me');
        const [adminRows] = await pool.query('SELECT COUNT(*) as cnt FROM admins');
        const adminCount = (adminRows as any[])[0]?.cnt as number;
        if (!adminCount) {
          await pool.query('INSERT INTO admins (username, password) VALUES (?, ?)', [
            adminUsername,
            adminPassword,
          ]);
        }

        return pool;
      },
    },
  ],
  exports: [DB_POOL],
})
export class DbModule {}

