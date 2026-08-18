-- =========================================================
-- SUPABASE BACKEND DATABASE SCHEMA
-- Project ID: ksmkvocearakdpwekvyh
-- Organisation: Aura Cafe / TechReel AI
-- =========================================================

-- 1. PROFILES TABLE (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT UNIQUE,
  university TEXT DEFAULT 'Stanford University',
  major TEXT DEFAULT 'Computer Science / AI',
  location TEXT DEFAULT 'California, USA',
  preferred_lang TEXT DEFAULT 'Python',
  bio TEXT DEFAULT 'Computer Science student passionate about AI and Engineering.',
  avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  streak INTEGER DEFAULT 6,
  weekly_goal_hours INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. REELS TABLE (Educational Tech Videos & AI Metadata)
CREATE TABLE IF NOT EXISTS public.reels (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  creator TEXT NOT NULL,
  creator_avatar TEXT,
  category TEXT NOT NULL,
  tags TEXT[],
  video_url TEXT NOT NULL,
  poster TEXT,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  duration TEXT,
  difficulty TEXT,
  ai_match_score INTEGER DEFAULT 95,
  ai_reasoning TEXT,
  summary TEXT,
  code_snippet TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. USER INTERESTS TABLE
CREATE TABLE IF NOT EXISTS public.user_interests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  category TEXT NOT NULL,
  level TEXT DEFAULT 'Intermediate',
  weight INTEGER DEFAULT 80,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CHAT HISTORY TABLE (AI Mentor Conversations)
CREATE TABLE IF NOT EXISTS public.chat_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  sender TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Reels Policies
CREATE POLICY "Reels are viewable by everyone" 
  ON public.reels FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert reels" 
  ON public.reels FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Chat History Policies
CREATE POLICY "Users can view and create chat messages" 
  ON public.chat_history FOR ALL USING (true);

-- User Interests Policies
CREATE POLICY "Users can manage their interests" 
  ON public.user_interests FOR ALL USING (true);

-- =========================================================
-- SAMPLE SEED DATA INSERTION
-- =========================================================
INSERT INTO public.reels (id, title, creator, category, tags, video_url, poster, likes, duration, difficulty, summary, code_snippet)
VALUES 
(
  'reel-1', 
  'How Game Engines Use Math & Shader Code for Lighting', 
  'TechMatrix AI', 
  'Gaming', 
  ARRAY['gaming', 'coding', 'math', 'graphics'], 
  'https://assets.mixkit.co/videos/preview/mixkit-code-array-on-a-computer-screen-27318-large.mp4', 
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80', 
  12450, 
  '0:45', 
  'Intermediate', 
  'Explains how ray tracing and fragment shaders compute vector dot products to simulate real-time dynamic light reflection in 3D video games.', 
  'vec3 computeLighting(vec3 normal, vec3 lightDir) { float diff = max(dot(normal, lightDir), 0.0); return diff * lightColor; }'
),
(
  'reel-2', 
  'Inside Tesla EV Battery Thermal Algorithms', 
  'AutoCode Dynamics', 
  'EV Tech', 
  ARRAY['ev', 'batteries', 'algorithms', 'embedded'], 
  'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-microchip-in-a-computer-42695-large.mp4', 
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80', 
  8920, 
  '0:50', 
  'Advanced', 
  'Deep-dive into PID controller loops running on battery management system microcontrollers to optimize charging speeds.', 
  'float calculateThermalPID(float targetTemp, float currentTemp) { float error = targetTemp - currentTemp; integral += error * dt; return Kp * error + Ki * integral; }'
),
(
  'reel-3', 
  'How Neural Network Backpropagation Actually Works', 
  'DeepAI Insights', 
  'AI', 
  ARRAY['ai', 'machine-learning', 'python', 'calculus'], 
  'https://assets.mixkit.co/videos/preview/mixkit-hacker-programming-code-on-a-laptop-42880-large.mp4', 
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80', 
  15300, 
  '0:58', 
  'Beginner', 
  'Visualizing gradient descent and chain rule calculus adjusting synaptic weights across multi-layer perceptron neural nets.', 
  'def backward_pass(y_true, y_pred, weights, learning_rate=0.01): loss_grad = 2 * (y_pred - y_true); return weights - learning_rate * loss_grad'
)
ON CONFLICT (id) DO NOTHING;
