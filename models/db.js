const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://lcdwcwtzsvegwnrzkaif.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error('SUPABASE_KEY environment variable is not set');
}

const db = createClient(supabaseUrl, supabaseKey);

module.exports = db;