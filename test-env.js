const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
console.log("Supabase URL:", !!process.env.NEXT_PUBLIC_SUPABASE_URL, "Service Key:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);
