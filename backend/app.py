from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
from pathlib import Path
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

DB=Path(__file__).resolve().parent/'warehouseiq.db'
app=Flask(__name__); CORS(app)

def db():
 c=sqlite3.connect(DB); c.row_factory=sqlite3.Row; c.execute('PRAGMA foreign_keys=ON'); return c

def init():
 c=db(); c.executescript('''
CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY,username TEXT UNIQUE NOT NULL,password_hash TEXT NOT NULL,role TEXT NOT NULL,full_name TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS suppliers(id INTEGER PRIMARY KEY,name TEXT NOT NULL,contact TEXT,email TEXT);
CREATE TABLE IF NOT EXISTS warehouses(id INTEGER PRIMARY KEY,name TEXT NOT NULL,location TEXT NOT NULL,bin_code TEXT NOT NULL,capacity INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY,name TEXT NOT NULL,sku TEXT UNIQUE NOT NULL,category TEXT NOT NULL,price REAL NOT NULL,min_stock INTEGER NOT NULL,supplier_id INTEGER REFERENCES suppliers(id) ON DELETE SET NULL);
CREATE TABLE IF NOT EXISTS inventory(id INTEGER PRIMARY KEY,product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,warehouse_id INTEGER NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,quantity INTEGER NOT NULL DEFAULT 0,reserved_quantity INTEGER NOT NULL DEFAULT 0,UNIQUE(product_id,warehouse_id));
CREATE TABLE IF NOT EXISTS stock_movements(id INTEGER PRIMARY KEY,product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,warehouse_id INTEGER NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,movement_type TEXT NOT NULL,quantity INTEGER NOT NULL,reason TEXT NOT NULL,username TEXT NOT NULL,created_at TEXT NOT NULL);
''')
 if c.execute('select count(*) n from users').fetchone()['n']==0:
  c.executemany('insert into users(username,password_hash,role,full_name) values(?,?,?,?)',[('admin',generate_password_hash('admin123'),'Admin','Admin User'),('employee',generate_password_hash('employee123'),'Employee','Employee User')])
 if c.execute('select count(*) n from suppliers').fetchone()['n']==0:c.executemany('insert into suppliers(name,contact,email) values(?,?,?)',[('Tech Supplies Co.','9876543210','contact@techsupplies.com'),('Global Traders','9123456780','info@globaltraders.com')])
 if c.execute('select count(*) n from warehouses').fetchone()['n']==0:c.executemany('insert into warehouses(name,location,bin_code,capacity) values(?,?,?,?)',[('Main Warehouse','Vijayawada','A-101',5000),('Secondary Warehouse','Guntur','B-202',3000)])
 if c.execute('select count(*) n from products').fetchone()['n']==0:
  s={r['name']:r['id'] for r in c.execute('select id,name from suppliers')}; c.executemany('insert into products(name,sku,category,price,min_stock,supplier_id) values(?,?,?,?,?,?)',[('Keyboard','KB001','Electronics',500,10,s['Tech Supplies Co.']),('Mouse','MS001','Accessories',300,5,s['Tech Supplies Co.']),('Monitor','MN001','Electronics',8000,5,s['Global Traders']),('Printer','PR001','Electronics',12000,5,s['Global Traders'])])
 if c.execute('select count(*) n from inventory').fetchone()['n']==0:
  w=[r['id'] for r in c.execute('select id from warehouses order by id')]; p={r['sku']:r['id'] for r in c.execute('select id,sku from products')}; c.executemany('insert into inventory(product_id,warehouse_id,quantity,reserved_quantity) values(?,?,?,?)',[(p['KB001'],w[0],100,20),(p['MS001'],w[0],200,30),(p['MN001'],w[0],50,5),(p['PR001'],w[0],20,2),(p['KB001'],w[1],20,0),(p['MS001'],w[1],15,0)])
 if c.execute('select count(*) n from stock_movements').fetchone()['n']==0:
  p={r['sku']:r['id'] for r in c.execute('select id,sku from products')}; w=c.execute('select id from warehouses order by id').fetchone()['id']; now=datetime.now().isoformat(timespec='seconds'); c.executemany('insert into stock_movements(product_id,warehouse_id,movement_type,quantity,reason,username,created_at) values(?,?,?,?,?,?,?)',[(p['KB001'],w,'IN',20,'Purchase','admin',now),(p['MS001'],w,'OUT',5,'Dispatch','employee',now),(p['MN001'],w,'IN',10,'Purchase','admin',now),(p['PR001'],w,'OUT',2,'Dispatch','employee',now)])
 c.commit();c.close()

def J(r): return dict(r)
def err(m,s=400): return jsonify(success=False,error=m),s
@app.get('/')
def home():return jsonify(success=True,message='WarehouseIQ Backend is running')
@app.post('/login')
def login():
 d=request.get_json() or {}; u=str(d.get('username','')).strip(); p=str(d.get('password','')); role=d.get('role','Admin'); c=db(); r=c.execute('select * from users where username=?',(u,)).fetchone();c.close()
 if not r or not check_password_hash(r['password_hash'],p):return err('Invalid username or password',401)
 if role and role!=r['role']:return err('Selected role does not match this account',401)
 return jsonify(success=True,user={'id':r['id'],'username':r['username'],'role':r['role'],'full_name':r['full_name']})
@app.get('/products')
def products():
 c=db(); rows=c.execute('''select p.*,coalesce(sum(i.quantity),0) stock,s.name supplier_name from products p left join inventory i on i.product_id=p.id left join suppliers s on s.id=p.supplier_id group by p.id order by p.id desc''').fetchall();c.close();return jsonify([J(r) for r in rows])
@app.post('/products')
def product_add():
 d=request.get_json() or {}; 
 if any(not str(d.get(k,'')).strip() for k in ('name','sku','category')):return err('Name, SKU and category are required')
 try:
  c=db();cur=c.execute('insert into products(name,sku,category,price,min_stock,supplier_id) values(?,?,?,?,?,?)',(d['name'],d['sku'],d['category'],float(d.get('price',0)),int(d.get('min_stock',0)),d.get('supplier_id') or None));c.commit();x=cur.lastrowid;c.close();return jsonify(success=True,id=x),201
 except sqlite3.IntegrityError:return err('SKU already exists or supplier is invalid')
@app.get('/suppliers')
def suppliers():
 c=db();rows=c.execute("select s.*,coalesce(group_concat(p.name,', '),'') products_supplied from suppliers s left join products p on p.supplier_id=s.id group by s.id order by s.id desc").fetchall();c.close();return jsonify([J(r) for r in rows])
@app.post('/suppliers')
def supplier_add():
 d=request.get_json() or {};n=str(d.get('name','')).strip();
 if not n:return err('Supplier name is required')
 c=db();cur=c.execute('insert into suppliers(name,contact,email) values(?,?,?)',(n,d.get('contact',''),d.get('email','')));c.commit();x=cur.lastrowid;c.close();return jsonify(success=True,id=x),201
@app.get('/warehouses')
def warehouses():
 c=db();rows=c.execute('select w.*,coalesce(sum(i.quantity),0) current_stock from warehouses w left join inventory i on i.warehouse_id=w.id group by w.id order by w.id desc').fetchall();c.close();return jsonify([J(r) for r in rows])
@app.post('/warehouses')
def warehouse_add():
 d=request.get_json() or {};
 if any(not str(d.get(k,'')).strip() for k in ('name','location','bin_code')):return err('Name, location and bin are required')
 c=db();cur=c.execute('insert into warehouses(name,location,bin_code,capacity) values(?,?,?,?)',(d['name'],d['location'],d['bin_code'],int(d.get('capacity',0))));c.commit();x=cur.lastrowid;c.close();return jsonify(success=True,id=x),201
@app.get('/inventory')
def inventory():
 c=db();rows=c.execute('''select p.id product_id,p.name,p.sku,p.category,p.price,p.min_stock,coalesce(sum(i.quantity),0) total_stock,coalesce(sum(i.reserved_quantity),0) reserved_stock,coalesce(sum(i.quantity-i.reserved_quantity),0) available_stock,coalesce(sum(i.quantity),0)*p.price stock_value from products p left join inventory i on i.product_id=p.id group by p.id order by p.name''').fetchall();c.close();return jsonify([J(r) for r in rows])
@app.get('/movements')
def movements():
 c=db();rows=c.execute('''select m.*,p.name product,p.sku,w.name warehouse from stock_movements m join products p on p.id=m.product_id join warehouses w on w.id=m.warehouse_id order by m.id desc''').fetchall();c.close();return jsonify([J(r) for r in rows])
def movement(kind):
 d=request.get_json() or {}
 try:pid=int(d['product_id']);wid=int(d['warehouse_id']);q=int(d['quantity'])
 except(KeyError,ValueError,TypeError):return err('Product, warehouse and a valid quantity are required')
 if q<=0:return err('Quantity must be greater than zero')
 c=db(); inv=c.execute('select * from inventory where product_id=? and warehouse_id=?',(pid,wid)).fetchone()
 if not inv:
  if kind=='OUT':c.close();return err('No inventory exists for this product in the selected warehouse',409)
  c.execute('insert into inventory(product_id,warehouse_id,quantity,reserved_quantity) values(?,?,?,0)',(pid,wid,q))
 else:
  if kind=='OUT' and q>inv['quantity']-inv['reserved_quantity']:c.close();return err(f"Insufficient available stock. Only {inv['quantity']-inv['reserved_quantity']} units are available",409)
  c.execute('update inventory set quantity=? where id=?',((inv['quantity']+q) if kind=='IN' else (inv['quantity']-q),inv['id']))
 c.execute('insert into stock_movements(product_id,warehouse_id,movement_type,quantity,reason,username,created_at) values(?,?,?,?,?,?,?)',(pid,wid,kind,q,str(d.get('reason','')).strip() or ('Purchase' if kind=='IN' else 'Dispatch'),d.get('username','admin'),datetime.now().isoformat(timespec='seconds')));c.commit();c.close();return jsonify(success=True,message=f'Stock {kind} recorded successfully')
@app.post('/stock-in')
def stockin():return movement('IN')
@app.post('/stock-out')
def stockout():return movement('OUT')
@app.get('/dashboard')
def dashboard():
 c=db();tp=c.execute('select count(*) n from products').fetchone()['n'];ts=c.execute('select coalesce(sum(quantity),0) n from inventory').fetchone()['n'];rs=c.execute('select coalesce(sum(reserved_quantity),0) n from inventory').fetchone()['n'];sv=c.execute('select coalesce(sum(i.quantity*p.price),0) n from inventory i join products p on p.id=i.product_id').fetchone()['n'];ls=c.execute('select count(*) n from (select p.id from products p left join inventory i on i.product_id=p.id group by p.id having coalesce(sum(i.quantity),0)<=p.min_stock)').fetchone()['n'];low=c.execute('select p.name product,p.sku,p.min_stock minimum,coalesce(sum(i.quantity),0) current from products p left join inventory i on i.product_id=p.id group by p.id having current<=p.min_stock order by current').fetchall();mv=c.execute('select m.created_at,m.movement_type,m.quantity,m.username,p.name product,m.reason from stock_movements m join products p on p.id=m.product_id order by m.id desc limit 8').fetchall();c.close();return jsonify(total_products=tp,total_stock=ts,reserved_stock=rs,available_stock=ts-rs,low_stock_items=ls,stock_value=sv,low_stock_products=[J(x) for x in low],recent_movements=[J(x) for x in mv])
@app.get('/reports/summary')
def report():
 c=db();inv=c.execute('select p.name,p.sku,coalesce(sum(i.quantity),0) total_stock,coalesce(sum(i.reserved_quantity),0) reserved_stock,coalesce(sum(i.quantity-i.reserved_quantity),0) available_stock,coalesce(sum(i.quantity),0)*p.price stock_value from products p left join inventory i on i.product_id=p.id group by p.id').fetchall();mt=c.execute('select movement_type,sum(quantity) total_quantity,count(*) movement_count from stock_movements group by movement_type').fetchall();sc=c.execute('select count(*) n from suppliers').fetchone()['n'];wc=c.execute('select count(*) n from warehouses').fetchone()['n'];c.close();return jsonify(inventory=[J(x) for x in inv],movement_totals=[J(x) for x in mt],supplier_count=sc,warehouse_count=wc)
init()
if __name__=='__main__':app.run(host='0.0.0.0',port=5000,debug=True)
