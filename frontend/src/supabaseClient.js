import { createClient } from '@supabase/supabase-js'

// Kullanıcının .env dosyasından bu değerleri doldurması gerekmektedir.
// .env eksikse 'YOUR_SUPABASE_URL' gibi placeholderlar kullanılacaktır.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://YOUR_PROJECT_ID.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
