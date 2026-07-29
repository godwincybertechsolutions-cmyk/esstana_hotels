-- ============================================
-- ESSTANA HOTELS DATABASE QUERIES
-- Production-Ready PostgreSQL Queries
-- ============================================

-- ============================================
-- 1. TABLE CREATION WITH CONSTRAINTS
-- ============================================

CREATE TABLE bookings (
  id TEXT PRIMARY KEY,
  room_type_id VARCHAR(50) NOT NULL,
  room_name VARCHAR(100) NOT NULL,
  guest_name VARCHAR(100) NOT NULL,
  guest_email VARCHAR(100) NOT NULL,
  guest_phone VARCHAR(20),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL CHECK (guests >= 1 AND guests <= 10),
  total_price DECIMAL(10,2) NOT NULL CHECK (total_price >= 0),
  status VARCHAR(20) NOT NULL DEFAULT 'confirmed' 
    CHECK (status IN ('confirmed', 'cancelled')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_dates CHECK (check_out > check_in),
  CONSTRAINT valid_email CHECK (guest_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

-- Create indexes for performance
CREATE INDEX idx_bookings_guest_email ON bookings(guest_email);
CREATE INDEX idx_bookings_check_in ON bookings(check_in);
CREATE INDEX idx_bookings_check_out ON bookings(check_out);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_room_type ON bookings(room_type_id);

-- Composite indexes for common queries
CREATE INDEX idx_bookings_date_range ON bookings(check_in, check_out, status);
CREATE INDEX idx_bookings_guest_recent ON bookings(guest_email, created_at DESC);

-- ============================================
-- 2. BASIC CRUD OPERATIONS
-- ============================================

-- CREATE: Insert new booking with validation
INSERT INTO bookings (
  id, room_type_id, room_name, guest_name, guest_email, 
  guest_phone, check_in, check_out, guests, total_price, status
) VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'confirmed'
)
RETURNING *;

-- READ: Get all bookings (with pagination)
SELECT 
  id, room_type_id, room_name, guest_name, guest_email,
  guest_phone, check_in, check_out, guests, total_price, status, created_at
FROM bookings
WHERE status = 'confirmed'
ORDER BY created_at DESC
LIMIT $1 OFFSET $2;

-- READ: Get booking by ID
SELECT * FROM bookings WHERE id = $1;

-- READ: Find guest bookings by email
SELECT *
FROM bookings
WHERE guest_email = $1 
  AND status = 'confirmed'
ORDER BY created_at DESC;

-- UPDATE: Cancel booking
UPDATE bookings
SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP
WHERE id = $1 AND status = 'confirmed'
RETURNING *;

-- DELETE: Remove booking (soft delete via status update preferred)
-- UPDATE bookings SET status = 'deleted', updated_at = CURRENT_TIMESTAMP WHERE id = $1;

-- ============================================
-- 3. AVAILABILITY & INVENTORY QUERIES
-- ============================================

-- Check room availability for date range
SELECT 
  room_type_id, 
  COUNT(*) as active_bookings
FROM bookings
WHERE check_in < $2 
  AND check_out > $1 
  AND status = 'confirmed'
GROUP BY room_type_id
HAVING COUNT(*) > 0;

-- Get available rooms (no conflicts)
SELECT DISTINCT room_type_id
FROM bookings
WHERE NOT (check_in < $2 AND check_out > $1)
  OR status = 'cancelled';

-- Find booking conflicts for a specific room
SELECT *
FROM bookings
WHERE room_type_id = $1
  AND check_in < $3
  AND check_out > $2
  AND status = 'confirmed';

-- ============================================
-- 4. REPORTING & ANALYTICS QUERIES
-- ============================================

-- Monthly revenue report
SELECT 
  DATE_TRUNC('month', check_in)::DATE as month,
  COUNT(*) as booking_count,
  ROUND(SUM(total_price)::NUMERIC, 2) as total_revenue,
  ROUND(AVG(total_price)::NUMERIC, 2) as avg_booking_value
FROM bookings
WHERE status = 'confirmed'
GROUP BY DATE_TRUNC('month', check_in)
ORDER BY month DESC;

-- Occupancy by room type
SELECT 
  room_type_id,
  COUNT(*) as total_bookings,
  SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as confirmed,
  SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled,
  ROUND(100.0 * SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) 
    / COUNT(*), 2) as confirmation_rate
FROM bookings
GROUP BY room_type_id
ORDER BY total_bookings DESC;

-- Peak booking periods
SELECT 
  TO_CHAR(check_in, 'YYYY-MM') as month,
  EXTRACT(DOW FROM check_in)::INT as day_of_week,
  COUNT(*) as booking_count,
  ROUND(AVG(total_price)::NUMERIC, 2) as avg_price
FROM bookings
WHERE status = 'confirmed'
GROUP BY TO_CHAR(check_in, 'YYYY-MM'), EXTRACT(DOW FROM check_in)
ORDER BY month DESC, day_of_week;

-- Top guests (repeat customers)
SELECT 
  guest_email,
  guest_name,
  COUNT(*) as booking_count,
  SUM(total_price) as total_spent,
  ROUND(AVG(total_price)::NUMERIC, 2) as avg_booking_value,
  MAX(created_at) as last_booking
FROM bookings
WHERE status = 'confirmed'
GROUP BY guest_email, guest_name
HAVING COUNT(*) > 1
ORDER BY booking_count DESC
LIMIT 20;

-- Revenue by guest segment
SELECT 
  CASE 
    WHEN guests = 1 THEN 'Solo'
    WHEN guests = 2 THEN 'Couple'
    WHEN guests <= 4 THEN 'Small Group'
    ELSE 'Large Group'
  END as guest_segment,
  COUNT(*) as booking_count,
  ROUND(SUM(total_price)::NUMERIC, 2) as segment_revenue,
  ROUND(AVG(total_price)::NUMERIC, 2) as avg_booking_value
FROM bookings
WHERE status = 'confirmed'
GROUP BY guest_segment
ORDER BY segment_revenue DESC;

-- ============================================
-- 5. ADMIN QUERIES
-- ============================================

-- Dashboard summary
SELECT 
  (SELECT COUNT(*) FROM bookings WHERE status = 'confirmed') as total_confirmed,
  (SELECT COUNT(*) FROM bookings WHERE status = 'cancelled') as total_cancelled,
  (SELECT ROUND(SUM(total_price)::NUMERIC, 2) FROM bookings 
    WHERE status = 'confirmed') as total_revenue,
  (SELECT COUNT(DISTINCT guest_email) FROM bookings 
    WHERE status = 'confirmed') as unique_guests,
  (SELECT AVG(total_price)::NUMERIC FROM bookings 
    WHERE status = 'confirmed') as avg_booking_value;

-- Recent bookings for admin review
SELECT 
  id, guest_name, guest_email, room_type_id,
  check_in, check_out, total_price, status, created_at
FROM bookings
ORDER BY created_at DESC
LIMIT 50;

-- Upcoming arrivals (next 7 days)
SELECT *
FROM bookings
WHERE check_in BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
  AND status = 'confirmed'
ORDER BY check_in ASC;

-- ============================================
-- 6. MAINTENANCE & CLEANUP QUERIES
-- ============================================

-- Archive old cancelled bookings (keep active for 2 years)
DELETE FROM bookings
WHERE status = 'cancelled' 
  AND created_at < CURRENT_DATE - INTERVAL '2 years';

-- Find potential duplicates (same guest, nearby dates)
SELECT 
  b1.id as booking_1,
  b2.id as booking_2,
  b1.guest_email,
  b1.check_in, b2.check_in,
  b1.total_price + b2.total_price as combined_price
FROM bookings b1
JOIN bookings b2 ON 
  b1.guest_email = b2.guest_email
  AND b1.id < b2.id
  AND ABS(EXTRACT(DAY FROM b1.check_in - b2.check_in)) <= 3
  AND b1.status = 'confirmed'
  AND b2.status = 'confirmed';

-- Validate data integrity
SELECT 
  COUNT(*) as total_rows,
  COUNT(CASE WHEN id IS NULL THEN 1 END) as null_ids,
  COUNT(CASE WHEN guest_email IS NULL THEN 1 END) as null_emails,
  COUNT(CASE WHEN check_out <= check_in THEN 1 END) as invalid_dates,
  COUNT(CASE WHEN total_price < 0 THEN 1 END) as invalid_prices
FROM bookings;

-- ============================================
-- 7. PERFORMANCE OPTIMIZATION QUERIES
-- ============================================

-- Analyze query performance (explain plan)
EXPLAIN ANALYZE
SELECT *
FROM bookings
WHERE check_in BETWEEN $1 AND $2 
  AND status = 'confirmed'
ORDER BY created_at DESC;

-- Update table statistics (run periodically)
ANALYZE bookings;

-- Vacuum to reclaim space
VACUUM ANALYZE bookings;

-- Check index usage
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan as index_scans,
  idx_tup_read as tuples_read,
  idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes
WHERE tablename = 'bookings'
ORDER BY idx_scan DESC;

-- ============================================
-- 8. BACKUP & RECOVERY
-- ============================================

-- Full table backup (run in backup job)
-- pg_dump -U username -h host -d database -t bookings > bookings_backup.sql

-- Point-in-time recovery setup
-- ALTER SYSTEM SET wal_level = replica;
-- ALTER SYSTEM SET max_wal_senders = 3;
-- ALTER SYSTEM SET wal_keep_size = '1GB';

-- ============================================
-- 9. SECURITY QUERIES
-- ============================================

-- Find bookings with suspicious patterns
SELECT *
FROM bookings
WHERE total_price > 100000
  OR guests > 10
  OR LENGTH(guest_name) < 2
  OR guest_email NOT LIKE '%@%'
ORDER BY created_at DESC;

-- Audit recent changes
SELECT 
  *,
  EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - created_at)) / 3600 as hours_since_creation
FROM bookings
WHERE created_at > CURRENT_TIMESTAMP - INTERVAL '24 hours'
ORDER BY created_at DESC;

-- ============================================
-- 10. PARAMETERIZED QUERY TEMPLATES
-- ============================================

-- Template: Get bookings with optional filters
-- Use in application with ORM or prepared statements
/*
SELECT *
FROM bookings
WHERE 1=1
  AND ($1::TEXT IS NULL OR guest_email = $1)
  AND ($2::DATE IS NULL OR check_in >= $2)
  AND ($3::DATE IS NULL OR check_out <= $3)
  AND ($4::VARCHAR(20) IS NULL OR status = $4)
ORDER BY created_at DESC
LIMIT $5 OFFSET $6;
*/

-- ============================================
-- NOTES FOR DEVELOPERS
-- ============================================
/*
1. Always use parameterized queries ($1, $2, etc.) to prevent SQL injection
2. Add indexes before running in production
3. Monitor slow queries with: SELECT * FROM pg_stat_statements;
4. Set up WAL archiving for point-in-time recovery
5. Implement automated backups (daily minimum)
6. Use connection pooling (PgBouncer or built-in pooling)
7. Monitor with: pg_stat_database, pg_stat_user_tables
8. Regular VACUUM ANALYZE maintenance
9. Set up monitoring alerts for table growth
10. Document all modifications to schema
*/
