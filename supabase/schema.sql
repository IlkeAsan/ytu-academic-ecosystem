-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. profiles tablosu (auth.users tablosu ile bağlanır)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  phone_number text, -- whatsapp icin gerekli (ornek format: 905551234567)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- auth.users'a yeni bir e-posta eklendiğinde otomatik olarak profiles tablosunda satır oluşturacak trigger
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, phone_number)
  values (new.id, new.email, new.raw_user_meta_data->>'phone_number');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. materials_catalog: Bağışlanabilecek materyallerin sabit listesi
create table materials_catalog (
  id uuid default uuid_generate_v4() primary key,
  item_name text not null,
  course_code text not null,     -- Örn: BLM2021
  course_name text not null,     -- Örn: Mantık Devreleri
  category text not null         -- Örn: Elektronik, Kitap vs.
);

-- Katalog için örnek verileri ekleyelim
insert into materials_catalog (item_name, course_code, course_name, category) values
  ('Arduino Uno R3', 'BLM2021', 'Mantık Devreleri', 'Elektronik'),
  ('STM32 Geliştirme Kartı', 'BLM3021', 'Mikroişlemciler', 'Elektronik'),
  ('Breadboard (Büyük Boy)', 'BLM2021', 'Mantık Devreleri', 'Elektronik'),
  ('Jumper Kablo Seti', 'BLM2021', 'Mantık Devreleri', 'Elektronik'),
  ('Raspberry Pi 4', 'BLM4022', 'Gömülü Sistemler', 'Elektronik'),
  ('Lojik Kapı Entegreleri (74HCxx, 74LSxx vs.)', 'BLM2021', 'Mantık Devreleri', 'Elektronik'),
  ('Multimetre', 'BLM2021', 'Mantık Devreleri', 'Ölçüm Cihazı'),
  ('Sistem Analizi ve Tasarımı Ders Kitabı', 'BLM3011', 'Sistem Analizi ve Tasarımı', 'Kitap');

-- 3. donations: Bağış ilanları
create table donations (
  id uuid default uuid_generate_v4() primary key,
  donor_id uuid references profiles(id) on delete cascade not null,
  material_id uuid references materials_catalog(id) on delete restrict not null,
  status text check (status in ('active', 'requested', 'completed')) default 'active' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. requests: Talepler
create table requests (
  id uuid default uuid_generate_v4() primary key,
  donation_id uuid references donations(id) on delete cascade not null,
  requester_id uuid references profiles(id) on delete cascade not null,
  status text check (status in ('pending', 'approved', 'rejected')) default 'pending' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  -- Bir ilana aynı kişi sadece bir kere talepte bulunabilir
  unique(donation_id, requester_id)
);

-- 5. ratings: Puanlama (1-5 arası, yorum yok)
create table ratings (
  id uuid default uuid_generate_v4() primary key,
  donation_id uuid references donations(id) on delete cascade not null,
  rater_id uuid references profiles(id) on delete cascade not null,
  rated_user_id uuid references profiles(id) on delete cascade not null,
  score integer check (score >= 1 and score <= 5) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  -- Bir ilanda bir kişi sadece 1 kez puanlama yapabilir
  unique(donation_id, rater_id)
);

-- ROW LEVEL SECURITY (RLS) KURALLARI
alter table profiles enable row level security;
alter table materials_catalog enable row level security;
alter table donations enable row level security;
alter table requests enable row level security;
alter table ratings enable row level security;

-- Materials Catalog: Herkes görebilir
create policy "Materials are viewable by everyone" on materials_catalog for select using (true);

-- Profiles: Herkes diğer profillerdeki temel bilgileri okuyabilir (whatsapp vs. için gerekli), kullanıcı sadece kendi profilini update edebilir
create policy "Profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Donations: Herkes active bağışları görebilir. Kullanıcılar kendi bağışlarını oluşturabilir ve güncelleyebilir.
create policy "All donations are viewable by everyone" on donations for select using (true);
create policy "Users can insert own donations" on donations for insert with check (auth.uid() = donor_id);
create policy "Users can update own donations" on donations for update using (auth.uid() = donor_id);

-- Requests: Kullanıcı sadece kendi yaptığı çağrıları VE kendi bağışlarına gelen çağrıları görebilir
create policy "Users can view relevant requests" on requests for select 
using (
  auth.uid() = requester_id OR 
  auth.uid() IN (SELECT donor_id FROM donations WHERE id = donation_id)
);
create policy "Users can insert own requests" on requests for insert with check (auth.uid() = requester_id);
create policy "Donors can update request status" on requests for update 
using (
  auth.uid() IN (SELECT donor_id FROM donations WHERE id = donation_id)
);

-- Ratings: Herkes verilen puanları okuyabilir, sadece puan verecek olan rater kendi puanını ekleyebilir
create policy "Ratings viewable by everyone" on ratings for select using (true);
create policy "Users can insert own ratings" on ratings for insert with check (auth.uid() = rater_id);
