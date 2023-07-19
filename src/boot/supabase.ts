import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dvxnhscavnavqaerdxbd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2eG5oc2Nhdm5hdnFhZXJkeGJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk3NTgyMzksImV4cCI6MjAwNTMzNDIzOX0._kxFctTdH0pBc4tHpFWLNW_dW7RmMAgoEp24-dMT4tA';

const supabase = createClient(supabaseUrl, supabaseKey);

export default function useSupabase() {
  return { supabase };
}
