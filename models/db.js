import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lcdwcwtzsvegwnrzkaif.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY

const db = createClient(supabaseUrl, supabaseKey);

module.exports = db;