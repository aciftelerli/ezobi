alter table public.profiles
add column if not exists elevenlabs_voice_id text,
add column if not exists elevenlabs_voice_name text;
