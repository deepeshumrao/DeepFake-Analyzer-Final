import { createClient } from '@supabase/supabase-js'

export const _supa = createClient(
  'https://fpvhcnkmlyufnxjrtnna.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwdmhjbmttbHl1Zm54anJ0bm5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5ODI5NjIsImV4cCI6MjEwMjU1ODk2Mn0.9nGnrl6VSR8EGtom0WDx4it1F5Y8pLH5JMuEFbRTXaE',
  { auth: { persistSession: true, autoRefreshToken: true } }
);
