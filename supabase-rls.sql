-- ═══════════════════════════════════════════════════════════════════
-- TyebLiya Waitlist — Supabase RLS + Security Policies
-- Run this in: Supabase Dashboard > SQL Editor
-- ═══════════════════════════════════════════════════════════════════

-- 1. Enable RLS on waitlist_users
ALTER TABLE public.waitlist_users ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies (safe to run even if they don't exist)
DROP POLICY IF EXISTS "Allow anonymous insert" ON public.waitlist_users;
DROP POLICY IF EXISTS "Deny all selects" ON public.waitlist_users;
DROP POLICY IF EXISTS "Deny all updates" ON public.waitlist_users;
DROP POLICY IF EXISTS "Deny all deletes" ON public.waitlist_users;
DROP POLICY IF EXISTS "Allow anon insert" ON public.waitlist_users;

-- 3. INSERT: Deny for anon (we use service_role from API route now)
-- Since we're using the service_role key from our API route,
-- the anon user should NOT be able to insert directly.
-- This prevents anyone from using the exposed anon key to spam the table.

-- No INSERT policy for anon = anon CANNOT insert (RLS default-deny)

-- 4. SELECT: Deny for all non-service users
-- No SELECT policy = nobody can read the waitlist from client-side

-- 5. UPDATE: Deny for all non-service users
-- No UPDATE policy = nobody can modify entries from client-side

-- 6. DELETE: Deny for all non-service users
-- No DELETE policy = nobody can delete entries from client-side

-- ═══════════════════════════════════════════════════════════════════
-- Result: The ONLY way to interact with waitlist_users is through
-- the service_role key, which is ONLY used in our server-side API route.
-- ═══════════════════════════════════════════════════════════════════

-- 7. (Optional) Add constraints for data integrity
-- Uncomment these if not already applied:

-- ALTER TABLE public.waitlist_users
--   ADD CONSTRAINT waitlist_role_check CHECK (role IN ('client', 'chef'));

-- ALTER TABLE public.waitlist_users
--   ADD CONSTRAINT waitlist_name_length CHECK (char_length(name) >= 2 AND char_length(name) <= 100);

-- ALTER TABLE public.waitlist_users
--   ADD CONSTRAINT waitlist_email_unique UNIQUE (email) WHERE (email IS NOT NULL);

-- ALTER TABLE public.waitlist_users
--   ADD CONSTRAINT waitlist_phone_unique UNIQUE (phone) WHERE (phone IS NOT NULL);

-- 8. Verify RLS is active
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename = 'waitlist_users';
