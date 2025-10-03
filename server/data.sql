-- Create DB (run once as superuser)
CREATE DATABASE listicle_bosses;

-- Connect
\c listicle_bosses;

-- Drop if exists
DROP TABLE IF EXISTS bosses;

-- Create table
CREATE TABLE bosses (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500),
    difficulty VARCHAR(50),
    lore TEXT
);

-- Seed
INSERT INTO bosses (slug, title, description, image_url, difficulty, lore) VALUES
('crystalguardian', 'Crystal Guardian', 'A crystalline warrior that guards the secrets of the Forgotten Crossroads.', 'https://via.placeholder.com/300x200?text=Crystal+Guardian', 'Medium', 'Born from the essence of the Radiance.'),
('mantislords', 'Mantis Lords', 'Trio of agile insect lords in the Fungal Wastes.', 'https://via.placeholder.com/300x200?text=Mantis+Lords', 'Hard', 'Ancient rulers of their domain.'),
('falseknight', 'False Knight', 'A hulking, infected knight wielding a massive mace.', 'https://via.placeholder.com/300x200?text=False+Knight', 'Easy', 'A corrupted vessel of the Infection.'),
('hornet', 'Hornet', 'Swift sentinel protecting the Greenpath.', 'https://via.placeholder.com/300x200?text=Hornet', 'Medium', 'Daughter of the Pale King.'),
('dreamer', 'The Dreamers', 'Three heroes in eternal slumber sealing the Hollow Knight.', 'https://via.placeholder.com/300x200?text=The+Dreamers', 'Hard', 'Monarch Wings bearer and others.');