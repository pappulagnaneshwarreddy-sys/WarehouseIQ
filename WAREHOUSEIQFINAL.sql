CREATE DATABASE warehouseiq_final;
USE warehouseiq_final;
USE warehouseiq_final;

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Employee') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Stores supplier and vendor information
CREATE TABLE suppliers (
    supplier_id INT PRIMARY KEY AUTO_INCREMENT,
    supplier_name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    lead_time_days INT NOT NULL,
    last_contact_date DATE
);
DESCRIBE suppliers;
-- Stores the main product catalogue
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    sku VARCHAR(50) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    minimum_stock INT NOT NULL,
    supplier_id INT NOT NULL,

    -- Connects each product to its supplier
    FOREIGN KEY (supplier_id)
        REFERENCES suppliers(supplier_id)
);
-- Stores warehouse location, bin and capacity information
CREATE TABLE warehouses (
    warehouse_id INT PRIMARY KEY AUTO_INCREMENT,
    warehouse_name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    bin_code VARCHAR(50) NOT NULL,
    capacity INT NOT NULL
);
-- Stores the current stock of each product in each warehouse
CREATE TABLE inventory (
    inventory_id INT PRIMARY KEY AUTO_INCREMENT,

    -- Product whose stock is being stored
    product_id INT NOT NULL,

    -- Warehouse where the product is stored
    warehouse_id INT NOT NULL,

    -- Physical bin/location inside the warehouse
    bin_location VARCHAR(50) NOT NULL,

    -- Stock currently available for use or dispatch
    available_stock INT NOT NULL DEFAULT 0,

    -- Stock already reserved for orders
    reserved_stock INT NOT NULL DEFAULT 0,

    -- Automatically updates when the inventory record changes
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    -- Connects inventory to the product
    FOREIGN KEY (product_id)
        REFERENCES products(product_id),

    -- Connects inventory to the warehouse
    FOREIGN KEY (warehouse_id)
        REFERENCES warehouses(warehouse_id),

    -- Same product cannot have two inventory records
    -- in the same warehouse
    UNIQUE (product_id, warehouse_id),

    -- Stock quantities cannot be negative
    CHECK (available_stock >= 0),
    CHECK (reserved_stock >= 0)
);
-- Records every stock IN and stock OUT transaction
CREATE TABLE stock_movements (
    movement_id INT PRIMARY KEY AUTO_INCREMENT,

    -- Product involved in the movement
    product_id INT NOT NULL,

    -- Warehouse where the movement happened
    warehouse_id INT NOT NULL,

    -- Employee/Admin who performed the movement
    user_id INT NOT NULL,

    -- Type of stock movement
    movement_type ENUM('IN', 'OUT') NOT NULL,

    -- Number of units moved
    quantity INT NOT NULL,

    -- Purchase order or sales order reference
    reference_number VARCHAR(50) NOT NULL,

    -- Reason for the movement
    reason VARCHAR(255),

    -- Current status of the transaction
    status ENUM('Completed', 'Pending', 'Cancelled')
        DEFAULT 'Completed',

    -- Automatically records when the movement occurred
    movement_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Connects movement to the product
    FOREIGN KEY (product_id)
        REFERENCES products(product_id),

    -- Connects movement to the warehouse
    FOREIGN KEY (warehouse_id)
        REFERENCES warehouses(warehouse_id),

    -- Connects movement to the user who performed it
    FOREIGN KEY (user_id)
        REFERENCES users(user_id),

    -- Quantity must always be positive
    CHECK (quantity > 0)
);
-- Adds the users who can access and operate WarehouseIQ
INSERT INTO users
(full_name, username, password, role)
VALUES
('Arjun Mehta', 'admin', 'admin123', 'Admin'),
('Rahul Sharma', 'rahul', 'rahul123', 'Employee'),
('Priya Nair', 'priya', 'priya123', 'Employee'),
('Karan Reddy', 'karan', 'karan123', 'Employee');
-- Adds suppliers that provide products to WarehouseIQ
INSERT INTO suppliers
(supplier_name, contact_person, phone, email, address,
 lead_time_days, last_contact_date)
VALUES
('TechSource India', 'Ravi Kumar', '9876543210',
 'ravi@techsource.example', 'Banjara Hills, Hyderabad',
 5, '2026-08-28'),

('Global Electronics', 'Anita Sharma', '9876543211',
 'anita@globalelectronics.example', 'Whitefield, Bengaluru',
 7, '2026-08-27'),

('Prime Office Supplies', 'Vikram Rao', '9876543212',
 'vikram@primeoffice.example', 'Guindy, Chennai',
 4, '2026-08-25'),

('Smart Devices India', 'Neha Singh', '9876543213',
 'neha@smartdevices.example', 'Andheri East, Mumbai',
 8, '2026-08-29'),

('Warehouse Essentials', 'Amit Patel', '9876543214',
 'amit@warehouseessentials.example', 'Hinjewadi, Pune',
 6, '2026-08-26'),

('PackRight Solutions', 'Suresh Menon', '9876543215',
 'suresh@packright.example', 'Peenya, Bengaluru',
 3, '2026-08-30');
 -- Adds products to the warehouse catalogue
INSERT INTO products
(product_name, sku, category, description, price, minimum_stock, supplier_id)
VALUES
('Wireless Mouse', 'WM-1001', 'Computer Accessories',
 '2.4 GHz wireless optical mouse', 799.00, 20, 1),

('Mechanical Keyboard', 'MK-1002', 'Computer Accessories',
 '87-key mechanical keyboard with USB connection', 2499.00, 15, 1),

('USB-C Hub', 'UH-1003', 'Computer Accessories',
 '7-in-1 USB-C connectivity hub', 1299.00, 15, 2),

('Bluetooth Speaker', 'BS-1004', 'Audio',
 'Portable Bluetooth speaker', 1999.00, 12, 2),

('Office Chair', 'OC-1005', 'Furniture',
 'Adjustable ergonomic office chair', 6499.00, 8, 3),

('Laptop Stand', 'LS-1006', 'Furniture',
 'Adjustable aluminium laptop stand', 1599.00, 10, 3),

('Webcam', 'WC-1007', 'Computer Accessories',
 '1080p USB webcam with microphone', 2299.00, 12, 4),

('Wireless Headset', 'WH-1008', 'Audio',
 'Bluetooth over-ear headset', 2999.00, 10, 4),

('Barcode Scanner', 'BC-1009', 'Warehouse Equipment',
 'USB handheld barcode scanner', 4499.00, 6, 5),

('Packing Tape', 'PT-1010', 'Packaging',
 '48 mm heavy-duty packaging tape', 199.00, 25, 6),

('Thermal Label Printer', 'LP-1011', 'Warehouse Equipment',
 'Direct thermal shipping label printer', 5799.00, 5, 5),

('Shipping Labels', 'SL-1012', 'Packaging',
 '100 x 150 mm adhesive shipping labels', 349.00, 30, 6),

('HDMI Cable', 'HC-1013', 'Cables',
 '2 metre HDMI 2.0 cable', 499.00, 20, 2),

('Power Adapter', 'PA-1014', 'Electronics',
 '65W USB-C laptop power adapter', 2199.00, 10, 1),

('Keyboard Wrist Rest', 'KR-1015', 'Computer Accessories',
 'Memory foam keyboard wrist rest', 699.00, 12, 3);
 
 -- Adds the warehouses managed by WarehouseIQ
INSERT INTO warehouses
(warehouse_name, location, bin_code, capacity)
VALUES
('Hyderabad Central Warehouse', 'Hyderabad', 'HYD-A01', 5000),

('Bengaluru Distribution Center', 'Bengaluru', 'BLR-B02', 4000),

('Chennai Storage Hub', 'Chennai', 'CHE-C03', 3500),

('Pune Regional Warehouse', 'Pune', 'PUN-D04', 3000);
-- Adds current stock for products across different warehouses
INSERT INTO inventory
(product_id, warehouse_id, bin_location, available_stock, reserved_stock)
VALUES

-- Hyderabad Central Warehouse
(1, 1, 'A01-01', 120, 15),
(2, 1, 'A01-02', 75, 10),
(3, 1, 'A01-03', 45, 8),
(4, 1, 'A01-04', 65, 12),
(5, 1, 'A01-05', 18, 3),
(6, 1, 'A01-06', 35, 5),
(7, 1, 'A01-07', 50, 7),
(9, 1, 'A01-09', 14, 2),
(10, 1, 'A01-10', 60, 10),
(11, 1, 'A01-11', 8, 1),

-- Bengaluru Distribution Center
(1, 2, 'B02-01', 80, 10),
(3, 2, 'B02-03', 35, 5),
(4, 2, 'B02-04', 40, 6),
(7, 2, 'B02-07', 25, 5),
(8, 2, 'B02-08', 48, 8),
(9, 2, 'B02-09', 9, 2),
(10, 2, 'B02-10', 22, 4),
(12, 2, 'B02-12', 35, 5),

-- Chennai Storage Hub
(2, 3, 'C03-02', 55, 8),
(4, 3, 'C03-04', 30, 5),
(5, 3, 'C03-05', 9, 2),
(6, 3, 'C03-06', 24, 4),
(8, 3, 'C03-08', 18, 3),
(9, 3, 'C03-09', 5, 1),
(10, 3, 'C03-10', 14, 3),
(13, 3, 'C03-13', 40, 6),

-- Pune Regional Warehouse
(1, 4, 'D04-01', 45, 5),
(3, 4, 'D04-03', 28, 4),
(6, 4, 'D04-06', 20, 3),
(7, 4, 'D04-07', 15, 2),
(11, 4, 'D04-11', 6, 1),
(14, 4, 'D04-14', 12, 2),
(15, 4, 'D04-15', 10, 2);
-- Adds the history of stock received and stock dispatched
INSERT INTO stock_movements
(product_id, warehouse_id, user_id, movement_type,
 quantity, reference_number, reason, status, movement_date)
VALUES

-- Hyderabad transactions
(1, 1, 2, 'IN', 100, 'PO-2026-081', 'Supplier delivery', 'Completed', '2026-08-20 09:15:00'),
(2, 1, 2, 'IN', 60, 'PO-2026-082', 'Supplier delivery', 'Completed', '2026-08-20 10:30:00'),
(3, 1, 3, 'IN', 50, 'PO-2026-083', 'New stock received', 'Completed', '2026-08-21 11:10:00'),
(1, 1, 4, 'OUT', 20, 'SO-2026-441', 'Customer dispatch', 'Completed', '2026-08-22 14:20:00'),
(4, 1, 2, 'OUT', 15, 'SO-2026-442', 'Customer dispatch', 'Completed', '2026-08-22 15:05:00'),
(5, 1, 3, 'IN', 20, 'PO-2026-084', 'Supplier delivery', 'Completed', '2026-08-23 09:45:00'),
(9, 1, 4, 'OUT', 5, 'SO-2026-443', 'Equipment issue', 'Completed', '2026-08-24 13:10:00'),
(10, 1, 2, 'IN', 80, 'PO-2026-085', 'Packaging stock received', 'Completed', '2026-08-24 16:00:00'),

-- Bengaluru transactions
(1, 2, 2, 'IN', 70, 'PO-2026-086', 'Supplier delivery', 'Completed', '2026-08-21 10:15:00'),
(3, 2, 3, 'IN', 40, 'PO-2026-087', 'Supplier delivery', 'Completed', '2026-08-22 11:25:00'),
(4, 2, 4, 'IN', 50, 'PO-2026-088', 'New stock received', 'Completed', '2026-08-23 09:30:00'),
(7, 2, 2, 'OUT', 10, 'SO-2026-444', 'Customer dispatch', 'Completed', '2026-08-24 12:15:00'),
(8, 2, 3, 'OUT', 12, 'SO-2026-445', 'Customer dispatch', 'Completed', '2026-08-25 14:40:00'),
(9, 2, 4, 'OUT', 4, 'SO-2026-446', 'Customer dispatch', 'Completed', '2026-08-26 10:20:00'),
(12, 2, 2, 'IN', 50, 'PO-2026-089', 'Packaging stock received', 'Completed', '2026-08-26 15:10:00'),

-- Chennai transactions
(2, 3, 3, 'IN', 60, 'PO-2026-090', 'Supplier delivery', 'Completed', '2026-08-22 09:20:00'),
(4, 3, 4, 'IN', 35, 'PO-2026-091', 'Supplier delivery', 'Completed', '2026-08-23 10:10:00'),
(5, 3, 2, 'OUT', 8, 'SO-2026-447', 'Customer dispatch', 'Completed', '2026-08-24 11:45:00'),
(6, 3, 3, 'IN', 30, 'PO-2026-092', 'New stock received', 'Completed', '2026-08-25 09:50:00'),
(8, 3, 4, 'OUT', 7, 'SO-2026-448', 'Customer dispatch', 'Completed', '2026-08-26 13:30:00'),
(10, 3, 2, 'OUT', 6, 'SO-2026-449', 'Customer dispatch', 'Completed', '2026-08-27 15:20:00'),

-- Pune transactions
(1, 4, 3, 'IN', 50, 'PO-2026-093', 'Regional replenishment', 'Completed', '2026-08-24 10:00:00'),
(3, 4, 4, 'IN', 35, 'PO-2026-094', 'Supplier delivery', 'Completed', '2026-08-25 11:15:00'),
(6, 4, 2, 'OUT', 10, 'SO-2026-450', 'Customer dispatch', 'Completed', '2026-08-26 12:00:00'),
(7, 4, 3, 'IN', 20, 'PO-2026-095', 'New stock received', 'Completed', '2026-08-27 09:40:00'),
(11, 4, 4, 'OUT', 4, 'SO-2026-451', 'Equipment issue', 'Completed', '2026-08-28 14:15:00'),
(14, 4, 2, 'IN', 15, 'PO-2026-096', 'Supplier delivery', 'Completed', '2026-08-29 10:30:00'),
(15, 4, 3, 'OUT', 5, 'SO-2026-452', 'Customer dispatch', 'Completed', '2026-08-29 16:20:00');
USE warehouseiq_final;

SELECT * FROM users;
SELECT * FROM suppliers;
SELECT * FROM products;
SELECT * FROM warehouses;
SELECT * FROM inventory;
SELECT * FROM stock_movements;
-- Finds products whose available stock has reached the minimum level
SELECT
    p.product_name,
    p.sku,
    p.minimum_stock,
    i.available_stock,
    w.warehouse_name
FROM inventory i
JOIN products p
    ON i.product_id = p.product_id
JOIN warehouses w
    ON i.warehouse_id = w.warehouse_id
WHERE i.available_stock <= p.minimum_stock;
-- Shows the complete history of stock movements
SELECT
    sm.movement_id,
    p.product_name,
    w.warehouse_name,
    u.full_name AS performed_by,
    sm.movement_type,
    sm.quantity,
    sm.reference_number,
    sm.reason,
    sm.status,
    sm.movement_date
FROM stock_movements sm
JOIN products p
    ON sm.product_id = p.product_id
JOIN warehouses w
    ON sm.warehouse_id = w.warehouse_id
JOIN users u
    ON sm.user_id = u.user_id
ORDER BY sm.movement_date DESC;
-- Compares total stock received with total stock dispatched
SELECT
    movement_type,
    COUNT(*) AS total_movements,
    SUM(quantity) AS total_quantity
FROM stock_movements
GROUP BY movement_type;
-- Shows current available and reserved stock in each warehouse
SELECT
    w.warehouse_name,
    SUM(i.available_stock) AS available_units,
    SUM(i.reserved_stock) AS reserved_units
FROM inventory i
JOIN warehouses w
    ON i.warehouse_id = w.warehouse_id
GROUP BY w.warehouse_id, w.warehouse_name
ORDER BY available_units DESC;
-- Calculates the total value of available inventory in each warehouse
SELECT
    w.warehouse_name,
    SUM(i.available_stock * p.price) AS inventory_value
FROM inventory i
JOIN products p
    ON i.product_id = p.product_id
JOIN warehouses w
    ON i.warehouse_id = w.warehouse_id
GROUP BY w.warehouse_id, w.warehouse_name
ORDER BY inventory_value DESC;
-- Shows which products have been dispatched the most
SELECT
    p.product_name,
    SUM(sm.quantity) AS total_dispatched
FROM stock_movements sm
JOIN products p
    ON sm.product_id = p.product_id
WHERE sm.movement_type = 'OUT'
GROUP BY p.product_id, p.product_name
ORDER BY total_dispatched DESC;


