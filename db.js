import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'db', 'sqlite.db');

// 開啟資料庫，若不存在會自動建立（由 sqlite3.Database 處理）
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('無法開啟資料庫:', err.message);
  } else {
    console.log('成功連接至 SQLite 資料庫：db/sqlite.db');
    
    // 建立 FuelPrices 資料表
    const createTableSql = `
      CREATE TABLE IF NOT EXISTS FuelPrices (
          price_date DATE PRIMARY KEY,
          unleaded_92 DECIMAL(4, 1),
          unleaded_95 DECIMAL(4, 1),
          unleaded_98 DECIMAL(4, 1),
          diesel DECIMAL(4, 1)
      );
    `;
    
    db.run(createTableSql, (err) => {
      if (err) {
        console.error('建立資料表失敗:', err.message);
      } else {
        console.log('資料表 FuelPrices 已就緒');
        
        // 插入初始資料 (使用 INSERT OR IGNORE 避免重複插入)
        const insertSql = `
          INSERT OR IGNORE INTO FuelPrices (price_date, unleaded_92, unleaded_95, unleaded_98, diesel) VALUES
          ('2026-05-04', 32.4, 33.9, 35.9, 31.0),
          ('2026-04-27', 32.4, 33.9, 35.9, 31.0),
          ('2026-03-23', 30.7, 32.2, 34.2, 29.5),
          ('2026-03-16', 28.9, 30.4, 32.4, 28.1),
          ('2021-12-06', 27.3, 28.8, 30.8, 25.3),
          ('2020-05-04', 16.2, 17.7, 19.7, 13.2),
          ('2019-12-30', 27.7, 29.2, 31.2, 25.7),
          ('2018-12-31', 24.5, 26.0, 28.0, 22.2),
          ('2017-12-25', 26.4, 27.9, 29.9, 24.2),
          ('2016-12-19', 24.9, 26.4, 28.4, 22.6),
          ('2015-12-28', 19.9, 21.4, 23.4, 17.4),
          ('2014-12-29', 25.0, 26.5, 28.5, 23.0),
          ('2013-12-30', 34.3, 35.8, 37.8, 33.2),
          ('2012-12-31', 33.3, 34.8, 36.8, 32.1),
          ('2011-12-19', 30.6, 31.3, 32.8, 28.8),
          ('2010-12-27', 30.8, 31.5, 33.0, 28.6),
          ('2009-12-26', 29.2, 29.9, 31.4, 26.8),
          ('2008-12-27', 20.4, 21.1, 22.6, 17.1),
          ('2007-11-02', 30.0, 30.7, 32.2, 27.5),
          ('2006-12-20', 27.0, 27.7, 29.2, 23.7),
          ('2005-08-02', 24.7, 25.4, 26.9, 20.5),
          ('2004-09-22', 22.5, 23.2, 24.7, 18.0),
          ('2003-12-17', 19.6, 20.3, 21.8, 14.9),
          ('2002-10-26', 19.3, 20.0, 21.3, 15.4),
          ('2001-11-17', 18.1, 19.2, 20.4, 13.8),
          ('2000-10-27', 19.5, 20.5, 21.5, 14.9),
          ('1999-12-08', 17.2, 18.2, 19.2, 13.4);
        `;
        
        db.run(insertSql, function(err) {
          if (err) {
            console.error('插入初始資料失敗:', err.message);
          } else {
            console.log(`已插入 ${this.changes} 筆新資料或資料已存在`);
          }
        });
      }
    });
  }
});

export default db;
