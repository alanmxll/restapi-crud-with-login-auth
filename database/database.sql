CREATE DATABASE firstapi;

CREATE TABLE bars(
    id_bar SERIAL PRIMARY KEY,
    weight_bar REAL,
    weighing_date TIMESTAMP,
    epoxi BOOLEAN,
    pu BOOLEAN,
    repainting BOOLEAN 
);

INSERT INTO bars (weight_bar, weighing_date, epoxi, pu, repainting) VALUES
    (205.45, '2020-01-21 19:15:59', true, false, false),
    (100.52, '2020-01-21 19:17:22', true, false, true),
    (300.03, '2020-01-21 19:20:11', false, true, false),
    (40.35, '2020-01-21 19:21:44', true, false, false),
    (50.93, '2020-01-22 13:10:11', false, true, false),
    (20.41, '2020-01-22 13:13:43', false, true, false),
    (25.95, '2020-01-23 13:15:32', false, true, false),
    (89.09, '2020-01-23 14:17:37', true, false, true),
    (70.68, '2020-01-24 15:15:19', true, false, false),
    (150.95, '2020-01-24 15:16:33', false, true, false),
    (77.74, '2020-01-24 15:18:55', true, false, false),
    (125.33, '2020-01-24 16:15:59', false, true, true),
    (85.45, '2020-01-24 16:30:49', true, false, true),
    (201.99, '2020-01-25 13:15:39', true, false, false),
    (278.73, '2020-01-25 13:15:52', true, false, false),
    (134.00, '2020-01-25 13:09:51', true, false, true),
    (98.22, '2020-01-25 13:12:07', false, true, false),
    (93.90, '2020-01-25 13:15:45', false, true, false),
    (160.12, '2020-01-25 13:27:39', true, false, true),
    (176.35, '2020-01-25 13:44:37', false, true, false)