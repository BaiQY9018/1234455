-- 诗歌分享网站数据库表结构
-- 在 Supabase SQL Editor 中运行此脚本

-- 诗歌表
CREATE TABLE poems (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id) NOT NULL,
  author_name TEXT NOT NULL,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 评论表
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  poem_id UUID REFERENCES poems(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  user_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 感言墙表
CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  user_name TEXT NOT NULL,
  content TEXT NOT NULL,
  mood TEXT NOT NULL DEFAULT 'normal', -- normal, happy, sad, thoughtful, lonely, hopeful
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 诗集合集表
CREATE TABLE collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  author_id UUID REFERENCES auth.users(id) NOT NULL,
  author_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 诗集-诗歌关联表
CREATE TABLE collection_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE NOT NULL,
  poem_id UUID REFERENCES poems(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(collection_id, poem_id)
);

-- 启用行级安全
ALTER TABLE poems ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_items ENABLE ROW LEVEL SECURITY;

-- 诗歌：所有人可读，登录用户可写
CREATE POLICY "诗歌所有人可读" ON poems FOR SELECT USING (true);
CREATE POLICY "登录用户可发布诗歌" ON poems FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "作者可编辑自己的诗歌" ON poems FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "作者可删除自己的诗歌" ON poems FOR DELETE USING (auth.uid() = author_id);

-- 评论：所有人可读，登录用户可写
CREATE POLICY "评论所有人可读" ON comments FOR SELECT USING (true);
CREATE POLICY "登录用户可发表评论" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "作者可删除自己的评论" ON comments FOR DELETE USING (auth.uid() = user_id);

-- 感言：所有人可读，登录用户可写
CREATE POLICY "感言所有人可读" ON notes FOR SELECT USING (true);
CREATE POLICY "登录用户可发表感言" ON notes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "作者可删除自己的感言" ON notes FOR DELETE USING (auth.uid() = user_id);

-- 诗集：所有人可读，登录用户可写
CREATE POLICY "诗集所有人可读" ON collections FOR SELECT USING (true);
CREATE POLICY "登录用户可创建诗集" ON collections FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "作者可编辑自己的诗集" ON collections FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "作者可删除自己的诗集" ON collections FOR DELETE USING (auth.uid() = author_id);

-- 诗集条目：所有人可读
CREATE POLICY "诗集条目所有人可读" ON collection_items FOR SELECT USING (true);
CREATE POLICY "诗集作者可添加条目" ON collection_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM collections WHERE id = collection_id AND author_id = auth.uid())
);
CREATE POLICY "诗集作者可删除条目" ON collection_items FOR DELETE USING (
  EXISTS (SELECT 1 FROM collections WHERE id = collection_id AND author_id = auth.uid())
);
