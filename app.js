import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sqlite3 from 'sqlite3';
import cors from 'cors';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'db', 'sqlite.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('app.js: 無法開啟資料庫:', err.message);
  } else {
    console.log('app.js: 成功連接至 SQLite 資料庫：db/sqlite.db');
    // 初始化資料表
    db.run(`
      CREATE TABLE IF NOT EXISTS FuelPrices (
        price_date TEXT PRIMARY KEY,
        unleaded_92 REAL,
        unleaded_95 REAL,
        unleaded_98 REAL,
        diesel REAL
      )
    `, (tableErr) => {
      if (tableErr) {
        console.error('初始化資料表失敗:', tableErr.message);
      } else {
        console.log('資料表 FuelPrices 已準備就緒');
      }
    });
  }
});

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 必須將更具體的 /api/insert 圖路放在路由器之前，
// 或者在路由器中不要有衝突的萬用路徑
app.get('/api/insert', (req, res) => {
  const { price_date, unleaded_92, unleaded_95, unleaded_98, diesel } = req.query;

  if (!price_date) {
    return res.status(400).json({ error: '請提供 price_date 參數 (格式: YYYY-MM-DD)' });
  }

  const sql = `
    INSERT OR REPLACE INTO FuelPrices (price_date, unleaded_92, unleaded_95, unleaded_98, diesel)
    VALUES (?, ?, ?, ?, ?)
  `;
  
  const params = [price_date, unleaded_92, unleaded_95, unleaded_98, diesel];

  db.run(sql, params, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      message: '資料新增成功',
      date: price_date,
      changes: this.changes
    });
  });
});

app.get('/api', (req, res) => {
  const year = req.query.price_date;

  // 強制檢查：必須是 4 位數年份
  if (!year || year.length !== 4 || isNaN(year)) {
    return res.status(400).json({ error: '請提供四位數年份參數 (例如: price_date=2026)' });
  }

  // 徹底簡化為只按年份查詢
  const sql = "SELECT * FROM FuelPrices WHERE strftime('%Y', price_date) = ? ORDER BY price_date DESC";
  
  db.all(sql, [year], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: `找不到 ${year} 年的資料` });
    }
    res.json(rows);
  });
});

app.get('/api/all', (req, res) => {
  const sql = "SELECT * FROM FuelPrices ORDER BY price_date ASC";
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "資料庫中尚無資料" });
    }
    res.json(rows);
  });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;
