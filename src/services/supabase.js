import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://xhclsvezumyueayxtyoo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoY2xzdmV6dW15dWVheXh0eW9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwOTgzNTcsImV4cCI6MjA0NzY3NDM1N30.tus5dOtvdT2Qrb5WcTQLC7ic-EPR3bEOjEIKSgORCvc";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
